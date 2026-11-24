/* ==========================
   ELEMENTARY EXERCISES
   ========================== */

(function(){
var exercises = [

/* ----- ORDER BY ----- */

{
id:51,
difficulty:"Elementary",
topic:"ORDER BY",
title:"Sort by Name",
prompt:"Show all employees sorted by name alphabetically (A-Z).",
hint:"ORDER BY column_name sorts ascending by default (A-Z for text). Place it after the FROM/WHERE clause.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees ORDER BY name;",
xp:15
},

{
id:52,
difficulty:"Elementary",
topic:"ORDER BY",
title:"Sort Descending",
prompt:"Show all products ordered by price from highest to lowest.",
hint:"Add DESC after the column name to sort in descending order: ORDER BY price DESC",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Products ORDER BY price DESC;",
xp:15
},

{
id:53,
difficulty:"Elementary",
topic:"ORDER BY",
title:"Multi-Column Sort",
prompt:"Show all customers sorted by country ascending, then by name ascending.",
hint:"Separate multiple sort columns with commas: ORDER BY country, name. The first column is the primary sort.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Customers ORDER BY country, name;",
xp:20
},

{
id:54,
difficulty:"Elementary",
topic:"ORDER BY",
title:"Sort by Expression",
prompt:"Show employee names and salaries, sorted by salary divided by 1000 descending.",
hint:"You can ORDER BY an expression: ORDER BY salary / 1000 DESC. The expression is computed per row for sorting.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, salary FROM Employees ORDER BY salary / 1000 DESC;",
xp:20
},

{
id:55,
difficulty:"Elementary",
topic:"ORDER BY",
title:"Sort by Column Number",
prompt:"Show product name and price, sorted by the second column (price) ascending.",
hint:"You can reference columns by position: ORDER BY 2 means sort by the second column in the SELECT list.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, price FROM Products ORDER BY 2;",
xp:15
},

{
id:56,
difficulty:"Elementary",
topic:"ORDER BY",
title:"Top 5 Salaries",
prompt:"Show the 5 highest-paid employees (name and salary only).",
hint:"Combine ORDER BY salary DESC with LIMIT 5 to get the top earners.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, salary FROM Employees ORDER BY salary DESC LIMIT 5;",
xp:20
},

/* ----- LIKE ----- */

{
id:57,
difficulty:"Elementary",
topic:"LIKE",
title:"Starts With M",
prompt:"Find customers whose name starts with 'M'.",
hint:"LIKE 'M%' matches any string starting with M. The % wildcard represents zero or more characters.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Customers WHERE name LIKE 'M%';",
xp:15
},

{
id:58,
difficulty:"Elementary",
topic:"LIKE",
title:"Ends With a",
prompt:"Find employees whose name ends with the letter 'a'.",
hint:"Use '%a' to match names ending with 'a'. The % before 'a' matches any characters preceding it.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees WHERE name LIKE '%a';",
xp:15
},

{
id:59,
difficulty:"Elementary",
topic:"LIKE",
title:"Contains 'an'",
prompt:"Find employees whose name contains 'an' anywhere.",
hint:"Use '%an%' — the % on both sides means 'an' can appear anywhere in the string.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees WHERE name LIKE '%an%';",
xp:15
},

{
id:60,
difficulty:"Elementary",
topic:"LIKE",
title:"Single Character Wildcard",
prompt:"Find products whose name has exactly 5 characters.",
hint:"The underscore _ matches exactly one character. Five underscores _____ matches any 5-character string: WHERE name LIKE '_____'",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Products WHERE name LIKE '_____';",
xp:20
},

{
id:61,
difficulty:"Elementary",
topic:"LIKE",
title:"NOT LIKE",
prompt:"Find all customers whose city does NOT start with 'B'.",
hint:"NOT LIKE reverses the pattern match: WHERE city NOT LIKE 'B%' excludes cities starting with B.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Customers WHERE city NOT LIKE 'B%';",
xp:15
},

{
id:62,
difficulty:"Elementary",
topic:"LIKE",
title:"Email Domain Search",
prompt:"Find customers whose email ends with '@mail.com'.",
hint:"Use LIKE '%@mail.com' to find emails ending with that domain. The % matches everything before the @.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Customers WHERE email LIKE '%@mail.com';",
xp:15
},

/* ----- IN ----- */

{
id:63,
difficulty:"Elementary",
topic:"IN",
title:"Cities List",
prompt:"Find customers from Berlin, Paris, or Tokyo.",
hint:"IN (val1, val2, val3) checks if a value matches any in the list. Shorter than multiple OR conditions.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Customers WHERE city IN ('Berlin', 'Paris', 'Tokyo');",
xp:15
},

{
id:64,
difficulty:"Elementary",
topic:"IN",
title:"Department Filter",
prompt:"Find employees in departments 1, 3, or 5.",
hint:"WHERE department_id IN (1, 3, 5) is equivalent to department_id = 1 OR department_id = 3 OR department_id = 5",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees WHERE department_id IN (1, 3, 5);",
xp:15
},

{
id:65,
difficulty:"Elementary",
topic:"IN",
title:"NOT IN",
prompt:"Find products NOT in categories 1 or 2.",
hint:"NOT IN excludes matching values: WHERE category_id NOT IN (1, 2). Note: NULLs are not matched by NOT IN.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Products WHERE category_id NOT IN (1, 2);",
xp:20
},

{
id:66,
difficulty:"Elementary",
topic:"IN",
title:"Payment Methods",
prompt:"Show payments made via 'PayPal' or 'Debit Card'.",
hint:"Use IN to match multiple text values: WHERE method IN ('PayPal', 'Debit Card')",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Payments WHERE method IN ('PayPal', 'Debit Card');",
xp:15
},

{
id:67,
difficulty:"Elementary",
topic:"IN",
title:"Supplier Countries",
prompt:"Show suppliers from 'USA' or 'France'.",
hint:"WHERE country IN ('USA', 'France') matches suppliers from either country.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Suppliers WHERE country IN ('USA', 'France');",
xp:15
},

/* ----- BETWEEN ----- */

{
id:68,
difficulty:"Elementary",
topic:"BETWEEN",
title:"Price Range",
prompt:"Find products priced between 50 and 200 (inclusive).",
hint:"BETWEEN includes both boundaries: WHERE price BETWEEN 50 AND 200 means price >= 50 AND price <= 200.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Products WHERE price BETWEEN 50 AND 200;",
xp:15
},

{
id:69,
difficulty:"Elementary",
topic:"BETWEEN",
title:"Salary Range",
prompt:"Find employees with salaries between 50000 and 80000.",
hint:"BETWEEN works with any comparable values: WHERE salary BETWEEN 50000 AND 80000",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees WHERE salary BETWEEN 50000 AND 80000;",
xp:15
},

{
id:70,
difficulty:"Elementary",
topic:"BETWEEN",
title:"Date Range",
prompt:"Find orders placed between '2024-02-01' and '2024-03-31'.",
hint:"BETWEEN works with date strings too: WHERE order_date BETWEEN '2024-02-01' AND '2024-03-31'. Dates are compared lexicographically in SQLite.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Orders WHERE order_date BETWEEN '2024-02-01' AND '2024-03-31';",
xp:20
},

{
id:71,
difficulty:"Elementary",
topic:"BETWEEN",
title:"NOT BETWEEN",
prompt:"Find products NOT priced between 100 and 500.",
hint:"NOT BETWEEN excludes the range: WHERE price NOT BETWEEN 100 AND 500 returns items outside that range.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Products WHERE price NOT BETWEEN 100 AND 500;",
xp:20
},

/* ----- ALIASES ----- */

{
id:72,
difficulty:"Elementary",
topic:"ALIASES",
title:"Column Alias",
prompt:"Show employee names as 'full_name' and salary as 'annual_pay'.",
hint:"Use AS after each selected column to give it a readable header: SELECT col1 AS alias1, col2 AS alias2 FROM table;",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name AS full_name, salary AS annual_pay FROM Employees;",
strictColumns:true,
xp:15
},

{
id:73,
difficulty:"Elementary",
topic:"ALIASES",
title:"Table Alias",
prompt:"Show employee names and department_ids using 'e' as a table alias for Employees.",
hint:"Table aliases shorten queries: SELECT e.name, e.department_id FROM Employees e; or FROM Employees AS e",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT e.name, e.department_id FROM Employees AS e;",
xp:15
},

{
id:74,
difficulty:"Elementary",
topic:"ALIASES",
title:"Expression Alias",
prompt:"Show each product's name and price * 0.9 as 'discounted_price'.",
hint:"You can alias any arithmetic expression in SELECT using AS: SELECT col, expr AS alias_name FROM table;",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, price * 0.9 AS discounted_price FROM Products;",
strictColumns:true,
xp:15
},

{
id:75,
difficulty:"Elementary",
topic:"ALIASES",
title:"Multiple Table Aliases",
prompt:"Show order id and customer name using aliases 'o' for Orders and 'c' for Customers.",
hint:"When joining tables, aliases make queries readable: FROM Orders AS o JOIN Customers AS c ON o.customer_id = c.id",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT o.id, c.name FROM Orders AS o JOIN Customers AS c ON o.customer_id = c.id;",
xp:20
},

/* ----- AGGREGATION ----- */

{
id:76,
difficulty:"Elementary",
topic:"AGGREGATION",
title:"Count All Employees",
prompt:"Count the total number of employees.",
hint:"Use the COUNT(*) aggregate function in SELECT to count every row in a table (including rows with NULL values).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT COUNT(*) FROM Employees;",
xp:15
},

{
id:77,
difficulty:"Elementary",
topic:"AGGREGATION",
title:"Count Non-NULL",
prompt:"Count how many employees have a department_id assigned (not NULL).",
hint:"COUNT(column) only counts non-NULL values: COUNT(department_id) skips rows where department_id is NULL.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT COUNT(department_id) FROM Employees;",
xp:20
},

{
id:78,
difficulty:"Elementary",
topic:"AGGREGATION",
title:"Total Salary",
prompt:"Calculate the total salary bill (sum of all salaries) from Employees.",
hint:"Apply the SUM(column) aggregate function to add up all numeric values in the salary column.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT SUM(salary) FROM Employees;",
xp:15
},

{
id:79,
difficulty:"Elementary",
topic:"AGGREGATION",
title:"Average Price",
prompt:"Calculate the average price of all products.",
hint:"Apply the AVG(column) aggregate function to compute the arithmetic mean of the price column.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT AVG(price) FROM Products;",
xp:15
},

{
id:80,
difficulty:"Elementary",
topic:"AGGREGATION",
title:"Min and Max Salary",
prompt:"Show the minimum and maximum salary from Employees.",
hint:"You can use multiple aggregate functions in one SELECT list separated by commas: MIN(column), MAX(column).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT MIN(salary), MAX(salary) FROM Employees;",
xp:15
},

{
id:81,
difficulty:"Elementary",
topic:"AGGREGATION",
title:"Count Distinct",
prompt:"Count the number of distinct cities in the Customers table.",
hint:"Place DISTINCT inside COUNT(...) — COUNT(DISTINCT column) counts unique non-NULL values.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT COUNT(DISTINCT city) FROM Customers;",
xp:20
},

{
id:82,
difficulty:"Elementary",
topic:"AGGREGATION",
title:"Max Product Price",
prompt:"Find the most expensive product's price, labeled as 'highest_price'.",
hint:"Combine MAX(column) with an AS alias in SELECT to name the output column.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT MAX(price) AS highest_price FROM Products;",
strictColumns:true,
xp:15
},

{
id:83,
difficulty:"Elementary",
topic:"AGGREGATION",
title:"Total Order Quantity",
prompt:"Calculate the total quantity of all orders combined.",
hint:"Use SUM(column) on the quantity column of the Orders table.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT SUM(quantity) FROM Orders;",
xp:15
},

/* ----- BASIC JOINs ----- */

{
id:84,
difficulty:"Elementary",
topic:"JOIN",
title:"Employee Departments",
prompt:"Show employee names with their department names.",
hint:"JOIN connects two tables on a related column: FROM Employees JOIN Departments ON Employees.department_id = Departments.id",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT Employees.name, Departments.name FROM Employees JOIN Departments ON Employees.department_id = Departments.id;",
xp:25
},

{
id:85,
difficulty:"Elementary",
topic:"JOIN",
title:"Order Details",
prompt:"Show order id, customer name, and product name for each order.",
hint:"Join three tables: Orders → Customers (on customer_id) and Orders → Products (on product_id).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT Orders.id, Customers.name, Products.name FROM Orders JOIN Customers ON Orders.customer_id = Customers.id JOIN Products ON Orders.product_id = Products.id;",
xp:30
},

{
id:86,
difficulty:"Elementary",
topic:"JOIN",
title:"Product Categories",
prompt:"Show product names with their category names.",
hint:"JOIN Products and Categories on the category_id: FROM Products JOIN Categories ON Products.category_id = Categories.id",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT Products.name, Categories.name FROM Products JOIN Categories ON Products.category_id = Categories.id;",
xp:25
},

{
id:87,
difficulty:"Elementary",
topic:"JOIN",
title:"JOIN with Alias",
prompt:"Show employee name and department name using table aliases e and d.",
hint:"Use short aliases: FROM Employees AS e JOIN Departments AS d ON e.department_id = d.id",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT e.name, d.name FROM Employees AS e JOIN Departments AS d ON e.department_id = d.id;",
xp:25
},

{
id:88,
difficulty:"Elementary",
topic:"JOIN",
title:"JOIN with WHERE",
prompt:"Show names of employees in the 'Engineering' department.",
hint:"After JOIN, add WHERE to filter: JOIN Departments ON ... WHERE Departments.name = 'Engineering'",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT Employees.name FROM Employees JOIN Departments ON Employees.department_id = Departments.id WHERE Departments.name = 'Engineering';",
xp:25
},

{
id:89,
difficulty:"Elementary",
topic:"JOIN",
title:"Inventory with Products",
prompt:"Show product names and their stock levels from Inventory.",
hint:"JOIN Inventory and Products on product_id: FROM Inventory JOIN Products ON Inventory.product_id = Products.id",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT Products.name, Inventory.stock FROM Inventory JOIN Products ON Inventory.product_id = Products.id;",
xp:25
},

{
id:90,
difficulty:"Elementary",
topic:"JOIN",
title:"Payments with Customers",
prompt:"Show customer name and payment amount for all payments.",
hint:"JOIN Payments with Customers on customer_id to connect payment records with customer names.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT Customers.name, Payments.amount FROM Payments JOIN Customers ON Payments.customer_id = Customers.id;",
xp:25
},

{
id:91,
difficulty:"Elementary",
topic:"JOIN",
title:"Assignments with Details",
prompt:"Show employee name, project name, and role from Assignments.",
hint:"Join Assignments to both Employees (on employee_id) and Projects (on project_id) to get the names.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT Employees.name, Projects.name, Assignments.role FROM Assignments JOIN Employees ON Assignments.employee_id = Employees.id JOIN Projects ON Assignments.project_id = Projects.id;",
xp:30
},

/* ----- UPDATE ----- */

{
id:92,
difficulty:"Elementary",
topic:"UPDATE",
title:"Update Single Column",
prompt:"Change Alice's salary to 80000.",
hint:"UPDATE table SET column = value WHERE condition; — always include WHERE to avoid updating all rows!",
starterCode:"-- Write your SQL here",
expectedQuery:"UPDATE Employees SET salary = 80000 WHERE name = 'Alice';",
validationType:"dml",
verificationQuery:"SELECT name, salary FROM Employees WHERE name = 'Alice';",
xp:20
},

{
id:93,
difficulty:"Elementary",
topic:"UPDATE",
title:"Update Multiple Columns",
prompt:"Update customer John: set city to 'Munich' and age to 36.",
hint:"Separate multiple column assignments with commas in SET: UPDATE table SET col1 = val1, col2 = val2 WHERE condition;",
starterCode:"-- Write your SQL here",
expectedQuery:"UPDATE Customers SET city = 'Munich', age = 36 WHERE name = 'John';",
validationType:"dml",
verificationQuery:"SELECT name, city, age FROM Customers WHERE name = 'John';",
xp:20
},

{
id:94,
difficulty:"Elementary",
topic:"UPDATE",
title:"Raise All Salaries",
prompt:"Give every employee a 10% raise (multiply salary by 1.1).",
hint:"Omit the WHERE clause to update every row, and use arithmetic on the right side of SET: SET col = col * 1.1;",
starterCode:"-- Write your SQL here",
expectedQuery:"UPDATE Employees SET salary = salary * 1.1;",
validationType:"dml",
verificationQuery:"SELECT name, salary FROM Employees ORDER BY id;",
xp:25
},

{
id:95,
difficulty:"Elementary",
topic:"UPDATE",
title:"Update With Condition",
prompt:"Set in_stock to 0 for all products priced above 500.",
hint:"Use UPDATE table SET col = 0 with a WHERE condition comparing price > 500.",
starterCode:"-- Write your SQL here",
expectedQuery:"UPDATE Products SET in_stock = 0 WHERE price > 500;",
validationType:"dml",
verificationQuery:"SELECT name, price, in_stock FROM Products ORDER BY id;",
xp:20
},

{
id:96,
difficulty:"Elementary",
topic:"UPDATE",
title:"Update With Arithmetic",
prompt:"Double the stock of all inventory items.",
hint:"Use SET stock = stock * 2 to multiply existing values. This updates each row based on its current value.",
starterCode:"-- Write your SQL here",
expectedQuery:"UPDATE Inventory SET stock = stock * 2;",
validationType:"dml",
verificationQuery:"SELECT * FROM Inventory ORDER BY product_id, supplier_id;",
xp:20
},

{
id:97,
difficulty:"Elementary",
topic:"UPDATE",
title:"Set NULL Value",
prompt:"Set George's department_id to 2 (he was previously unassigned).",
hint:"Use UPDATE ... SET column = new_value WHERE name = '...' to replace an existing NULL value.",
starterCode:"-- Write your SQL here",
expectedQuery:"UPDATE Employees SET department_id = 2 WHERE name = 'George';",
validationType:"dml",
verificationQuery:"SELECT name, department_id FROM Employees WHERE name = 'George';",
xp:20
},

/* ----- GROUP BY ----- */

{
id:98,
difficulty:"Elementary",
topic:"GROUP BY",
title:"Employees Per Department",
prompt:"Count employees in each department.",
hint:"Group rows by department_id using GROUP BY and select department_id along with COUNT(*).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT department_id, COUNT(*) FROM Employees GROUP BY department_id;",
xp:25
},

{
id:99,
difficulty:"Elementary",
topic:"GROUP BY",
title:"Total Sales by Region",
prompt:"Show total quantity_sold per region from SalesLog.",
hint:"Select region and SUM(quantity_sold), then add GROUP BY region to aggregate per region.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT region, SUM(quantity_sold) FROM SalesLog GROUP BY region;",
xp:25
},

{
id:100,
difficulty:"Elementary",
topic:"GROUP BY",
title:"Average Salary by Dept",
prompt:"Show the average salary per department_id.",
hint:"Combine AVG(salary) in SELECT with GROUP BY department_id to calculate one average per group.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT department_id, AVG(salary) FROM Employees GROUP BY department_id;",
xp:25
},

{
id:101,
difficulty:"Elementary",
topic:"GROUP BY",
title:"Orders per Customer",
prompt:"Count the number of orders each customer has placed.",
hint:"Select customer_id and COUNT(*) from Orders, grouping rows with GROUP BY customer_id.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT customer_id, COUNT(*) FROM Orders GROUP BY customer_id;",
xp:25
},

{
id:102,
difficulty:"Elementary",
topic:"GROUP BY",
title:"Products per Category",
prompt:"Count products in each category.",
hint:"Select category_id and COUNT(*) with GROUP BY category_id — note that NULL values form their own group.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT category_id, COUNT(*) FROM Products GROUP BY category_id;",
xp:25
},

/* ----- CASE ----- */

{
id:103,
difficulty:"Elementary",
topic:"CASE",
title:"Salary Label",
prompt:"Show employee names with a label: 'High' if salary > 70000, otherwise 'Standard'.",
hint:"CASE WHEN condition THEN result ELSE default END — use it in SELECT to create computed labels.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, CASE WHEN salary > 70000 THEN 'High' ELSE 'Standard' END AS salary_level FROM Employees;",
xp:25
},

{
id:104,
difficulty:"Elementary",
topic:"CASE",
title:"Stock Status",
prompt:"Show product names with 'Available' if in_stock = 1, 'Out of Stock' otherwise.",
hint:"CASE WHEN in_stock = 1 THEN 'Available' ELSE 'Out of Stock' END — transforms numeric flags into readable labels.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, CASE WHEN in_stock = 1 THEN 'Available' ELSE 'Out of Stock' END AS status FROM Products;",
xp:20
},

{
id:105,
difficulty:"Elementary",
topic:"CASE",
title:"Price Tier",
prompt:"Label products as 'Budget' (price < 50), 'Mid' (50-200), or 'Premium' (> 200).",
hint:"Chain multiple WHEN clauses: CASE WHEN price < 50 THEN 'Budget' WHEN price <= 200 THEN 'Mid' ELSE 'Premium' END",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, CASE WHEN price < 50 THEN 'Budget' WHEN price <= 200 THEN 'Mid' ELSE 'Premium' END AS tier FROM Products;",
xp:25
},

{
id:106,
difficulty:"Elementary",
topic:"CASE",
title:"Rating Stars",
prompt:"Show supplier names with their rating as text: 5='Excellent', 4='Good', 3='Average', else 'Below Average'.",
hint:"Use CASE with specific values: CASE rating WHEN 5 THEN 'Excellent' WHEN 4 THEN 'Good' ... END — this is the 'simple CASE' form.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, CASE rating WHEN 5 THEN 'Excellent' WHEN 4 THEN 'Good' WHEN 3 THEN 'Average' ELSE 'Below Average' END AS rating_text FROM Suppliers;",
xp:25
},

/* ----- EXISTS ----- */

{
id:107,
difficulty:"Elementary",
topic:"EXISTS",
title:"Customers With Orders",
prompt:"Find customers who have placed at least one order.",
hint:"EXISTS checks if a subquery returns any rows: WHERE EXISTS (SELECT 1 FROM Orders WHERE Orders.customer_id = Customers.id)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Customers WHERE EXISTS (SELECT 1 FROM Orders WHERE Orders.customer_id = Customers.id);",
xp:30
},

{
id:108,
difficulty:"Elementary",
topic:"EXISTS",
title:"Departments With Employees",
prompt:"Find departments that have at least one employee assigned.",
hint:"Use EXISTS with a correlated subquery: WHERE EXISTS (SELECT 1 FROM Employees WHERE Employees.department_id = Departments.id)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Departments WHERE EXISTS (SELECT 1 FROM Employees WHERE Employees.department_id = Departments.id);",
xp:30
},

{
id:109,
difficulty:"Elementary",
topic:"EXISTS",
title:"Products Not Ordered",
prompt:"Find products that have never been ordered.",
hint:"NOT EXISTS finds rows with no matching records: WHERE NOT EXISTS (SELECT 1 FROM Orders WHERE Orders.product_id = Products.id)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Products WHERE NOT EXISTS (SELECT 1 FROM Orders WHERE Orders.product_id = Products.id);",
xp:30
},

{
id:110,
difficulty:"Elementary",
topic:"EXISTS",
title:"Employees Without Projects",
prompt:"Find employees who are not assigned to any project.",
hint:"NOT EXISTS checks for missing relationships: WHERE NOT EXISTS (SELECT 1 FROM Assignments WHERE Assignments.employee_id = Employees.id)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees WHERE NOT EXISTS (SELECT 1 FROM Assignments WHERE Assignments.employee_id = Employees.id);",
xp:30
}

];
window.Exercises = (window.Exercises || []).concat(exercises);
})();
