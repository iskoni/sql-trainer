/* ==========================
SQL CURRICULUM
========================== */

window.Exercises = [

/* ==========================
BEGINNER
========================== */

{
id:1,

difficulty:"Beginner",

topic:"SELECT",

title:"All Employees",

prompt:
"Return ALL columns from Employees.",

hint:
"Use SELECT *",

starterCode:
"-- Write your SQL here",

expectedQuery:
"SELECT * FROM Employees;",

xp:10
},

{
id:2,

difficulty:"Beginner",

topic:"WHERE",

title:"High Salary Employees",

prompt:
"Find employees earning more than 60000.",

hint:
"Use WHERE salary > 60000",

starterCode:
"-- Write your SQL here",

expectedQuery:
"SELECT * FROM Employees WHERE salary > 60000;",

xp:10
},

{
id:3,

difficulty:"Beginner",

topic:"ORDER BY",

title:"Sort Products",

prompt:
"Show all products ordered by price descending.",

hint:
"Use ORDER BY price DESC",

starterCode:
"-- Write your SQL here",

expectedQuery:
"SELECT * FROM Products ORDER BY price DESC;",

xp:15
},

{
id:4,

difficulty:"Beginner",

topic:"LIKE",

title:"Customer Search",

prompt:
"Find customers whose name starts with 'M'.",

hint:
"Use LIKE 'M%'",

starterCode:
"-- Write your SQL here",

expectedQuery:
"SELECT * FROM Customers WHERE name LIKE 'M%';",

xp:15
},

{
id:5,

difficulty:"Beginner",

topic:"AGGREGATION",

title:"Employee Count",

prompt:
"Count all employees.",

hint:
"Use COUNT(*)",

starterCode:
"-- Write your SQL here",

expectedQuery:
"SELECT COUNT(*) FROM Employees;",

xp:20
},

/* ==========================
INTERMEDIATE
========================== */

{
id:6,

difficulty:"Intermediate",

topic:"JOIN",

title:"Employee Departments",

prompt:
"Show employee names with department names.",

hint:
"JOIN Employees and Departments.",

starterCode:
"-- Write your SQL here",

expectedQuery:
`SELECT Employees.name,
Departments.name
FROM Employees
JOIN Departments
ON Employees.department_id =
Departments.id;`,

xp:25
},

{
id:7,

difficulty:"Intermediate",

topic:"GROUP BY",

title:"Employees Per Department",

prompt:
"Count employees in each department.",

hint:
"Use GROUP BY department_id.",

starterCode:
"-- Write your SQL here",

expectedQuery:
`SELECT department_id,
COUNT(*)
FROM Employees
GROUP BY department_id;`,

xp:30
},

{
id:8,

difficulty:"Intermediate",

topic:"HAVING",

title:"Large Departments",

prompt:
"Find departments having more than 1 employee.",

hint:
"Use HAVING COUNT(*) > 1",

starterCode:
"-- Write your SQL here",

expectedQuery:
`SELECT department_id,
COUNT(*)
FROM Employees
GROUP BY department_id
HAVING COUNT(*) > 1;`,

xp:35
},

{
id:9,

difficulty:"Intermediate",

topic:"CASE",

title:"Salary Classification",

prompt:
"Classify employees as High if salary > 60000 else Low.",

hint:
"Use CASE WHEN.",

starterCode:
"-- Write your SQL here",

expectedQuery:
`SELECT name,

CASE

WHEN salary > 60000
THEN 'High'

ELSE 'Low'

END

FROM Employees;`,

xp:35
},

{
id:10,

difficulty:"Intermediate",

topic:"SUBQUERY",

title:"Above Average Salary",

prompt:
"Find employees earning above average salary.",

hint:
"Use AVG() inside a subquery.",

starterCode:
"-- Write your SQL here",

expectedQuery:
`SELECT *

FROM Employees

WHERE salary >

(
SELECT AVG(salary)
FROM Employees
);`,

xp:40
},

/* ==========================
ADVANCED
========================== */

{
id:11,

difficulty:"Advanced",

topic:"JOIN",

title:"Orders + Customers",

prompt:
"Show order id with customer names.",

hint:
"JOIN Orders and Customers.",

starterCode:
"-- Write your SQL here",

expectedQuery:
`SELECT Orders.id,
Customers.name

FROM Orders

JOIN Customers

ON Orders.customer_id =
Customers.id;`,

xp:45
},

{
id:12,

difficulty:"Advanced",

topic:"JOIN",

title:"Product Categories",

prompt:
"Show product names with category names.",

hint:
"JOIN Products and Categories.",

starterCode:
"-- Write your SQL here",

expectedQuery:
`SELECT Products.name,
Categories.name

FROM Products

JOIN Categories

ON Products.category_id =
Categories.id;`,

xp:50
},

{
id:13,

difficulty:"Advanced",

topic:"AGGREGATION",

title:"Total Payments",

prompt:
"Calculate total payments per customer.",

hint:
"SUM(amount) + GROUP BY customer_id",

starterCode:
"-- Write your SQL here",

expectedQuery:
`SELECT customer_id,
SUM(amount)

FROM Payments

GROUP BY customer_id;`,

xp:60
},

{
id:14,

difficulty:"Advanced",

topic:"SUBQUERY",

title:"Top Payment",

prompt:
"Find customer(s) with the maximum payment amount.",

hint:
"Use MAX(amount) in a subquery.",

starterCode:
"-- Write your SQL here",

expectedQuery:
`SELECT *

FROM Payments

WHERE amount =

(
SELECT MAX(amount)
FROM Payments
);`,

xp:70
},

{
id:15,

difficulty:"Advanced",

topic:"JOIN",

title:"Inventory Overview",

prompt:
"Show product stock with supplier names.",

hint:
"JOIN Inventory, Products and Suppliers.",

starterCode:
"-- Write your SQL here",

expectedQuery:
`SELECT Products.name,
Suppliers.name,
Inventory.stock

FROM Inventory

JOIN Products
ON Inventory.product_id =
Products.id

JOIN Suppliers
ON Inventory.supplier_id =
Suppliers.id;`,

xp:80
}

];