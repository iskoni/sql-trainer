/* ==========================
   BEGINNER EXERCISES
   ========================== */

(function(){
var exercises = [

/* ----- SELECT ----- */

{
id:1,
difficulty:"Beginner",
topic:"SELECT",
title:"All Employees",
prompt:"Return ALL columns from the Employees table.",
hint:"Use SELECT * FROM table_name to retrieve every column. The asterisk (*) is a wildcard meaning 'all columns'.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees;",
xp:10
},

{
id:2,
difficulty:"Beginner",
topic:"SELECT",
title:"Employee Names",
prompt:"Show only the name column from Employees.",
hint:"Instead of *, list the specific column name after SELECT. Syntax: SELECT column_name FROM table;",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name FROM Employees;",
xp:10
},

{
id:3,
difficulty:"Beginner",
topic:"SELECT",
title:"Name and Salary",
prompt:"Show the name and salary columns from Employees.",
hint:"Separate multiple column names with commas: SELECT col1, col2 FROM table;",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, salary FROM Employees;",
xp:10
},

{
id:4,
difficulty:"Beginner",
topic:"SELECT",
title:"All Products",
prompt:"Return all columns from the Products table.",
hint:"Use SELECT * FROM Products; — the asterisk retrieves every column in the table.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Products;",
xp:10
},

{
id:5,
difficulty:"Beginner",
topic:"SELECT",
title:"Unique Cities",
prompt:"Show all unique cities from the Customers table (no duplicates).",
hint:"SELECT DISTINCT column_name removes duplicate values from the result. Apply it to the city column.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT DISTINCT city FROM Customers;",
xp:15
},

{
id:6,
difficulty:"Beginner",
topic:"SELECT",
title:"Column Alias",
prompt:"Show employee names with the column header displayed as 'employee_name'.",
hint:"Use AS to rename a column in output: SELECT column AS alias_name FROM table;",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name AS employee_name FROM Employees;",
xp:10
},

{
id:7,
difficulty:"Beginner",
topic:"SELECT",
title:"Select Literal Value",
prompt:"Write a query that returns the text 'Hello SQL' as a column called greeting.",
hint:"You can SELECT literal values directly: SELECT 'some text' AS column_name; — no FROM clause needed.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT 'Hello SQL' AS greeting;",
xp:10
},

{
id:8,
difficulty:"Beginner",
topic:"SELECT",
title:"Computed Column",
prompt:"Show each product's name and its price multiplied by 2, labeled as 'double_price'.",
hint:"You can perform arithmetic in SELECT: SELECT name, price * 2 AS double_price FROM Products;",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, price * 2 AS double_price FROM Products;",
xp:15
},

/* ----- WHERE ----- */

{
id:9,
difficulty:"Beginner",
topic:"WHERE",
title:"High Salary",
prompt:"Find employees earning more than 60000.",
hint:"Use WHERE to filter rows: SELECT * FROM Employees WHERE salary > 60000; The > operator means 'greater than'.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees WHERE salary > 60000;",
xp:10
},

{
id:10,
difficulty:"Beginner",
topic:"WHERE",
title:"Exact Match",
prompt:"Find the employee named 'Alice'.",
hint:"Use = for exact match: WHERE name = 'Alice'. Text values must be in single quotes.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees WHERE name = 'Alice';",
xp:10
},

{
id:11,
difficulty:"Beginner",
topic:"WHERE",
title:"Not Equal",
prompt:"Show all departments except 'Sales'.",
hint:"Use != or <> for 'not equal': WHERE name != 'Sales' filters out rows that match.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Departments WHERE name != 'Sales';",
xp:10
},

{
id:12,
difficulty:"Beginner",
topic:"WHERE",
title:"Less Than",
prompt:"Find products priced under 100.",
hint:"Use < for 'less than': WHERE price < 100 returns only rows where price is below 100.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Products WHERE price < 100;",
xp:10
},

{
id:13,
difficulty:"Beginner",
topic:"WHERE",
title:"AND Condition",
prompt:"Find employees in department 1 who earn more than 70000.",
hint:"Combine conditions with AND — both must be true: WHERE department_id = 1 AND salary > 70000",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees WHERE department_id = 1 AND salary > 70000;",
xp:15
},

{
id:14,
difficulty:"Beginner",
topic:"WHERE",
title:"OR Condition",
prompt:"Find customers from Berlin or Paris.",
hint:"Use OR when either condition can be true: WHERE city = 'Berlin' OR city = 'Paris'",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Customers WHERE city = 'Berlin' OR city = 'Paris';",
xp:15
},

{
id:15,
difficulty:"Beginner",
topic:"WHERE",
title:"NOT Condition",
prompt:"Find all employees NOT in department 2.",
hint:"NOT reverses a condition: WHERE NOT department_id = 2. Alternatively: WHERE department_id != 2",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees WHERE NOT department_id = 2;",
xp:15
},

{
id:16,
difficulty:"Beginner",
topic:"WHERE",
title:"Combined Conditions",
prompt:"Find products that cost at least 100 and are in stock (in_stock = 1).",
hint:"Combine with AND: WHERE price >= 100 AND in_stock = 1. The >= operator means 'greater than or equal to'.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Products WHERE price >= 100 AND in_stock = 1;",
xp:15
},

/* ----- NULL ----- */

{
id:17,
difficulty:"Beginner",
topic:"NULL",
title:"Find NULLs",
prompt:"Find employees who have no department assigned (department_id is NULL).",
hint:"NULL is special — you cannot use = NULL. Instead use IS NULL: WHERE department_id IS NULL",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees WHERE department_id IS NULL;",
xp:15
},

{
id:18,
difficulty:"Beginner",
topic:"NULL",
title:"Exclude NULLs",
prompt:"Show products that have a category assigned (category_id is NOT NULL).",
hint:"Use IS NOT NULL to filter out rows with missing values: WHERE category_id IS NOT NULL",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Products WHERE category_id IS NOT NULL;",
xp:15
},

{
id:19,
difficulty:"Beginner",
topic:"NULL",
title:"Customers With Age",
prompt:"Find customers whose age is known (not NULL).",
hint:"Use WHERE age IS NOT NULL to exclude rows where the age value is missing.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Customers WHERE age IS NOT NULL;",
xp:10
},

{
id:20,
difficulty:"Beginner",
topic:"NULL",
title:"COALESCE Basics",
prompt:"Show each employee's name and department_id, replacing NULL department_id with 0.",
hint:"COALESCE(value, default) returns the first non-NULL argument. Use COALESCE(department_id, 0) to substitute 0 for NULLs.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, COALESCE(department_id, 0) AS department_id FROM Employees;",
xp:20
},

{
id:21,
difficulty:"Beginner",
topic:"NULL",
title:"COALESCE With Text",
prompt:"Show customer names and their age, displaying 'Unknown' when age is NULL.",
hint:"COALESCE works with text too: COALESCE(age, 'Unknown'). It picks the first non-NULL value from the list.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, COALESCE(age, 'Unknown') AS age FROM Customers;",
xp:20
},

/* ----- LIMIT ----- */

{
id:22,
difficulty:"Beginner",
topic:"LIMIT",
title:"First 5 Employees",
prompt:"Show only the first 5 employees.",
hint:"Add LIMIT n at the end of your query to restrict the number of returned rows: SELECT * FROM table LIMIT 5;",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees LIMIT 5;",
xp:10
},

{
id:23,
difficulty:"Beginner",
topic:"LIMIT",
title:"Top 3 Products by Price",
prompt:"Show the 3 most expensive products.",
hint:"First ORDER BY price DESC to sort highest first, then LIMIT 3 to get the top three.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Products ORDER BY price DESC LIMIT 3;",
xp:15
},

{
id:24,
difficulty:"Beginner",
topic:"LIMIT",
title:"Skip and Take",
prompt:"Show employees 4 through 6 (skip the first 3, then take 3).",
hint:"LIMIT count OFFSET skip — LIMIT 3 OFFSET 3 skips the first 3 rows and returns the next 3.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees LIMIT 3 OFFSET 3;",
xp:15
},

{
id:25,
difficulty:"Beginner",
topic:"LIMIT",
title:"Single Row",
prompt:"Show just one customer from the Customers table.",
hint:"LIMIT 1 restricts the output to a single row. Useful for peeking at table structure.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Customers LIMIT 1;",
xp:10
},

/* ----- DISTINCT ----- */

{
id:26,
difficulty:"Beginner",
topic:"DISTINCT",
title:"Unique Countries",
prompt:"List all unique countries from the Customers table.",
hint:"SELECT DISTINCT country FROM Customers; removes duplicate country values from the result.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT DISTINCT country FROM Customers;",
xp:10
},

{
id:27,
difficulty:"Beginner",
topic:"DISTINCT",
title:"Unique Departments",
prompt:"List all unique department_id values from Employees (include NULLs).",
hint:"DISTINCT includes NULL as a unique value. SELECT DISTINCT department_id FROM Employees; will show all unique values including NULL.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT DISTINCT department_id FROM Employees;",
xp:10
},

{
id:28,
difficulty:"Beginner",
topic:"DISTINCT",
title:"Unique City-Country Pairs",
prompt:"Show all unique combinations of city and country from Customers.",
hint:"DISTINCT can apply to multiple columns: SELECT DISTINCT city, country FROM table; treats each combination as unique.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT DISTINCT city, country FROM Customers;",
xp:15
},

/* ----- ARITHMETIC ----- */

{
id:29,
difficulty:"Beginner",
topic:"ARITHMETIC",
title:"Price After Tax",
prompt:"Show each product's name and price with 20% tax added, labeled 'price_with_tax'.",
hint:"Multiply by 1.2 to add 20%: SELECT name, price * 1.2 AS price_with_tax FROM Products;",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, price * 1.2 AS price_with_tax FROM Products;",
xp:15
},

{
id:30,
difficulty:"Beginner",
topic:"ARITHMETIC",
title:"Salary Difference",
prompt:"Show old_salary, new_salary, and the difference (new minus old) as 'raise' from EmployeeHistory.",
hint:"Subtract columns: new_salary - old_salary. Use AS to name the result column 'raise'.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT old_salary, new_salary, new_salary - old_salary AS raise FROM EmployeeHistory;",
xp:15
},

{
id:31,
difficulty:"Beginner",
topic:"ARITHMETIC",
title:"Half Price Sale",
prompt:"Show product names and their price divided by 2 as 'sale_price'.",
hint:"Use the division operator /: SELECT name, price / 2 AS sale_price FROM Products;",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, price / 2 AS sale_price FROM Products;",
xp:10
},

{
id:32,
difficulty:"Beginner",
topic:"ARITHMETIC",
title:"Order Total",
prompt:"Show order id and the total value (quantity * product price) for each order. Join Orders with Products.",
hint:"Join the tables and multiply: SELECT Orders.id, Orders.quantity * Products.price AS total FROM Orders JOIN Products ON Orders.product_id = Products.id;",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT Orders.id, Orders.quantity * Products.price AS total FROM Orders JOIN Products ON Orders.product_id = Products.id;",
xp:20
},

/* ----- STRING FUNCTIONS ----- */

{
id:33,
difficulty:"Beginner",
topic:"STRING FUNCTIONS",
title:"Uppercase Names",
prompt:"Show all customer names in uppercase.",
hint:"UPPER(text) converts text to uppercase: SELECT UPPER(name) FROM Customers;",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT UPPER(name) FROM Customers;",
xp:10
},

{
id:34,
difficulty:"Beginner",
topic:"STRING FUNCTIONS",
title:"Lowercase Cities",
prompt:"Show all customer cities in lowercase.",
hint:"LOWER(text) converts to lowercase: SELECT LOWER(city) FROM Customers;",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT LOWER(city) FROM Customers;",
xp:10
},

{
id:35,
difficulty:"Beginner",
topic:"STRING FUNCTIONS",
title:"Name Length",
prompt:"Show each employee's name and the length of their name as 'name_length'.",
hint:"LENGTH(text) returns the number of characters: SELECT name, LENGTH(name) AS name_length FROM Employees;",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, LENGTH(name) AS name_length FROM Employees;",
xp:10
},

{
id:36,
difficulty:"Beginner",
topic:"STRING FUNCTIONS",
title:"First Three Letters",
prompt:"Show the first 3 characters of each department name as 'short_name'.",
hint:"SUBSTR(text, start, length) extracts a substring. Start position is 1-based: SUBSTR(name, 1, 3)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT SUBSTR(name, 1, 3) AS short_name FROM Departments;",
xp:15
},

{
id:37,
difficulty:"Beginner",
topic:"STRING FUNCTIONS",
title:"Replace Text",
prompt:"Show customer emails with '@mail.com' replaced by '@email.org'.",
hint:"REPLACE(text, old, new) substitutes occurrences: REPLACE(email, '@mail.com', '@email.org')",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT REPLACE(email, '@mail.com', '@email.org') FROM Customers;",
xp:15
},

{
id:38,
difficulty:"Beginner",
topic:"STRING FUNCTIONS",
title:"Concatenation",
prompt:"Show each employee's name and email combined as 'Name <email>' using the format: name || ' <' || email || '>'.",
hint:"The || operator concatenates strings in SQLite: 'Hello' || ' ' || 'World' produces 'Hello World'.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name || ' <' || email || '>' AS contact FROM Employees;",
xp:15
},

/* ----- TYPE CASTING ----- */

{
id:39,
difficulty:"Beginner",
topic:"TYPE CASTING",
title:"Check Types",
prompt:"Show each product's name and the type of its price column using TYPEOF().",
hint:"TYPEOF(value) returns the storage type as a string ('integer', 'text', 'real', 'null', 'blob').",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, TYPEOF(price) FROM Products;",
xp:15
},

{
id:40,
difficulty:"Beginner",
topic:"TYPE CASTING",
title:"Cast to Text",
prompt:"Show each employee's salary converted to text using CAST, as 'salary_text'.",
hint:"CAST(value AS type) converts between types: CAST(salary AS TEXT) turns the number into a text string.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, CAST(salary AS TEXT) AS salary_text FROM Employees;",
xp:15
},

{
id:41,
difficulty:"Beginner",
topic:"TYPE CASTING",
title:"Cast to Real",
prompt:"Show each product's name and price cast as REAL (floating point) as 'price_real'.",
hint:"CAST(price AS REAL) converts an integer to a floating-point number, enabling decimal division results.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, CAST(price AS REAL) AS price_real FROM Products;",
xp:15
},

/* ----- INSERT ----- */

{
id:42,
difficulty:"Beginner",
topic:"INSERT",
title:"Add a Department",
prompt:"Insert a new department with id 6 and name 'Legal' into the Departments table.",
hint:"Use INSERT INTO table VALUES(val1, val2) to add a row. Syntax: INSERT INTO Departments VALUES(6, 'Legal');",
starterCode:"-- Write your SQL here",
expectedQuery:"INSERT INTO Departments VALUES(6, 'Legal');",
validationType:"dml",
verificationQuery:"SELECT * FROM Departments ORDER BY id;",
xp:15
},

{
id:43,
difficulty:"Beginner",
topic:"INSERT",
title:"Add a Customer",
prompt:"Insert a new customer: id=9, name='Nina', city='Vienna', country='Austria', email='nina@mail.com', age=27.",
hint:"List all values in the same order as the columns: INSERT INTO Customers VALUES(9, 'Nina', 'Vienna', 'Austria', 'nina@mail.com', 27);",
starterCode:"-- Write your SQL here",
expectedQuery:"INSERT INTO Customers VALUES(9, 'Nina', 'Vienna', 'Austria', 'nina@mail.com', 27);",
validationType:"dml",
verificationQuery:"SELECT * FROM Customers ORDER BY id;",
xp:15
},

{
id:44,
difficulty:"Beginner",
topic:"INSERT",
title:"Add Multiple Products",
prompt:"Insert two new products: (11, 'Tablet', 500, 1, 1) and (12, 'Charger', 30, 5, 1).",
hint:"Insert multiple rows in one statement by separating value groups with commas: INSERT INTO table VALUES(...), (...);",
starterCode:"-- Write your SQL here",
expectedQuery:"INSERT INTO Products VALUES(11, 'Tablet', 500, 1, 1), (12, 'Charger', 30, 5, 1);",
validationType:"dml",
verificationQuery:"SELECT * FROM Products ORDER BY id;",
xp:15
},

{
id:45,
difficulty:"Beginner",
topic:"INSERT",
title:"Insert With Named Columns",
prompt:"Insert a supplier with id=5 and name='QuickShip'. Set country to 'Canada' and rating to 3. Use explicit column names.",
hint:"Specify columns: INSERT INTO Suppliers(id, name, country, rating) VALUES(5, 'QuickShip', 'Canada', 3);",
starterCode:"-- Write your SQL here",
expectedQuery:"INSERT INTO Suppliers(id, name, country, rating) VALUES(5, 'QuickShip', 'Canada', 3);",
validationType:"dml",
verificationQuery:"SELECT * FROM Suppliers ORDER BY id;",
xp:15
},

{
id:46,
difficulty:"Beginner",
topic:"INSERT",
title:"Insert With NULL",
prompt:"Insert a product with id=11, name='Cable', price=15, no category (NULL), and in_stock=1.",
hint:"Use NULL (without quotes) for missing values: INSERT INTO Products VALUES(11, 'Cable', 15, NULL, 1);",
starterCode:"-- Write your SQL here",
expectedQuery:"INSERT INTO Products VALUES(11, 'Cable', 15, NULL, 1);",
validationType:"dml",
verificationQuery:"SELECT * FROM Products ORDER BY id;",
xp:15
},

/* ----- DELETE ----- */

{
id:47,
difficulty:"Beginner",
topic:"DELETE",
title:"Delete One Row",
prompt:"Delete the customer with id 8 from the Customers table.",
hint:"DELETE FROM table WHERE condition; removes matching rows. Use WHERE id = 8 to target one specific row.",
starterCode:"-- Write your SQL here",
expectedQuery:"DELETE FROM Customers WHERE id = 8;",
validationType:"dml",
verificationQuery:"SELECT * FROM Customers ORDER BY id;",
xp:15
},

{
id:48,
difficulty:"Beginner",
topic:"DELETE",
title:"Delete by Condition",
prompt:"Delete all products that are not in stock (in_stock = 0).",
hint:"DELETE FROM Products WHERE in_stock = 0; removes all rows matching the condition. Always use WHERE to avoid deleting everything!",
starterCode:"-- Write your SQL here",
expectedQuery:"DELETE FROM Products WHERE in_stock = 0;",
validationType:"dml",
verificationQuery:"SELECT * FROM Products ORDER BY id;",
xp:15
},

{
id:49,
difficulty:"Beginner",
topic:"DELETE",
title:"Delete All Rows",
prompt:"Delete ALL rows from the EmployeeHistory table.",
hint:"DELETE FROM table_name; without a WHERE clause removes every row. The table still exists but is empty.",
starterCode:"-- Write your SQL here",
expectedQuery:"DELETE FROM EmployeeHistory;",
validationType:"dml",
verificationQuery:"SELECT COUNT(*) AS cnt FROM EmployeeHistory;",
xp:10
},

{
id:50,
difficulty:"Beginner",
topic:"DELETE",
title:"Delete Low-Rated Suppliers",
prompt:"Delete suppliers with a rating below 4.",
hint:"Use WHERE rating < 4 to target low-rated suppliers. DELETE FROM Suppliers WHERE rating < 4;",
starterCode:"-- Write your SQL here",
expectedQuery:"DELETE FROM Suppliers WHERE rating < 4;",
validationType:"dml",
verificationQuery:"SELECT * FROM Suppliers ORDER BY id;",
xp:15
}

];
window.Exercises = (window.Exercises || []).concat(exercises);
})();
