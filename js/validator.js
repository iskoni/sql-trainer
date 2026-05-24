/* ==========================
SQL VALIDATOR
========================== */

window.Validator = {

/* ==========================
MAIN VALIDATION
========================== */

async validate(exercise, userSQL){

    try{

        Database.reset();

        const expected =
            Database.execute(
                exercise.expectedQuery
            );

        Database.reset();

        const actual =
            Database.execute(
                userSQL
            );

        if(
            !actual.success
        ){

            return {

                success:false,

                message:
                actual.error

            };

        }

        if(
            !expected.success
        ){

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

    }

    catch(error){

        return {

            success:false,

            message:error.message

        };

    }

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