window.Exercises = [

/* =========================
   BEGINNER
========================= */

{
id:1,
difficulty:"Beginner",
topic:"SELECT",
title:"All Employees",
prompt:"Return all columns from Employees.",
hint:"Use SELECT * FROM Employees",
starterMode:"empty",
starterCode:"-- Write SQL here",
validatorType:"resultMatch",
xp:10
},

{
id:2,
difficulty:"Beginner",
topic:"WHERE",
title:"High Salary Employees",
prompt:"Find employees with salary greater than 60000.",
hint:"Use WHERE salary > value",
starterMode:"empty",
starterCode:"-- Write SQL here",
validatorType:"resultMatch",
xp:10
},

{
id:3,
difficulty:"Beginner",
topic:"ORDER BY",
title:"Sort Products",
prompt:"List all products ordered by price descending.",
hint:"Use ORDER BY price DESC",
starterMode:"empty",
starterCode:"-- Write SQL here",
validatorType:"resultMatch",
xp:10
},

{
id:4,
difficulty:"Beginner",
topic:"LIKE",
title:"Search Customers",
prompt:"Find customers whose name starts with 'M'.",
hint:"Use LIKE 'M%'",
starterMode:"empty",
starterCode:"-- Write SQL here",
validatorType:"resultMatch",
xp:15
},

{
id:5,
difficulty:"Beginner",
topic:"AGGREGATE",
title:"Count Employees",
prompt:"Count total employees.",
hint:"Use COUNT(*)",
starterMode:"empty",
starterCode:"-- Write SQL here",
validatorType:"resultMatch",
xp:15
},

/* =========================
   INTERMEDIATE
========================= */

{
id:6,
difficulty:"Intermediate",
topic:"JOIN",
title:"Employee Departments",
prompt:"Show employee names with their department names.",
hint:"JOIN Employees and Departments",
starterMode:"empty",
starterCode:"-- Write SQL here",
validatorType:"resultMatch",
xp:25
},

{
id:7,
difficulty:"Intermediate",
topic:"JOIN",
title:"Orders with Customers",
prompt:"List orders with customer names.",
hint:"JOIN Orders and Customers",
starterMode:"empty",
starterCode:"-- Write SQL here",
validatorType:"resultMatch",
xp:25
},

{
id:8,
difficulty:"Intermediate",
topic:"GROUP BY",
title:"Employees per Department",
prompt:"Count employees in each department.",
hint:"GROUP BY department_id",
starterMode:"empty",
starterCode:"-- Write SQL here",
validatorType:"resultMatch",
xp:30
},

{
id:9,
difficulty:"Intermediate",
topic:"HAVING",
title:"Large Departments",
prompt:"Find departments with more than 1 employee.",
hint:"Use HAVING COUNT(*) > 1",
starterMode:"empty",
starterCode:"-- Write SQL here",
validatorType:"resultMatch",
xp:35
},

{
id:10,
difficulty:"Intermediate",
topic:"SUBQUERY",
title:"Above Average Salary",
prompt:"Find employees earning above average salary.",
hint:"Use subquery with AVG()",
starterMode:"empty",
starterCode:"-- Write SQL here",
validatorType:"resultMatch",
xp:40
},

{
id:11,
difficulty:"Intermediate",
topic:"CASE",
title:"Salary Classification",
prompt:"Classify employees as 'High' if salary > 60000 else 'Low'.",
hint:"Use CASE WHEN",
starterMode:"empty",
starterCode:"-- Write SQL here",
validatorType:"resultMatch",
xp:40
},

/* =========================
   ADVANCED
========================= */

{
id:12,
difficulty:"Advanced",
topic:"JOIN",
title:"Product Categories",
prompt:"Show products with their category names.",
hint:"JOIN Products and Categories",
starterMode:"empty",
starterCode:"-- Write SQL here",
validatorType:"resultMatch",
xp:50
},

{
id:13,
difficulty:"Advanced",
topic:"JOIN",
title:"Inventory Overview",
prompt:"Show product stock with supplier names.",
hint:"JOIN Inventory, Products, Suppliers",
starterMode:"empty",
starterCode:"-- Write SQL here",
validatorType:"resultMatch",
xp:60
},

{
id:14,
difficulty:"Advanced",
topic:"AGGREGATION",
title:"Revenue per Customer",
prompt:"Calculate total payments per customer.",
hint:"SUM(amount) + GROUP BY",
starterMode:"empty",
starterCode:"-- Write SQL here",
validatorType:"resultMatch",
xp:60
},

{
id:15,
difficulty:"Advanced",
topic:"MULTI-JOIN",
title:"Full Order View",
prompt:"Show order id, customer name, product name, quantity.",
hint:"JOIN Orders + Customers + Products",
starterMode:"empty",
starterCode:"-- Write SQL here",
validatorType:"resultMatch",
xp:70
},

{
id:16,
difficulty:"Advanced",
topic:"SUBQUERY",
title:"Top Spender",
prompt:"Find customer(s) with highest total payments.",
hint:"Use subquery with MAX(SUM()) pattern",
starterMode:"empty",
starterCode:"-- Write SQL here",
validatorType:"resultMatch",
xp:80
}

];