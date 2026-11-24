/* ==========================
   VISUALIZER (CHARTS & ERD)
   ========================== */

window.Visualizer = {

    chartInstance: null,
    currentTable: null,
    currentAnalysis: null,
    erdCounter: 0,
    erdInitialized: false,
    erdZoom: 100,
    erdModalZoom: 100,

    PALETTE: [
        "#3b82f6", // blue
        "#10b981", // emerald
        "#f59e0b", // amber
        "#8b5cf6", // violet
        "#f43f5e", // rose
        "#06b6d4", // cyan
        "#f97316", // orange
        "#14b8a6", // teal
        "#ec4899", // pink
        "#84cc16"  // lime
    ],

    DOMAIN_GROUPS: {
        ecommerce: ["Customers", "Orders", "Products", "Categories", "Suppliers", "Inventory", "Payments", "SalesLog"],
        hr: ["Departments", "Employees", "EmployeeHistory", "Projects", "Assignments"],
        analytics: ["WebTraffic", "Sensors", "SensorReadings", "Demographics"],
        library: ["Authors", "Books", "BookLoans", "Customers", "Demographics"]
    },

    /* ==========================
       TABLE ANALYSIS FOR CHARTS
       ========================== */

    isNumericValue(val){
        if(val === null || val === undefined || val === "") return false;
        if(typeof val === "number") return Number.isFinite(val);
        if(typeof val === "string"){
            const trimmed = val.trim();
            if(trimmed === "") return false;
            return !Number.isNaN(Number(trimmed)) && Number.isFinite(Number(trimmed));
        }
        return false;
    },

    isDateLikeColumn(colName, values, colIdx){
        if(/date|time|month|year|quarter|day|timestamp/i.test(colName)){
            return true;
        }
        for(let i = 0; i < Math.min(values.length, 10); i++){
            const v = values[i][colIdx];
            if(typeof v === "string" && /^\d{4}-\d{2}(-\d{2})?/.test(v.trim())){
                return true;
            }
        }
        return false;
    },

    analyzeTable(table){
        if(!table || !Array.isArray(table.columns) || !Array.isArray(table.values) || table.values.length === 0){
            return { chartable: false };
        }

        const colMeta = table.columns.map((name, idx) => {
            let nonNullCount = 0;
            let numericCount = 0;

            for(let r = 0; r < table.values.length; r++){
                const val = table.values[r][idx];
                if(val !== null && val !== undefined && val !== ""){
                    nonNullCount++;
                    if(this.isNumericValue(val)){
                        numericCount++;
                    }
                }
            }

            const isNumeric = nonNullCount > 0 && numericCount === nonNullCount;
            const isId = /^(id|.*_id)$/i.test(name);
            const isDateLike = this.isDateLikeColumn(name, table.values, idx);

            return { idx, name, isNumeric, isId, isDateLike };
        });

        const numericCols = colMeta.filter(c => c.isNumeric);
        if(numericCols.length === 0){
            return { chartable: false, colMeta };
        }

        const nonNumericCols = colMeta.filter(c => !c.isNumeric);
        const nonIdNumericCols = numericCols.filter(c => !c.isId);

        // Determine sensible default X-axis
        let defaultX = "__row_index__";
        const dateTextCol = nonNumericCols.find(c => c.isDateLike);
        if(dateTextCol){
            defaultX = String(dateTextCol.idx);
        } else if(nonNumericCols.length > 0){
            defaultX = String(nonNumericCols[0].idx);
        } else if(colMeta.length > 1){
            const dateNumCol = numericCols.find(c => c.isDateLike);
            const idCol = numericCols.find(c => c.isId);
            defaultX = String((dateNumCol || idCol || colMeta[0]).idx);
        }

        // Determine sensible default Y-axis
        const preferredY = nonIdNumericCols.find(c => String(c.idx) !== defaultX)
            || numericCols.find(c => String(c.idx) !== defaultX)
            || numericCols[0];

        const defaultY = String(preferredY.idx);

        // Determine default chart type
        const xMeta = defaultX !== "__row_index__" ? colMeta[Number(defaultX)] : null;
        const defaultType = (xMeta && xMeta.isDateLike && table.values.length > 2) ? "line" : "bar";

        return {
            chartable: true,
            colMeta,
            numericCols,
            nonIdNumericCols,
            defaultX,
            defaultY,
            defaultType
        };
    },

    /* ==========================
       CHART RENDERING
       ========================== */

    destroyChart(){
        if(this.chartInstance){
            this.chartInstance.destroy();
            this.chartInstance = null;
        }
    },

    prepareChartControls(table){
        this.currentTable = table;
        const analysis = this.analyzeTable(table);
        this.currentAnalysis = analysis;

        const resultsTabs = document.getElementById("resultsTabs");
        const chartTabBtn = document.getElementById("chartTabBtn");
        const tableTabBtn = document.getElementById("tableTabBtn");
        const outputEl = document.getElementById("output");
        const chartView = document.getElementById("chartView");

        if(!resultsTabs || !chartTabBtn || !tableTabBtn){
            return;
        }

        this.destroyChart();
        outputEl.classList.remove("hidden");
        chartView.classList.add("hidden");
        tableTabBtn.classList.add("active");
        chartTabBtn.classList.remove("active");

        if(!table || table.values.length === 0){
            resultsTabs.classList.add("hidden");
            return;
        }

        resultsTabs.classList.remove("hidden");

        if(!analysis.chartable){
            chartTabBtn.disabled = true;
            chartTabBtn.title = "Query must return at least one numeric column to generate a chart";
            return;
        }

        chartTabBtn.disabled = false;
        chartTabBtn.title = "Visualize query results as a chart";

        const typeSelect = document.getElementById("chartTypeSelect");
        const xSelect = document.getElementById("chartXSelect");
        const ySelect = document.getElementById("chartYSelect");

        xSelect.innerHTML = "";
        if(table.columns.length === 1){
            const rowOpt = document.createElement("option");
            rowOpt.value = "__row_index__";
            rowOpt.textContent = "Row #";
            xSelect.appendChild(rowOpt);
        }
        analysis.colMeta.forEach(col => {
            const opt = document.createElement("option");
            opt.value = String(col.idx);
            opt.textContent = col.name;
            xSelect.appendChild(opt);
        });
        if(table.columns.length > 1){
            const rowOpt = document.createElement("option");
            rowOpt.value = "__row_index__";
            rowOpt.textContent = "Row #";
            xSelect.appendChild(rowOpt);
        }
        xSelect.value = analysis.defaultX;

        ySelect.innerHTML = "";
        analysis.numericCols.forEach(col => {
            const opt = document.createElement("option");
            opt.value = String(col.idx);
            opt.textContent = col.name;
            ySelect.appendChild(opt);
        });
        if(analysis.numericCols.length > 1){
            const allOpt = document.createElement("option");
            allOpt.value = "__all_numeric__";
            allOpt.textContent = "All Numeric Columns";
            ySelect.appendChild(allOpt);
        }
        ySelect.value = analysis.defaultY;
        typeSelect.value = analysis.defaultType;
    },

    renderChart(){
        if(typeof Chart === "undefined") return;
        if(!this.currentTable || !this.currentAnalysis || !this.currentAnalysis.chartable) return;

        const canvas = document.getElementById("resultChartCanvas");
        if(!canvas) return;

        const chartType = document.getElementById("chartTypeSelect").value;
        const xChoice = document.getElementById("chartXSelect").value;
        const yChoice = document.getElementById("chartYSelect").value;

        const table = this.currentTable;
        const labels = table.values.map((row, idx) => {
            if(xChoice === "__row_index__") return `#${idx + 1}`;
            const raw = row[Number(xChoice)];
            return raw === null || raw === undefined ? "NULL" : String(raw);
        });

        let selectedYCols = [];
        if(yChoice === "__all_numeric__"){
            if(chartType === "pie" || chartType === "doughnut"){
                selectedYCols = [this.currentAnalysis.numericCols[0]];
            } else {
                selectedYCols = this.currentAnalysis.numericCols.filter(c => String(c.idx) !== xChoice);
                if(selectedYCols.length === 0){
                    selectedYCols = [this.currentAnalysis.numericCols[0]];
                }
            }
        } else {
            const found = this.currentAnalysis.colMeta[Number(yChoice)];
            if(found) selectedYCols = [found];
        }

        const isCircular = chartType === "pie" || chartType === "doughnut";

        const datasets = selectedYCols.map((col, seriesIdx) => {
            const data = table.values.map(row => {
                const raw = row[col.idx];
                if(raw === null || raw === undefined || raw === "") return null;
                return Number(raw);
            });

            if(isCircular){
                const sliceColors = labels.map((_, i) => this.PALETTE[i % this.PALETTE.length]);
                return {
                    label: col.name,
                    data,
                    backgroundColor: sliceColors,
                    borderColor: "#0f172a",
                    borderWidth: 2
                };
            }

            const color = this.PALETTE[seriesIdx % this.PALETTE.length];
            return {
                label: col.name,
                data,
                backgroundColor: chartType === "line" ? `${color}33` : `${color}cc`,
                borderColor: color,
                borderWidth: 2,
                tension: 0.25,
                fill: chartType === "line",
                borderRadius: chartType === "bar" ? 6 : 0,
                pointRadius: chartType === "line" ? 4 : 0,
                pointHoverRadius: 6
            };
        });

        this.destroyChart();

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: isCircular || datasets.length > 1,
                    labels: {
                        color: "#e2e8f0",
                        font: { family: "Inter, Arial, sans-serif", size: 12 }
                    }
                },
                tooltip: {
                    backgroundColor: "#0f172a",
                    titleColor: "#f8fafc",
                    bodyColor: "#cbd5e1",
                    borderColor: "#334155",
                    borderWidth: 1,
                    padding: 10
                }
            }
        };

        if(!isCircular){
            options.scales = {
                x: {
                    ticks: { color: "#94a3b8", maxRotation: 45, autoSkip: true },
                    grid: { color: "rgba(148, 163, 184, 0.1)" }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: "#94a3b8" },
                    grid: { color: "rgba(148, 163, 184, 0.15)" }
                }
            };
        }

        this.chartInstance = new Chart(canvas, {
            type: chartType,
            data: { labels, datasets },
            options
        });
    },

    /* ==========================
       VISUAL ERD (MERMAID)
       ========================== */

    initMermaid(){
        if(this.erdInitialized || typeof mermaid === "undefined") return;
        mermaid.initialize({
            startOnLoad: false,
            theme: "base",
            securityLevel: "strict",
            er: {
                layoutDirection: "TB",
                useMaxWidth: false
            },
            themeVariables: {
                darkMode: true,
                background: "#0f172a",
                primaryColor: "#1e293b",
                primaryTextColor: "#f1f5f9",
                primaryBorderColor: "#3b82f6",
                secondaryColor: "#172554",
                tertiaryColor: "#0f172a",
                lineColor: "#60a5fa",
                textColor: "#e2e8f0",
                attributeBackgroundColorOdd: "#0f172a",
                attributeBackgroundColorEven: "#172033",
                fontFamily: "Inter, Arial, sans-serif",
                fontSize: "13px"
            }
        });
        this.erdInitialized = true;
    },

    getRelevantTablesForExercise(details, exercise){
        if(!exercise) return null;
        const text = `${exercise.prompt || ""} ${exercise.starterCode || ""}`;
        const matched = new Set();

        details.tables.forEach(t => {
            const regex = new RegExp(`\\b${t.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
            if(regex.test(text)){
                matched.add(t.name);
            }
        });

        if(matched.size === 0){
            return null; // fall back to all tables
        }

        // Expand 1-hop FK relationships so users see connected tables cleanly
        const expanded = new Set(matched);
        details.relations.forEach(rel => {
            if(matched.has(rel.from) || matched.has(rel.to)){
                expanded.add(rel.from);
                expanded.add(rel.to);
            }
        });

        return expanded;
    },

    getTableSetForScope(details, scope, exercise){
        if(scope === "all"){
            return new Set(details.tables.map(t => t.name));
        }
        if(scope === "relevant"){
            const relSet = this.getRelevantTablesForExercise(details, exercise);
            return relSet || new Set(details.tables.map(t => t.name));
        }
        const groupList = this.DOMAIN_GROUPS[scope];
        if(groupList){
            const existing = new Set(details.tables.map(t => t.name));
            return new Set(groupList.filter(name => existing.has(name)));
        }
        return new Set(details.tables.map(t => t.name));
    },

    sanitizeMermaidIdent(name){
        return String(name || "unknown").replace(/[^a-zA-Z0-9_]/g, "_");
    },

    buildErDiagramDefinition(details, tableSet){
        const filteredTables = details.tables.filter(t => tableSet.has(t.name));
        const filteredRelations = details.relations.filter(
            r => tableSet.has(r.from) && tableSet.has(r.to)
        );

        const lines = ["erDiagram"];

        filteredRelations.forEach(rel => {
            const fromIdent = this.sanitizeMermaidIdent(rel.from);
            const toIdent = this.sanitizeMermaidIdent(rel.to);
            const relSymbol = rel.from === rel.to ? "|o--o{" : "||--o{";
            lines.push(`    ${fromIdent} ${relSymbol} ${toIdent} : "${rel.toCol}"`);
        });

        filteredTables.forEach(table => {
            const tIdent = this.sanitizeMermaidIdent(table.name);
            lines.push(`    ${tIdent} {`);
            table.columns.forEach(col => {
                const cType = this.sanitizeMermaidIdent(col.type || "TEXT");
                const cName = this.sanitizeMermaidIdent(col.name);
                const keys = [];
                if(col.isPK) keys.push("PK");
                if(col.isFK) keys.push("FK");
                const keyPart = keys.length ? ` ${keys.join(",")}` : "";
                lines.push(`        ${cType} ${cName}${keyPart}`);
            });
            lines.push("    }");
        });

        return {
            definition: lines.join("\n"),
            tableCount: filteredTables.length,
            relationCount: filteredRelations.length
        };
    },

    applyErdZoom(container, zoomPercent){
        const svg = container.querySelector("svg");
        if(!svg) return;

        let baseWidth = Number(svg.dataset.baseWidth);
        if(!baseWidth){
            const vb = svg.getAttribute("viewBox");
            if(vb){
                const parts = vb.trim().split(/[\s,]+/);
                if(parts.length === 4 && Number(parts[2]) > 0){
                    baseWidth = Number(parts[2]);
                }
            }
            if(!baseWidth){
                baseWidth = svg.getBoundingClientRect().width || 700;
            }
            svg.dataset.baseWidth = String(baseWidth);
        }

        const scaledWidth = Math.max(240, Math.round(baseWidth * (zoomPercent / 100)));
        svg.style.maxWidth = "none";
        svg.style.width = `${scaledWidth}px`;
        svg.style.height = "auto";
    },

    async renderERD(targetId, scope, exercise, zoomPercent, metaLabelId){
        const targetEl = document.getElementById(targetId);
        if(!targetEl) return;

        if(typeof mermaid === "undefined"){
            targetEl.innerHTML = `<p class="error">Mermaid library failed to load. Check your internet connection.</p>`;
            return;
        }

        this.initMermaid();

        const details = Database.getSchemaDetails();
        if(!details.tables.length){
            targetEl.innerHTML = `<p class="error">No tables found in the database.</p>`;
            return;
        }

        const tableSet = this.getTableSetForScope(details, scope, exercise);
        const { definition, tableCount, relationCount } = this.buildErDiagramDefinition(details, tableSet);

        if(metaLabelId){
            const metaEl = document.getElementById(metaLabelId);
            if(metaEl){
                metaEl.textContent = `${tableCount} table${tableCount === 1 ? "" : "s"} • ${relationCount} relationship${relationCount === 1 ? "" : "s"}`;
            }
        }

        try{
            this.erdCounter++;
            const { svg } = await mermaid.render(`erd-graph-${this.erdCounter}`, definition);
            targetEl.innerHTML = svg;
            this.applyErdZoom(targetEl, zoomPercent);
        } catch(err){
            targetEl.innerHTML = `<p class="error">Failed to render ERD: ${err.message}</p>`;
        }
    }

};
