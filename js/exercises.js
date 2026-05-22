window.Exercises = [

/* ======================
BEGINNER
====================== */

{
id:1,
difficulty:"Beginner",
topic:"SELECT",
prompt:"Select all rows from Employees.",
hint:"Use SELECT * FROM Employees",
starterCode:"SELECT * FROM Employees;",
validatorType:"queryMatch",
expectedQuery:"SELECT * FROM Employees;"
},

{
id:2,
difficulty:"Beginner",
topic:"WHERE",
prompt:"Show employees with salary > 60000.",
hint:"Use WHERE salary > 60000",
starterCode:
`SELECT *
FROM Employees
WHERE salary > 60000;`,
validatorType:"resultMatch"
},

{
id:3,
difficulty:"Beginner",
topic:"ORDER BY",
prompt:"Sort Products by price descending.",
hint:"Use ORDER BY price DESC",
starterCode:
`SELECT *
FROM Products
ORDER BY price DESC;`,
validatorType:"resultMatch"
},

/* ======================
INTERMEDIATE
====================== */

{
id:4,
difficulty:"Intermediate",
topic:"JOIN",
prompt:"Show employee names with department names.",
hint:"JOIN Employees and Departments.",
starterCode:
`SELECT
e.name,
d.department_name
FROM Employees e
JOIN Departments d
ON e.department_id=d.id;`,
validatorType:"resultMatch"
},

{
id:5,
difficulty:"Intermediate",
topic:"GROUP BY",
prompt:"Count employees per department.",
hint:"COUNT(*) + GROUP BY",
starterCode:
`SELECT
department_id,
COUNT(*) AS total
FROM Employees
GROUP BY department_id;`,
validatorType:"resultMatch"
},

{
id:6,
difficulty:"Intermediate",
topic:"HAVING",
prompt:"Return departments having more than 1 employee.",
hint:"HAVING filters grouped results.",
starterCode:
`SELECT
department_id,
COUNT(*) AS total
FROM Employees
GROUP BY department_id
HAVING total > 1;`,
validatorType:"resultMatch"
},

/* ======================
ADVANCED
====================== */

{
id:7,
difficulty:"Advanced",
topic:"INSERT",
prompt:"Insert Nina into Employees.",
hint:"INSERT INTO Employees VALUES (...)",
starterCode:
`INSERT INTO Employees
VALUES
(6,'Nina',65000,2);`,
validatorType:"mutationMatch",

verifyQuery:
"SELECT * FROM Employees WHERE name='Nina';"
},

{
id:8,
difficulty:"Advanced",
topic:"UPDATE",
prompt:"Update Bob's salary to 60000.",
hint:"UPDATE ... SET ... WHERE ...",
starterCode:
`UPDATE Employees
SET salary=60000
WHERE name='Bob';`,
validatorType:"mutationMatch",

verifyQuery:
"SELECT salary FROM Employees WHERE name='Bob';"
},

{
id:9,
difficulty:"Advanced",
topic:"DELETE",
prompt:"Delete Ethan from Employees.",
hint:"DELETE ... WHERE ...",
starterCode:
`DELETE FROM Employees
WHERE name='Ethan';`,
validatorType:"mutationMatch",

verifyQuery:
"SELECT * FROM Employees WHERE name='Ethan';"
}

];


/* ======================
HELPERS
====================== */

window.ExerciseManager = {

currentIndex:0,

getByDifficulty(level){

    return Exercises.filter(
        ex => ex.difficulty === level
    );

},

getCurrent(level){

    const list =
        this.getByDifficulty(level);

    return list[
        this.currentIndex
    ] || null;

},

next(level){

    const list =
        this.getByDifficulty(level);

    this.currentIndex++;

    if(
        this.currentIndex >= list.length
    ){

        this.currentIndex = 0;

    }

    return this.getCurrent(level);

},

reset(){

    this.currentIndex = 0;

}

};