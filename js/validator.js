/* ==========================
   SQL VALIDATOR
   ========================== */

window.Validator = {

    /* ==========================
       HELPERS
       ========================== */

    stripSqlComments(sql){
        return String(sql || "")
            .replace(/--[^\n\r]*/g, "")
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .trim();
    },

    hasTopLevelOrderBy(sql){
        let s = this.stripSqlComments(sql)
            .replace(/'(?:''|[^'])*'/g, "''")
            .replace(/"(?:""|[^"])*"/g, '""');
        let prev;
        do {
            prev = s;
            s = s.replace(/\([^()]*\)/g, "");
        } while (s !== prev);
        return /\bORDER\s+BY\b/i.test(s);
    },

    isOrderSensitive(exercise){
        if(exercise.orderSensitive !== undefined){
            return Boolean(exercise.orderSensitive);
        }
        const type = exercise.validationType || "select";
        if(type !== "select") return false;
        return this.hasTopLevelOrderBy(exercise.expectedQuery);
    },

    /* ==========================
       MAIN VALIDATION
       ========================== */

    async validate(exercise, userSQL){
        try{
            const cleaned = this.stripSqlComments(userSQL);
            if(!cleaned){
                return {
                    success: false,
                    message: "Please enter a SQL query before running."
                };
            }

            const type = exercise.validationType || "select";

            if(type === "conceptual"){
                return this.validateConceptual(exercise, cleaned);
            }

            if(type === "dml"){
                return this.validateDML(exercise, userSQL);
            }

            if(type === "ddl"){
                return this.validateDDL(exercise, userSQL);
            }

            if(type === "multi"){
                return this.validateMulti(exercise, userSQL);
            }

            /* Default: SELECT comparison */
            return this.validateSelect(exercise, userSQL);
        } catch(error){
            return {
                success: false,
                message: error.message
            };
        }
    },

    /* ==========================
       CONCEPTUAL (POSTGRESQL/MYSQL)
       ========================== */

    validateConceptual(exercise, cleanedSQL){
        const rules = exercise.conceptualPatterns || [];
        for(const rule of rules){
            const regex = rule.regex instanceof RegExp ? rule.regex : new RegExp(rule.regex, "i");
            if(!regex.test(cleanedSQL)){
                return {
                    success: false,
                    message: rule.message || "Your SQL statement is missing a required PostgreSQL/MySQL clause."
                };
            }
        }

        const refText = exercise.referenceSQL
            ? ` Reference syntax: ${exercise.referenceSQL}`
            : "";

        return {
            success: true,
            message: `Valid PostgreSQL/MySQL syntax!${refText}`
        };
    },

    /* ==========================
       SELECT VALIDATION
       ========================== */

    validateSelect(exercise, userSQL){
        Database.reset();
        if(exercise.setupSQL){
            Database.execute(exercise.setupSQL);
        }

        const expected = Database.execute(exercise.expectedQuery);

        Database.reset();
        if(exercise.setupSQL){
            Database.execute(exercise.setupSQL);
        }

        const actual = Database.execute(userSQL);

        if(!actual.success){
            return {
                success: false,
                message: actual.error
            };
        }

        if(!expected.success){
            return {
                success: false,
                message: "Exercise definition error."
            };
        }

        const orderSensitive = this.isOrderSensitive(exercise);

        const comparison = this.compareResults(expected.data, actual.data, {
            strictColumns: Boolean(exercise.strictColumns),
            orderSensitive
        });

        if(comparison.match && orderSensitive && !this.hasTopLevelOrderBy(userSQL)){
            return {
                success: false,
                message: "Your rows match by coincidence, but your query is missing an ORDER BY clause to guarantee the required sort order."
            };
        }

        return {
            success: comparison.match,
            message: comparison.match
                ? "Query result matches expected output."
                : comparison.reason
        };
    },

    /* ==========================
       DML VALIDATION
       ========================== */

    validateDML(exercise, userSQL){
        Database.reset();
        if(exercise.setupSQL){
            Database.execute(exercise.setupSQL);
        }

        const expExec = Database.execute(exercise.expectedQuery);
        if(!expExec.success){
            return {
                success: false,
                message: "Exercise definition error."
            };
        }

        const expected = Database.execute(exercise.verificationQuery);

        Database.reset();
        if(exercise.setupSQL){
            Database.execute(exercise.setupSQL);
        }

        const userExec = Database.execute(userSQL);
        if(!userExec.success){
            return {
                success: false,
                message: userExec.error
            };
        }

        const actual = Database.execute(exercise.verificationQuery);

        if(!expected.success || !actual.success){
            return {
                success: false,
                message: "Could not verify database state."
            };
        }

        const comparison = this.compareResults(expected.data, actual.data, {
            strictColumns: false,
            orderSensitive: this.hasTopLevelOrderBy(exercise.verificationQuery)
        });

        return {
            success: comparison.match,
            message: comparison.match
                ? "Database state matches expected result."
                : `Database state does not match. ${comparison.reason}`
        };
    },

    /* ==========================
       DDL VALIDATION
       ========================== */

    validateDDL(exercise, userSQL){
        Database.reset();
        if(exercise.setupSQL){
            Database.execute(exercise.setupSQL);
        }

        const userExec = Database.execute(userSQL);
        if(!userExec.success){
            return {
                success: false,
                message: userExec.error
            };
        }

        /* Check via verification query */
        if(exercise.verificationQuery){
            Database.reset();
            if(exercise.setupSQL){
                Database.execute(exercise.setupSQL);
            }

            const expExec = Database.execute(exercise.expectedQuery);
            if(!expExec.success){
                return {
                    success: false,
                    message: "Exercise definition error."
                };
            }
            if(exercise.postTestSQL){
                Database.execute(exercise.postTestSQL);
            }
            const expected = Database.execute(exercise.verificationQuery);

            Database.reset();
            if(exercise.setupSQL){
                Database.execute(exercise.setupSQL);
            }
            Database.execute(userSQL);
            if(exercise.postTestSQL){
                Database.execute(exercise.postTestSQL);
            }
            const actual = Database.execute(exercise.verificationQuery);

            if(!expected.success || !actual.success){
                return {
                    success: false,
                    message: actual.error || "Could not verify schema."
                };
            }

            const comparison = this.compareResults(expected.data, actual.data, {
                strictColumns: false,
                orderSensitive: this.hasTopLevelOrderBy(exercise.verificationQuery)
            });

            return {
                success: comparison.match,
                message: comparison.match
                    ? "Schema change verified successfully."
                    : `Schema does not match expected structure. ${comparison.reason}`
            };
        }

        /* Fallback: check expectedSchema */
        if(exercise.expectedSchema){
            const schema = exercise.expectedSchema;
            const check = Database.execute(`PRAGMA table_info("${schema.tableName}");`);

            if(!check.success || check.data.length === 0){
                return {
                    success: false,
                    message: `Table "${schema.tableName}" not found.`
                };
            }

            const cols = check.data[0].values.map(r => r[1].toLowerCase());
            const expected = schema.columns.map(c => c.toLowerCase());

            const success =
                JSON.stringify([...cols].sort()) === JSON.stringify([...expected].sort());

            return {
                success,
                message: success
                    ? "Table structure is correct."
                    : `Expected columns: ${expected.join(", ")}. Got: ${cols.join(", ")}.`
            };
        }

        return {
            success: false,
            message: "Exercise validation configuration error."
        };
    },

    /* ==========================
       MULTI-STATEMENT VALIDATION
       ========================== */

    validateMulti(exercise, userSQL){
        return this.validateDML(exercise, userSQL);
    },

    /* ==========================
       COMPARE RESULTS
       ========================== */

    compareResults(expected, actual, options = {}){
        if(expected.length !== actual.length){
            if(actual.length === 0 && expected.length > 0){
                return { match: false, reason: "Your query returned no rows." };
            }
            return { match: false, reason: "Result set structure does not match expected output." };
        }

        if(expected.length === 0 && actual.length === 0){
            return { match: true };
        }

        for(let i = 0; i < expected.length; i++){
            const res = this.compareTable(expected[i], actual[i], options);
            if(!res.match){
                return res;
            }
        }

        return { match: true };
    },

    /* ==========================
       COMPARE TABLE
       ========================== */

    compareTable(expected, actual, options = {}){
        const strictColumns = Boolean(options.strictColumns);
        const orderSensitive = Boolean(options.orderSensitive);

        const expCols = expected.columns.map(c => String(c).trim().toLowerCase());
        const actCols = actual.columns.map(c => String(c).trim().toLowerCase());

        if(expCols.length !== actCols.length){
            return {
                match: false,
                reason: `Expected ${expCols.length} column(s), got ${actCols.length}.`
            };
        }

        // Determine column mapping from expected column index -> actual column index
        let colMap = null;
        const expUnique = new Set(expCols).size === expCols.length;
        const actUnique = new Set(actCols).size === actCols.length;
        const sameColMultiset =
            JSON.stringify([...expCols].sort()) === JSON.stringify([...actCols].sort());

        if(strictColumns){
            if(!sameColMultiset){
                return {
                    match: false,
                    reason: `Column names do not match. Expected: ${expected.columns.join(", ")}.`
                };
            }
            if(expUnique && actUnique){
                colMap = expCols.map(c => actCols.indexOf(c));
            } else {
                colMap = expCols.map((_, idx) => idx);
            }
        } else if(sameColMultiset && expUnique && actUnique){
            // Align by matching column name even if selected in a different order
            colMap = expCols.map(c => actCols.indexOf(c));
        } else {
            // Flexible alias mode: align positionally
            colMap = expCols.map((_, idx) => idx);
        }

        if(expected.values.length !== actual.values.length){
            return {
                match: false,
                reason: `Expected ${expected.values.length} row(s), got ${actual.values.length}.`
            };
        }

        const expectedRows = expected.values.map(row =>
            row.map(val => this.normalizeCell(val))
        );
        const actualRows = actual.values.map(row =>
            colMap.map(actIdx => this.normalizeCell(row[actIdx]))
        );

        const sortRows = (rows) =>
            [...rows].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

        if(orderSensitive){
            if(JSON.stringify(expectedRows) === JSON.stringify(actualRows)){
                return { match: true };
            }
            // Check whether rows match if sorted (to give specific sort-order feedback!)
            if(JSON.stringify(sortRows(expectedRows)) === JSON.stringify(sortRows(actualRows))){
                return {
                    match: false,
                    reason: "Your rows match, but the sort order is incorrect. Check your ORDER BY clause."
                };
            }
            return {
                match: false,
                reason: "Result does not match expected output."
            };
        }

        const match =
            JSON.stringify(sortRows(expectedRows)) === JSON.stringify(sortRows(actualRows));

        return match
            ? { match: true }
            : { match: false, reason: "Result does not match expected output." };
    },

    /* ==========================
       NORMALIZE CELL
       ========================== */

    normalizeCell(value){
        if(value === null || value === undefined){
            return "__SQL_NULL__";
        }
        if(typeof value === "number" && Number.isFinite(value)){
            const rounded = Math.abs(value) < 1e-9 ? 0 : Number(value.toFixed(4));
            return `N:${rounded}`;
        }
        return `S:${String(value).trim()}`;
    }

};
