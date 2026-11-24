/* ==========================
   SQL TRAINER APP
   ========================== */

let editor;

let currentDifficulty =
    "Beginner";

let currentExercise =
    null;

let solvedIds = new Set();
let score = 0;
let isLoadingExercise = false;

let exerciseIndex = 0;

let filteredExercises = [];

/* ==========================
   HTML ESCAPING & PROGRESS
   ========================== */

function escapeHtml(value){
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function loadProgress(){
    try{
        const raw = localStorage.getItem("sql_solved_ids");
        if(raw){
            const parsed = JSON.parse(raw);
            if(Array.isArray(parsed)){
                solvedIds = new Set(parsed);
            }
        }
    } catch(_e){
        solvedIds = new Set();
    }
    recalculateScore();
}

function saveProgress(){
    try{
        localStorage.setItem("sql_solved_ids", JSON.stringify([...solvedIds]));
    } catch(_e){
        // Ignore storage quota or private-mode restrictions
    }
}

function recalculateScore(){
    const all = window.Exercises || [];
    score = all.reduce((sum, ex) => sum + (solvedIds.has(ex.id) ? (ex.xp || 0) : 0), 0);
}

function updateProgressUI(){
    const summary = document.getElementById("progressSummary");
    const total = (window.Exercises || []).length;
    if(summary){
        summary.textContent = `${solvedIds.size} / ${total} solved • ${score} XP`;
    }

    document.querySelectorAll(".topic-exercise-item").forEach(li => {
        const idx = parseInt(li.dataset.index, 10);
        const ex = filteredExercises[idx];
        if(ex){
            const isSolved = solvedIds.has(ex.id);
            li.classList.toggle("solved", isSolved);
            const baseTitle = ex.title || ("Exercise " + ex.id);
            li.textContent = isSolved ? `✓ ${baseTitle}` : baseTitle;
        }
    });

    updateCounter();
}

/* ==========================
   STARTUP
   ========================== */

window.addEventListener(

    "DOMContentLoaded",

    async ()=>{

        try{
            await Database.init();
        } catch(err){
            const textEl = document.getElementById("exerciseText");
            if(textEl){
                textEl.textContent = "Failed to initialize SQLite engine. Please check your internet connection and reload.";
            }
            const outputEl = document.getElementById("output");
            if(outputEl){
                outputEl.innerHTML = `<div class="feedback-card feedback-error">❌ Database initialization error: ${escapeHtml(err.message || err)}</div>`;
            }
            return;
        }

        loadProgress();

        initializeEditor();

        initializeButtons();

        initializeVisualizationControls();

        initializeDifficulty();

        loadExerciseSet();

        loadExercise();

        renderSchema();

        renderTablesList();

        updateProgressUI();

    }

);

/* ==========================
   EDITOR
   ========================== */

function initializeEditor(){

    editor =
        CodeMirror.fromTextArea(

            document.getElementById(
                "sql-editor"
            ),

            {

                mode:"text/x-sql",

                theme:
                "material-darker",

                lineNumbers:true,

                matchBrackets:true,

                smartIndent:true,

                autofocus:true,

                extraKeys:{
                    "Ctrl-Enter": () => runExercise(),
                    "Cmd-Enter": () => runExercise()
                }

            }

        );

    editor.on("change", (_cm, changeObj) => {
        if(isLoadingExercise || !currentExercise) return;
        if(changeObj && changeObj.origin === "setValue") return;
        const val = editor.getValue();
        try{
            if(val === ""){
                localStorage.removeItem(`sql_draft_${currentExercise.id}`);
            } else {
                localStorage.setItem(`sql_draft_${currentExercise.id}`, val);
            }
        } catch(_e){
            // Ignore storage errors
        }
    });

}

/* ==========================
   BUTTONS
   ========================== */

function initializeButtons(){

    document
    .getElementById(
        "runBtn"
    )
    .addEventListener(
        "click",
        runExercise
    );

    document
    .getElementById(
        "nextBtn"
    )
    .addEventListener(
        "click",
        nextExercise
    );

    document
    .getElementById(
        "hintBtn"
    )
    .addEventListener(
        "click",
        toggleHint
    );

    document
    .getElementById(
        "resetBtn"
    )
    .addEventListener(

        "click",

        ()=>{

            Database.reset();

            renderSchema();

            loadExercise();

            resetOutput("Database reset.");

        }

    );

    document
    .getElementById(
        "toggleSchemaBtn"
    )
    .addEventListener(
        "click",
        toggleSchema
    );

    document
    .getElementById(
        "exerciseCounter"
    )
    .addEventListener(
        "change",
        (e) => {
            navigateToExercise(parseInt(e.target.value, 10));
        }
    );

    const mobileBtn = document.getElementById("mobileMenuBtn");
    if(mobileBtn) {
        mobileBtn.addEventListener("click", () => {
            document.querySelector(".sidebar").classList.toggle("open");
        });
    }

    // Close sidebar when clicking outside of it on mobile
    document.addEventListener("click", (e) => {
        const sidebar = document.querySelector(".sidebar");
        if (sidebar && sidebar.classList.contains("open")) {
            if (!sidebar.contains(e.target) && mobileBtn && !mobileBtn.contains(e.target)) {
                sidebar.classList.remove("open");
            }
        }
    });

}

/* ==========================
   EXERCISE SET
   ========================== */

function loadExerciseSet(){

    filteredExercises =

        (window.Exercises || [])
        .filter(

            ex =>

            ex.difficulty ===
            currentDifficulty

        );

    exerciseIndex = 0;

    /* Rebuild topic sidebar */

    renderTopics();

}

/* ==========================
   LOAD EXERCISE
   ========================== */

function loadExercise(){

    if(
        !filteredExercises.length
    ){

        document
        .getElementById(
            "exerciseText"
        )
        .textContent =
            "No exercises for this level yet.";

        return;

    }

    currentExercise =
        filteredExercises[
            exerciseIndex
        ];

    renderExercise(
        currentExercise
    );

    syncTopicUI();

    updateCounter();

    refreshErdIfVisible();

}

/* ==========================
   RENDER EXERCISE
   ========================== */

function renderExercise(ex){

    document
    .getElementById(
        "exerciseText"
    )
    .textContent =
        ex.prompt;

    document
    .getElementById(
        "hintBox"
    )
    .textContent =
        ex.hint;

    document
    .getElementById(
        "hintBox"
    )
    .classList.add(
        "hidden"
    );

    /* Note box for non-SQLite */

    const noteBox =
        document
        .getElementById(
            "noteBox"
        );

    if(ex.note){

        noteBox.textContent =
            "⚠ " + ex.note;

        noteBox.classList
        .remove("hidden");

    } else {

        noteBox.textContent = "";

        noteBox.classList
        .add("hidden");

    }

    /* Difficulty badge */

    const badge =
        document
        .getElementById(
            "difficultyBadge"
        );

    badge.textContent =
        ex.difficulty;

    badge.className =
        "badge badge-" +
        ex.difficulty
        .toLowerCase();

    document
    .getElementById(
        "topicBadge"
    )
    .textContent =
        ex.topic;

    const defaultCode = "-- Write your SQL here";
    let savedDraft = null;
    try{
        savedDraft = localStorage.getItem(`sql_draft_${ex.id}`);
    } catch(_e){
        savedDraft = null;
    }

    isLoadingExercise = true;
    try{
        if (savedDraft !== null && savedDraft !== "") {
            editor.setValue(savedDraft);
            editor.setOption("placeholder", "");
        } else if (!ex.starterCode || ex.starterCode === defaultCode) {
            editor.setValue("");
            editor.setOption("placeholder", defaultCode);
        } else {
            editor.setValue(ex.starterCode);
            editor.setOption("placeholder", "");
        }
    } finally {
        isLoadingExercise = false;
    }

}

/* ==========================
   EXERCISE COUNTER
   ========================== */

function updateCounter(){

    const selector = document.getElementById("exerciseCounter");
    if(!selector) return;
    selector.innerHTML = "";
    
    filteredExercises.forEach((ex, idx) => {
        const opt = document.createElement("option");
        opt.value = idx;
        const prefix = solvedIds.has(ex.id) ? "✓ " : "";
        opt.textContent = prefix + (idx + 1) + " / " + filteredExercises.length + " - " + ex.topic;
        if (idx === exerciseIndex) {
            opt.selected = true;
        }
        selector.appendChild(opt);
    });

}

function resetOutput(message = "Ready."){

    Visualizer.prepareChartControls(null);

    const output = document.getElementById("output");
    if(output){
        output.classList.remove("hidden");
        output.innerHTML = message;
    }

    const validationOutput = document.getElementById("validationOutput");
    if(validationOutput){
        validationOutput.innerHTML = "";
    }

}

/* ==========================
   RUN EXERCISE
   ========================== */

async function runExercise(){

    if(!currentExercise) return;

    const sql =
        editor.getValue();

    const cleanedSql = Validator.stripSqlComments(sql);
    if(!cleanedSql){
        resetOutput("Ready.");
        renderValidation({
            success: false,
            message: "Please enter a SQL query before running."
        });
        return;
    }

    /* Conceptual PostgreSQL / MySQL exercises: validate syntax without running in SQLite */

    if(currentExercise.validationType === "conceptual"){

        resetOutput(`
        <div class="feedback-card feedback-info">
            ℹ Conceptual PostgreSQL / MySQL exercise — evaluated by syntax check (not executed in SQLite).
        </div>
        `);

        const validation = await Validator.validate(currentExercise, sql);
        renderValidation(validation);
        return;

    }

    /* Execute on a clean database state matching the exercise's starting point */

    Database.reset();
    if(currentExercise.setupSQL){
        Database.execute(currentExercise.setupSQL);
    }

    const result =
        Database.execute(sql);

    renderExecution(
        result
    );

    const validation =
        await Validator.validate(
            currentExercise,
            sql
        );

    renderValidation(
        validation
    );

}

/* ==========================
   RESULT PANEL
   ========================== */

function renderExecution(result){

    const output =
        document
        .getElementById(
            "output"
        );

    const validationOutput =
        document
        .getElementById(
            "validationOutput"
        );

    if(validationOutput){
        validationOutput.innerHTML = "";
    }

    if(
        !result.success
    ){

        Visualizer.prepareChartControls(null);

        output.innerHTML = `

        <div class="feedback-card feedback-error">

            ❌ ${escapeHtml(result.error)}

        </div>

        `;

        return;

    }

    if(
        result.data.length===0
    ){

        Visualizer.prepareChartControls(null);

        output.innerHTML = `

        <div class="feedback-card feedback-success">

            Query executed.

        </div>

        `;

        return;

    }

    let html = "";

    result.data.forEach((table, tableIdx) => {
        if(result.data.length > 1){
            html += `<p class="result-set-label">Result Set ${tableIdx + 1}</p>`;
        }

        html += `<div class="table-responsive"><table class="result-table"><thead><tr>`;

        table.columns.forEach(col => {
            html += `<th>${escapeHtml(col)}</th>`;
        });

        html += `</tr></thead><tbody>`;

        table.values.forEach(row => {
            html += "<tr>";
            row.forEach(cell => {
                html += `<td>${cell !== null && cell !== undefined ? escapeHtml(cell) : "<em>NULL</em>"}</td>`;
            });
            html += "</tr>";
        });

        html += `</tbody></table></div>`;
    });

    output.innerHTML =
        html;

    Visualizer.prepareChartControls(result.data[0]);

}

/* ==========================
   VALIDATION
   ========================== */

function renderValidation(
    validation
){

    const validationOutput =
        document
        .getElementById(
            "validationOutput"
        );

    if(
        validation.success
    ){

        const alreadySolved = solvedIds.has(currentExercise.id);
        if(!alreadySolved){
            solvedIds.add(currentExercise.id);
            recalculateScore();
            saveProgress();
            updateProgressUI();
        }

        const xpLine = alreadySolved
            ? `XP: Already earned (+${currentExercise.xp} XP)`
            : `XP: +${currentExercise.xp}`;

        validationOutput.innerHTML = `

        <div class="feedback-card feedback-success">

            ✅ Correct

            <br><br>

            ${escapeHtml(validation.message)}

            <br><br>

            ${xpLine}

            <br>

            Total Score: ${score} XP (${solvedIds.size} / ${(window.Exercises || []).length} solved)

        </div>

        `;

    }

    else{

        validationOutput.innerHTML = `

        <div class="feedback-card feedback-error">

            ❌ Incorrect

            <br><br>

            ${escapeHtml(validation.message)}

        </div>

        `;

    }

}

/* ==========================
   EXERCISE NAVIGATION
   ========================== */

function navigateToExercise(index){

    exerciseIndex = index;

    Database.reset();

    renderSchema();

    hideSchema();

    loadExercise();

    resetOutput("Ready.");

    const sidebar = document.querySelector(".sidebar");
    if(sidebar){
        sidebar.classList.remove("open");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

}

/* ==========================
   NEXT EXERCISE
   ========================== */

function nextExercise(){

    const nextIndex = (exerciseIndex + 1) >= filteredExercises.length
        ? 0
        : exerciseIndex + 1;

    navigateToExercise(nextIndex);

}

/* ==========================
   DIFFICULTY
   ========================== */

function initializeDifficulty(){

    document
    .getElementById(
        "difficulty"
    )
    .addEventListener(

        "change",

        e=>{

            currentDifficulty =
                e.target.value;

            loadExerciseSet();

            navigateToExercise(0);

        }

    );

}

/* ==========================
   DYNAMIC TOPICS
   ========================== */

function renderTopics(){

    const topicsUl =
        document
        .getElementById(
            "topics"
        );

    topicsUl.innerHTML = "";

    const topics = [
        ...new Set(
            filteredExercises
            .map(ex => ex.topic)
        )
    ];

    topics.forEach(topic =>{

        const li =
            document
            .createElement("li");

        li.className = "topic-header";
        li.textContent = topic;

        const exList = document.createElement("ul");
        exList.className = "topic-exercises hidden";
        
        filteredExercises.filter(e => e.topic === topic).forEach(ex => {
            const exLi = document.createElement("li");
            const isSolved = solvedIds.has(ex.id);
            const baseTitle = ex.title || "Exercise " + ex.id;
            exLi.textContent = isSolved ? `✓ ${baseTitle}` : baseTitle;
            exLi.className = isSolved ? "topic-exercise-item solved" : "topic-exercise-item";
            exLi.dataset.index = filteredExercises.indexOf(ex);
            exLi.addEventListener("click", (e) => {
                e.stopPropagation();
                navigateToExercise(parseInt(exLi.dataset.index, 10));
            });
            exList.appendChild(exLi);
        });

        li.addEventListener("click", () => {
            exList.classList.toggle("hidden");
        });

        li.appendChild(exList);
        topicsUl.appendChild(li);

    });

}

function syncTopicUI(){

    document.querySelectorAll(".topic-exercises").forEach(ul => ul.classList.add("hidden"));
    document.querySelectorAll(".topic-exercise-item").forEach(li => li.classList.remove("active"));
    
    const activeLi = document.querySelector(`.topic-exercise-item[data-index="${exerciseIndex}"]`);
    if (activeLi) {
        activeLi.classList.add("active");
        const parentUl = activeLi.closest(".topic-exercises");
        if (parentUl) {
            parentUl.classList.remove("hidden");
        }
    }

}

/* ==========================
   HINT
   ========================== */

function toggleHint(){

    document
    .getElementById(
        "hintBox"
    )
    .classList.toggle(
        "hidden"
    );

}

/* ==========================
   SCHEMA
   ========================== */

function renderSchema(){

    const list =
        document
        .getElementById(
            "schemaList"
        );

    list.innerHTML = "";

    const details = Database.getSchemaDetails();
    const rows = details.tables.length
        ? details.tables.map(t => {
            const cols = t.columns.map(c => {
                const tags = [];
                if(c.isPK) tags.push("PK");
                if(c.isFK) tags.push("FK");
                return tags.length ? `${c.name} [${tags.join(",")}]` : c.name;
            }).join(", ");
            return { tableName: t.name, text: `${t.name}(${cols})` };
        })
        : Database.getSchema().map(row => ({
            tableName: row.split("(")[0],
            text: row
        }));

    rows.forEach(item=>{

        const li =
            document
            .createElement(
                "li"
            );

        li.dataset.table = item.tableName;
        li.textContent = item.text;

        list.appendChild(li);

    });

}

function hideSchema(){

    const box =
        document
        .getElementById(
            "schemaBox"
        );

    const btn =
        document
        .getElementById(
            "toggleSchemaBtn"
        );

    if(box){
        box.classList.add("hidden");
    }

    if(btn){
        btn.textContent = "Show Schema";
    }

    document.querySelectorAll("#schemaList li.schema-highlight").forEach(item => {
        item.classList.remove("schema-highlight");
    });

}

function toggleSchema(){

    const box =
        document
        .getElementById(
            "schemaBox"
        );

    const btn =
        document
        .getElementById(
            "toggleSchemaBtn"
        );

    box.classList.toggle(
        "hidden"
    );

    const isHidden = box.classList.contains("hidden");

    btn.textContent =
        isHidden
        ? "Show Schema"
        : "Hide Schema";

    if(!isHidden){
        refreshErdIfVisible();
    }

}

function refreshErdIfVisible(){

    const box = document.getElementById("schemaBox");
    const erdView = document.getElementById("schemaErdView");

    if(box && !box.classList.contains("hidden") && erdView && !erdView.classList.contains("hidden")){
        const scope = document.getElementById("erdScopeSelect").value;
        Visualizer.renderERD("erdDiagram", scope, currentExercise, Visualizer.erdZoom, "erdMetaLabel");
    }

}

function stepErdZoom(delta, isModal){

    if(isModal){
        Visualizer.erdModalZoom = delta === 0
            ? 100
            : Math.min(220, Math.max(50, Visualizer.erdModalZoom + delta));
        document.getElementById("erdModalZoomLabel").textContent = `${Visualizer.erdModalZoom}%`;
        Visualizer.applyErdZoom(document.getElementById("erdModalDiagram"), Visualizer.erdModalZoom);
    } else {
        Visualizer.erdZoom = delta === 0
            ? 100
            : Math.min(220, Math.max(50, Visualizer.erdZoom + delta));
        document.getElementById("erdZoomLabel").textContent = `${Visualizer.erdZoom}%`;
        Visualizer.applyErdZoom(document.getElementById("erdDiagram"), Visualizer.erdZoom);
    }

}

function openErdModal(){

    const modal = document.getElementById("erdModal");
    const inlineScope = document.getElementById("erdScopeSelect").value;
    const modalScopeSelect = document.getElementById("erdModalScopeSelect");

    modalScopeSelect.value = inlineScope === "relevant" ? "all" : inlineScope;
    Visualizer.erdModalZoom = 100;
    document.getElementById("erdModalZoomLabel").textContent = "100%";

    modal.classList.remove("hidden");

    Visualizer.renderERD(
        "erdModalDiagram",
        modalScopeSelect.value,
        currentExercise,
        Visualizer.erdModalZoom,
        "erdModalMetaLabel"
    );

}

function closeErdModal(){

    const modal = document.getElementById("erdModal");
    if(modal){
        modal.classList.add("hidden");
    }

}

function initializeVisualizationControls(){

    const tableTabBtn = document.getElementById("tableTabBtn");
    const chartTabBtn = document.getElementById("chartTabBtn");
    const outputEl = document.getElementById("output");
    const chartView = document.getElementById("chartView");

    tableTabBtn.addEventListener("click", () => {
        tableTabBtn.classList.add("active");
        chartTabBtn.classList.remove("active");
        outputEl.classList.remove("hidden");
        chartView.classList.add("hidden");
    });

    chartTabBtn.addEventListener("click", () => {
        if(chartTabBtn.disabled) return;
        chartTabBtn.classList.add("active");
        tableTabBtn.classList.remove("active");
        outputEl.classList.add("hidden");
        chartView.classList.remove("hidden");
        Visualizer.renderChart();
    });

    ["chartTypeSelect", "chartXSelect", "chartYSelect"].forEach(id => {
        document.getElementById(id).addEventListener("change", () => {
            if(!chartView.classList.contains("hidden")){
                Visualizer.renderChart();
            }
        });
    });

    const schemaListTab = document.getElementById("schemaListTab");
    const schemaErdTab = document.getElementById("schemaErdTab");
    const schemaListView = document.getElementById("schemaListView");
    const schemaErdView = document.getElementById("schemaErdView");

    schemaListTab.addEventListener("click", () => {
        schemaListTab.classList.add("active");
        schemaErdTab.classList.remove("active");
        schemaListView.classList.remove("hidden");
        schemaErdView.classList.add("hidden");
    });

    schemaErdTab.addEventListener("click", () => {
        schemaErdTab.classList.add("active");
        schemaListTab.classList.remove("active");
        schemaErdView.classList.remove("hidden");
        schemaListView.classList.add("hidden");
        refreshErdIfVisible();
    });

    document.getElementById("erdScopeSelect").addEventListener("change", () => {
        refreshErdIfVisible();
    });

    document.getElementById("erdZoomInBtn").addEventListener("click", () => stepErdZoom(20, false));
    document.getElementById("erdZoomOutBtn").addEventListener("click", () => stepErdZoom(-20, false));
    document.getElementById("erdZoomResetBtn").addEventListener("click", () => stepErdZoom(0, false));
    document.getElementById("erdFullscreenBtn").addEventListener("click", openErdModal);

    document.getElementById("erdModalScopeSelect").addEventListener("change", (e) => {
        Visualizer.renderERD(
            "erdModalDiagram",
            e.target.value,
            currentExercise,
            Visualizer.erdModalZoom,
            "erdModalMetaLabel"
        );
    });

    document.getElementById("erdModalZoomInBtn").addEventListener("click", () => stepErdZoom(20, true));
    document.getElementById("erdModalZoomOutBtn").addEventListener("click", () => stepErdZoom(-20, true));
    document.getElementById("erdModalZoomResetBtn").addEventListener("click", () => stepErdZoom(0, true));
    document.getElementById("erdModalCloseBtn").addEventListener("click", closeErdModal);

    document.getElementById("erdModal").addEventListener("click", (e) => {
        if(e.target.id === "erdModal"){
            closeErdModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if(e.key === "Escape"){
            closeErdModal();
        }
    });

}

/* ==========================
   DYNAMIC TABLES LIST
   ========================== */

function renderTablesList(){

    const tablesList =
        document
        .getElementById(
            "tablesList"
        );

    if(!tablesList) return;

    tablesList.innerHTML = "";

    Database
    .getSchema()

    .forEach(row=>{

        const tableName =
            row.split("(")[0];

        const li =
            document
            .createElement(
                "li"
            );

        li.textContent =
            tableName;

        li.addEventListener("click", () => {
            const box = document.getElementById("schemaBox");
            const btn = document.getElementById("toggleSchemaBtn");
            if(box.classList.contains("hidden")){
                box.classList.remove("hidden");
                btn.textContent = "Hide Schema";
            }

            // Switch to list view and highlight the clicked table
            document.getElementById("schemaListTab").click();
            let highlighted = null;
            document.querySelectorAll("#schemaList li").forEach(item => {
                const isMatch = item.dataset.table === tableName;
                item.classList.toggle("schema-highlight", isMatch);
                if(isMatch) highlighted = item;
            });

            const list = document.getElementById("schemaList");
            if(highlighted && list){
                list.scrollTop = Math.max(0, highlighted.offsetTop - list.offsetTop - 40);
            }

            box.scrollIntoView({ behavior: "smooth", block: "nearest" });
            document.querySelector(".sidebar").classList.remove("open");
        });

        tablesList
        .appendChild(li);

    });

}