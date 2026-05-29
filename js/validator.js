/* ==========================
   SQL VALIDATOR
   ========================== */

window.Validator = {

/* ==========================
   MAIN VALIDATION
   ========================== */

async validate(exercise, userSQL){

    try{

        const type =
            exercise.validationType || "select";

        if(type === "dml"){

            return this.validateDML(
                exercise, userSQL
            );

        }

        if(type === "ddl"){

            return this.validateDDL(
                exercise, userSQL
            );

        }

        if(type === "multi"){

            return this.validateMulti(
                exercise, userSQL
            );

        }

        /* Default: SELECT comparison */

        return this.validateSelect(
            exercise, userSQL
        );

    }

    catch(error){

        return {

            success:false,

            message:error.message

        };

    }

},

/* ==========================
   SELECT VALIDATION
   ========================== */

validateSelect(exercise, userSQL){

    Database.reset();

    if(exercise.setupSQL){

        Database.execute(
            exercise.setupSQL
        );

    }

    const expected =
        Database.execute(
            exercise.expectedQuery
        );

    Database.reset();

    if(exercise.setupSQL){

        Database.execute(
            exercise.setupSQL
        );

    }

    const actual =
        Database.execute(
            userSQL
        );

    if(!actual.success){

        return {

            success:false,

            message:actual.error

        };

    }

    if(!expected.success){

        return {

            success:false,

            message:
            "Exercise definition error."

        };

    }

    const success =
        this.compareResults(
            expected.data,
            actual.data
        );

    return {

        success,

        message: success

        ?

        "Query result matches expected output."

        :

        "Result does not match expected output."

    };

},

/* ==========================
   DML VALIDATION
   ========================== */

validateDML(exercise, userSQL){

    /* Run expected query on fresh DB */

    Database.reset();

    if(exercise.setupSQL){

        Database.execute(
            exercise.setupSQL
        );

    }

    Database.execute(
        exercise.expectedQuery
    );

    const expected =
        Database.execute(
            exercise.verificationQuery
        );

    /* Run user query on fresh DB */

    Database.reset();

    if(exercise.setupSQL){

        Database.execute(
            exercise.setupSQL
        );

    }

    const userExec =
        Database.execute(userSQL);

    if(!userExec.success){

        return {

            success:false,

            message:userExec.error

        };

    }

    const actual =
        Database.execute(
            exercise.verificationQuery
        );

    if(!expected.success ||
       !actual.success){

        return {

            success:false,

            message:
            "Could not verify result."

        };

    }

    const success =
        this.compareResults(
            expected.data,
            actual.data
        );

    return {

        success,

        message: success

        ?

        "Database state matches expected result."

        :

        "Database state does not match. Check your DML statement."

    };

},

/* ==========================
   DDL VALIDATION
   ========================== */

validateDDL(exercise, userSQL){

    Database.reset();

    if(exercise.setupSQL){

        Database.execute(
            exercise.setupSQL
        );

    }

    const userExec =
        Database.execute(userSQL);

    if(!userExec.success){

        return {

            success:false,

            message:userExec.error

        };

    }

    /* Check via verification query
       (typically sqlite_master) */

    if(exercise.verificationQuery){

        Database.reset();

        if(exercise.setupSQL){

            Database.execute(
                exercise.setupSQL
            );

        }

        Database.execute(
            exercise.expectedQuery
        );

        const expected =
            Database.execute(
                exercise.verificationQuery
            );

        /* Re-run user on fresh */

        Database.reset();

        if(exercise.setupSQL){

            Database.execute(
                exercise.setupSQL
            );

        }

        Database.execute(userSQL);

        const actual =
            Database.execute(
                exercise.verificationQuery
            );

        if(!expected.success ||
           !actual.success){

            return {

                success:false,

                message:
                "Could not verify schema."

            };

        }

        const success =
            this.compareResults(
                expected.data,
                actual.data
            );

        return {

            success,

            message: success

            ?

            "Schema change verified successfully."

            :

            "Schema does not match expected structure."

        };

    }

    /* Fallback: check expectedSchema */

    if(exercise.expectedSchema){

        const schema =
            exercise.expectedSchema;

        const check =
            Database.execute(
                `PRAGMA table_info(${schema.tableName});`
            );

        if(!check.success ||
           check.data.length === 0){

            return {

                success:false,

                message:
                `Table "${schema.tableName}" not found.`

            };

        }

        const cols =
            check.data[0].values
            .map(r => r[1].toLowerCase());

        const expected =
            schema.columns
            .map(c => c.toLowerCase());

        const success =
            JSON.stringify(cols.sort())
            ===
            JSON.stringify(expected.sort());

        return {

            success,

            message: success

            ?

            "Table structure is correct."

            :

            `Expected columns: ${expected.join(", ")}. Got: ${cols.join(", ")}`

        };

    }

    return {

        success:true,

        message:"DDL executed successfully."

    };

},

/* ==========================
   MULTI-STATEMENT VALIDATION
   ========================== */

validateMulti(exercise, userSQL){

    /* Same as DML: run expected, then
       run user, compare via
       verificationQuery */

    return this.validateDML(
        exercise, userSQL
    );

},

/* ==========================
   COMPARE RESULTS
   ========================== */

compareResults(expected, actual){

    if(
        expected.length !==
        actual.length
    ){

        return false;

    }

    if(
        expected.length === 0 &&
        actual.length === 0
    ){

        return true;

    }

    for(

        let i=0;

        i<expected.length;

        i++

    ){

        const expectedSet =
            expected[i];

        const actualSet =
            actual[i];

        if(
            !this.compareTable(
                expectedSet,
                actualSet
            )
        ){

            return false;

        }

    }

    return true;

},

/* ==========================
   COMPARE TABLE
   ========================== */

compareTable(expected, actual){

    const expectedCols =
        [...expected.columns]
        .sort();

    const actualCols =
        [...actual.columns]
        .sort();

    if(

        JSON.stringify(
            expectedCols
        )

        !==

        JSON.stringify(
            actualCols
        )

    ){

        return false;

    }

    const expectedRows =
        this.normalizeRows(
            expected.values
        );

    const actualRows =
        this.normalizeRows(
            actual.values
        );

    return (

        JSON.stringify(
            expectedRows
        )

        ===

        JSON.stringify(
            actualRows
        )

    );

},

/* ==========================
   NORMALIZE ROWS
   ========================== */

normalizeRows(rows){

    return rows

        .map(row =>

            row.map(value =>

                String(value)
                .trim()
                .toLowerCase()

            )

        )

        .sort((a,b)=>{

            return JSON.stringify(a)
            .localeCompare(
                JSON.stringify(b)
            );

        });

}

};