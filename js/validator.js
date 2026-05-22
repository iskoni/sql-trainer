/* ==========================
   SQL VALIDATION ENGINE
========================== */

window.Validator = {

/* --------------------------
   ENTRY POINT
-------------------------- */

async validate(exercise,userSQL){

    switch(
        exercise.validatorType
    ){

        case "queryMatch":

            return this.queryMatch(
                exercise,
                userSQL
            );

        case "resultMatch":

            return this.resultMatch(
                exercise,
                userSQL
            );

        case "mutationMatch":

            return this.mutationMatch(
                exercise,
                userSQL
            );

        default:

            return {
                success:false,
                message:"Unknown validator."
            };

    }

},

/* --------------------------
   NORMALIZER
-------------------------- */

normalize(sql){

    return sql
        .toLowerCase()
        .replace(/;/g,"")
        .replace(/\s+/g," ")
        .trim();

},

/* --------------------------
   QUERY MATCH
-------------------------- */

queryMatch(exercise,userSQL){

    const expected =
        this.normalize(
            exercise.expectedQuery
        );

    const actual =
        this.normalize(userSQL);

    if(expected === actual){

        return {
            success:true,
            message:"Correct SQL."
        };

    }

    return {

        success:false,

        message:
        "Query structure differs from expected answer."

    };

},

/* --------------------------
   RESULT MATCH
-------------------------- */

async resultMatch(
    exercise,
    userSQL
){

    await Database.reset();

    const userResult =
        Database.execute(userSQL);

    await Database.reset();

    const expectedResult =
        Database.execute(
            exercise.starterCode
        );

    if(
        !userResult.success
    ){

        return {

            success:false,

            message:
            "Your SQL contains errors."

        };

    }

    const userData =
        JSON.stringify(
            userResult.data
        );

    const expectedData =
        JSON.stringify(
            expectedResult.data
        );

    if(
        userData === expectedData
    ){

        return {

            success:true,

            message:
            "Correct result set."

        };

    }

    return {

        success:false,

        message:
        "Returned rows do not match expected output."

    };

},

/* --------------------------
   MUTATION MATCH
-------------------------- */

async mutationMatch(
    exercise,
    userSQL
){

    await Database.reset();

    const mutation =
        Database.execute(userSQL);

    if(
        !mutation.success
    ){

        return {

            success:false,

            message:
            mutation.error

        };

    }

    const verification =
        Database.execute(
            exercise.verifyQuery
        );

    if(
        !verification.success
    ){

        return {

            success:false,

            message:
            "Verification failed."

        };

    }

    const rows =
        verification.data;

    /* INSERT */

    if(
        exercise.topic === "INSERT"
    ){

        if(
            rows.length &&
            rows[0].values.length > 0
        ){

            return {

                success:true,

                message:
                "Insert successful."

            };

        }

    }

    /* UPDATE */

    if(
        exercise.topic === "UPDATE"
    ){

        const value =
            rows[0]?.values?.[0]?.[0];

        if(value === 60000){

            return {

                success:true,

                message:
                "Update successful."

            };

        }

    }

    /* DELETE */

    if(
        exercise.topic === "DELETE"
    ){

        if(
            rows.length === 0 ||
            rows[0].values.length === 0
        ){

            return {

                success:true,

                message:
                "Delete successful."

            };

        }

    }

    return {

        success:false,

        message:
        "Database state does not match expected mutation."

    };

}

};