/* ==========================
   INTERMEDIATE EXERCISES
   ========================== */

(function(){
var exercises = [

/* ----- MULTI-TABLE JOINs ----- */

{
id:111,
difficulty:"Intermediate",
topic:"JOIN",
title:"Three-Table Join",
prompt:"Show order id, customer name, and product name for every order.",
hint:"Chain two JOINs: Orders → Customers (on customer_id) and Orders → Products (on product_id). Use table aliases for readability.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT o.id, c.name, p.name FROM Orders o JOIN Customers c ON o.customer_id = c.id JOIN Products p ON o.product_id = p.id;",
xp:30
},

{
id:112,
difficulty:"Intermediate",
topic:"JOIN",
title:"LEFT JOIN Basics",
prompt:"Show ALL employees and their department names. Employees without a department should show NULL for department name.",
hint:"LEFT JOIN keeps all rows from the left table. Unmatched rows get NULL for right-table columns: FROM Employees LEFT JOIN Departments ON ...",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT Employees.name, Departments.name FROM Employees LEFT JOIN Departments ON Employees.department_id = Departments.id;",
xp:30
},

{
id:113,
difficulty:"Intermediate",
topic:"JOIN",
title:"LEFT JOIN Find Unmatched",
prompt:"Find products that have no category assigned (use LEFT JOIN to identify them).",
hint:"LEFT JOIN + WHERE right_table.column IS NULL finds rows with no match: FROM Products LEFT JOIN Categories ON ... WHERE Categories.id IS NULL",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT Products.name FROM Products LEFT JOIN Categories ON Products.category_id = Categories.id WHERE Categories.id IS NULL;",
xp:35
},

{
id:114,
difficulty:"Intermediate",
topic:"JOIN",
title:"Self-Join: Manager Names",
prompt:"Show each employee's name and their manager's name. Label them 'employee' and 'manager'.",
hint:"A self-join joins a table to itself using aliases: FROM Employees e JOIN Employees m ON e.manager_id = m.id",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT e.name AS employee, m.name AS manager FROM Employees e JOIN Employees m ON e.manager_id = m.id;",
strictColumns:true,
xp:35
},

{
id:115,
difficulty:"Intermediate",
topic:"JOIN",
title:"LEFT Self-Join",
prompt:"Show ALL employees and their manager's name. Employees without a manager should show NULL.",
hint:"Use LEFT JOIN for the self-join so employees with no manager (NULL manager_id) are still included.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT e.name AS employee, m.name AS manager FROM Employees e LEFT JOIN Employees m ON e.manager_id = m.id;",
xp:35
},

{
id:116,
difficulty:"Intermediate",
topic:"JOIN",
title:"JOIN with Aggregation",
prompt:"Show each department name and the count of employees in it.",
hint:"JOIN then GROUP BY: FROM Departments JOIN Employees ON ... GROUP BY Departments.name — use COUNT(*) for the count.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT d.name, COUNT(*) AS emp_count FROM Departments d JOIN Employees e ON d.id = e.department_id GROUP BY d.name;",
xp:35
},

{
id:117,
difficulty:"Intermediate",
topic:"JOIN",
title:"Inventory Full Details",
prompt:"Show product name, supplier name, and stock for all inventory entries.",
hint:"Join Inventory to Products (on product_id) and Suppliers (on supplier_id) to resolve the IDs to names.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT p.name, s.name, i.stock FROM Inventory i JOIN Products p ON i.product_id = p.id JOIN Suppliers s ON i.supplier_id = s.id;",
xp:30
},

{
id:118,
difficulty:"Intermediate",
topic:"JOIN",
title:"RIGHT JOIN Concept",
prompt:"Show all employee names and department names using a RIGHT JOIN (so departments without employees are still shown).",
hint:"RIGHT JOIN keeps all rows from the right table (Departments). Both native RIGHT JOIN (PostgreSQL / SQLite 3.39+) and rewriting as a LEFT JOIN with tables swapped work here.",
note:"PostgreSQL / Cross-Dialect Note: RIGHT JOIN is standard in PostgreSQL/MySQL and supported in modern SQLite (3.39+, used here). Both native RIGHT JOIN and the classic LEFT JOIN rewrite pass.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT e.name, d.name FROM Employees e RIGHT JOIN Departments d ON e.department_id = d.id;",
xp:35
},

{
id:119,
difficulty:"Intermediate",
topic:"JOIN",
title:"FULL OUTER JOIN Concept",
prompt:"Show all employee names and department names, including unmatched rows from both sides.",
hint:"FULL OUTER JOIN keeps unmatched rows from both tables. Both native FULL OUTER JOIN (PostgreSQL / SQLite 3.39+) and a UNION of two LEFT JOINs produce the same result.",
note:"PostgreSQL / Cross-Dialect Note: FULL OUTER JOIN is native in PostgreSQL and modern SQLite (3.39+, used here); in MySQL or older SQLite it is emulated using UNION of two LEFT JOINs.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT e.name AS employee, d.name AS department FROM Employees e FULL OUTER JOIN Departments d ON e.department_id = d.id;",
xp:40
},

{
id:120,
difficulty:"Intermediate",
topic:"JOIN",
title:"Total Spending per Customer",
prompt:"Show customer name and total payment amount for each customer.",
hint:"JOIN Payments with Customers, then GROUP BY customer name with SUM(amount).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT c.name, SUM(p.amount) AS total_spent FROM Payments p JOIN Customers c ON p.customer_id = c.id GROUP BY c.name;",
xp:35
},

/* ----- GROUP BY + HAVING ----- */

{
id:121,
difficulty:"Intermediate",
topic:"HAVING",
title:"Departments With Many Employees",
prompt:"Find departments with more than 2 employees. Show department_id and count.",
hint:"HAVING filters groups after GROUP BY: GROUP BY department_id HAVING COUNT(*) > 2. Unlike WHERE, HAVING works on aggregated values.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT department_id, COUNT(*) AS cnt FROM Employees GROUP BY department_id HAVING COUNT(*) > 2;",
xp:30
},

{
id:122,
difficulty:"Intermediate",
topic:"HAVING",
title:"High-Value Customers",
prompt:"Find customers who have paid more than 400 in total. Show customer_id and total.",
hint:"GROUP BY customer_id, then HAVING SUM(amount) > 400 filters to only high-value customers.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT customer_id, SUM(amount) AS total FROM Payments GROUP BY customer_id HAVING SUM(amount) > 400;",
xp:30
},

{
id:123,
difficulty:"Intermediate",
topic:"HAVING",
title:"Popular Products",
prompt:"Find products ordered more than once. Show product_id and order count.",
hint:"GROUP BY product_id with HAVING COUNT(*) > 1 identifies products that appear in multiple orders.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT product_id, COUNT(*) AS order_count FROM Orders GROUP BY product_id HAVING COUNT(*) > 1;",
xp:30
},

{
id:124,
difficulty:"Intermediate",
topic:"HAVING",
title:"Average Salary Filter",
prompt:"Find departments where the average salary exceeds 60000.",
hint:"HAVING AVG(salary) > 60000 filters groups by their average, not individual rows.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT department_id, AVG(salary) AS avg_salary FROM Employees GROUP BY department_id HAVING AVG(salary) > 60000;",
xp:35
},

{
id:125,
difficulty:"Intermediate",
topic:"HAVING",
title:"GROUP BY Multiple Columns",
prompt:"Count sales per product per region. Show only combinations with more than 1 sale.",
hint:"GROUP BY product_id, region creates a group for each product-region pair. HAVING COUNT(*) > 1 filters.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT product_id, region, COUNT(*) AS sale_count FROM SalesLog GROUP BY product_id, region HAVING COUNT(*) > 1;",
xp:35
},

{
id:126,
difficulty:"Intermediate",
topic:"HAVING",
title:"Min Stock Check",
prompt:"Show suppliers (by supplier_id) whose minimum stock across all products is below 50.",
hint:"GROUP BY supplier_id, then HAVING MIN(stock) < 50 finds suppliers with at least one low-stock item.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT supplier_id, MIN(stock) AS min_stock FROM Inventory GROUP BY supplier_id HAVING MIN(stock) < 50;",
xp:30
},

{
id:127,
difficulty:"Intermediate",
topic:"HAVING",
title:"Regions with High Sales",
prompt:"Find regions with total quantity_sold exceeding 50.",
hint:"GROUP BY region with HAVING SUM(quantity_sold) > 50 filters for high-volume regions.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT region, SUM(quantity_sold) AS total FROM SalesLog GROUP BY region HAVING SUM(quantity_sold) > 50;",
xp:30
},

{
id:128,
difficulty:"Intermediate",
topic:"HAVING",
title:"Payment Methods Used Often",
prompt:"Find payment methods used more than 2 times.",
hint:"GROUP BY method then HAVING COUNT(*) > 2 shows only frequently-used payment methods.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT method, COUNT(*) AS cnt FROM Payments GROUP BY method HAVING COUNT(*) > 2;",
xp:30
},

/* ----- SUBQUERIES ----- */

{
id:129,
difficulty:"Intermediate",
topic:"SUBQUERY",
title:"Above Average Salary",
prompt:"Find employees earning above the average salary.",
hint:"Use a subquery in WHERE: WHERE salary > (SELECT AVG(salary) FROM Employees). The inner query computes the average first.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees WHERE salary > (SELECT AVG(salary) FROM Employees);",
xp:30
},

{
id:130,
difficulty:"Intermediate",
topic:"SUBQUERY",
title:"Max Payment",
prompt:"Find the payment(s) with the maximum amount.",
hint:"WHERE amount = (SELECT MAX(amount) FROM Payments) — the subquery finds the max, the outer query returns matching rows.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Payments WHERE amount = (SELECT MAX(amount) FROM Payments);",
xp:30
},

{
id:131,
difficulty:"Intermediate",
topic:"SUBQUERY",
title:"IN Subquery",
prompt:"Find employees who work in departments located in the Departments table with names starting with 'E' or 'S'.",
hint:"Use IN with a subquery: WHERE department_id IN (SELECT id FROM Departments WHERE name LIKE 'E%' OR name LIKE 'S%')",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees WHERE department_id IN (SELECT id FROM Departments WHERE name LIKE 'E%' OR name LIKE 'S%');",
xp:35
},

{
id:132,
difficulty:"Intermediate",
topic:"SUBQUERY",
title:"Products Above Average Price",
prompt:"Find products priced above the average product price.",
hint:"Subquery for average: WHERE price > (SELECT AVG(price) FROM Products)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Products WHERE price > (SELECT AVG(price) FROM Products);",
xp:30
},

{
id:133,
difficulty:"Intermediate",
topic:"SUBQUERY",
title:"Derived Table",
prompt:"Show the average of total payments per customer. (First calculate total per customer, then average those totals.)",
hint:"Use a subquery in FROM (derived table): SELECT AVG(total) FROM (SELECT SUM(amount) AS total FROM Payments GROUP BY customer_id)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT AVG(total) AS avg_total FROM (SELECT SUM(amount) AS total FROM Payments GROUP BY customer_id);",
xp:40
},

{
id:134,
difficulty:"Intermediate",
topic:"SUBQUERY",
title:"Customers in Same City",
prompt:"Find customers who live in the same city as customer 'John'.",
hint:"Nested subquery: WHERE city = (SELECT city FROM Customers WHERE name = 'John') AND name != 'John'",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Customers WHERE city = (SELECT city FROM Customers WHERE name = 'John') AND name != 'John';",
xp:35
},

{
id:135,
difficulty:"Intermediate",
topic:"SUBQUERY",
title:"Departments Without Employees",
prompt:"Find departments with no employees using a subquery.",
hint:"WHERE id NOT IN (SELECT DISTINCT department_id FROM Employees WHERE department_id IS NOT NULL) — be careful with NULLs in NOT IN!",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Departments WHERE id NOT IN (SELECT DISTINCT department_id FROM Employees WHERE department_id IS NOT NULL);",
xp:35
},

{
id:136,
difficulty:"Intermediate",
topic:"SUBQUERY",
title:"Second Highest Salary",
prompt:"Find the second highest salary in the Employees table.",
hint:"Use a scalar subquery in WHERE to exclude the maximum salary, then take MAX(salary) of the remaining rows.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT MAX(salary) FROM Employees WHERE salary < (SELECT MAX(salary) FROM Employees);",
xp:40
},

{
id:137,
difficulty:"Intermediate",
topic:"SUBQUERY",
title:"Most Expensive Product Per Category",
prompt:"Find products whose price equals the maximum price in their category.",
hint:"Correlated subquery: WHERE price = (SELECT MAX(price) FROM Products p2 WHERE p2.category_id = Products.category_id)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Products WHERE price = (SELECT MAX(p2.price) FROM Products p2 WHERE p2.category_id = Products.category_id);",
xp:40
},

{
id:138,
difficulty:"Intermediate",
topic:"SUBQUERY",
title:"Scalar Subquery in SELECT",
prompt:"Show each employee's name, salary, and the overall average salary as 'avg_salary' in the same row.",
hint:"Place a scalar subquery (SELECT AVG(...) FROM ...) directly inside the outer SELECT column list and alias it as 'avg_salary'.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, salary, (SELECT AVG(salary) FROM Employees) AS avg_salary FROM Employees;",
strictColumns:true,
xp:35
},

/* ----- UNION ----- */

{
id:139,
difficulty:"Intermediate",
topic:"UNION",
title:"Combine Names",
prompt:"Combine all employee names and all customer names into a single list (no duplicates).",
hint:"UNION combines two SELECT results and removes duplicates. Both SELECTs must have the same number of columns.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name FROM Employees UNION SELECT name FROM Customers;",
xp:25
},

{
id:140,
difficulty:"Intermediate",
topic:"UNION",
title:"UNION ALL",
prompt:"Combine all employee names and customer names, keeping duplicates.",
hint:"UNION ALL keeps all rows including duplicates. It's faster than UNION since it skips deduplication.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name FROM Employees UNION ALL SELECT name FROM Customers;",
xp:25
},

{
id:141,
difficulty:"Intermediate",
topic:"UNION",
title:"INTERSECT",
prompt:"Find names that appear in both the Employees table and Customers table.",
hint:"Use INTERSECT between two SELECT queries (one from Employees, one from Customers) to keep only rows present in both sets.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name FROM Employees INTERSECT SELECT name FROM Customers;",
xp:30
},

{
id:142,
difficulty:"Intermediate",
topic:"UNION",
title:"EXCEPT",
prompt:"Find employee names that are NOT in the Customers table.",
hint:"Use EXCEPT between two SELECT queries to return values from the first set that do not appear in the second set.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name FROM Employees EXCEPT SELECT name FROM Customers;",
xp:30
},

{
id:143,
difficulty:"Intermediate",
topic:"UNION",
title:"Combined with Labels",
prompt:"Show all names with a source column: 'Employee' for employee names and 'Customer' for customer names.",
hint:"Add a string literal column in each SELECT (e.g. 'Employee' AS source) and combine both queries with UNION ALL.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, 'Employee' AS source FROM Employees UNION ALL SELECT name, 'Customer' FROM Customers;",
xp:30
},

{
id:144,
difficulty:"Intermediate",
topic:"UNION",
title:"Combine Countries",
prompt:"Get a unique list of all countries from both Customers and Suppliers.",
hint:"Combine the country column from both tables using UNION (without ALL), which automatically removes duplicates.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT country FROM Customers UNION SELECT country FROM Suppliers;",
xp:25
},

/* ----- CASE ADVANCED ----- */

{
id:145,
difficulty:"Intermediate",
topic:"CASE",
title:"Conditional Counting",
prompt:"Count the number of high-salary (>70000) and low-salary (<=70000) employees.",
hint:"Use CASE inside COUNT or SUM: SUM(CASE WHEN salary > 70000 THEN 1 ELSE 0 END) AS high_count",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT SUM(CASE WHEN salary > 70000 THEN 1 ELSE 0 END) AS high_count, SUM(CASE WHEN salary <= 70000 THEN 1 ELSE 0 END) AS low_count FROM Employees;",
xp:35
},

{
id:146,
difficulty:"Intermediate",
topic:"CASE",
title:"CASE in ORDER BY",
prompt:"Show all products sorted so that 'Electronics' category (1) comes first, then 'Gaming' (3), then everything else.",
hint:"Use CASE in ORDER BY to define custom sort priority: ORDER BY CASE category_id WHEN 1 THEN 1 WHEN 3 THEN 2 ELSE 3 END",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Products ORDER BY CASE category_id WHEN 1 THEN 1 WHEN 3 THEN 2 ELSE 3 END;",
xp:35
},

{
id:147,
difficulty:"Intermediate",
topic:"CASE",
title:"CASE with NULL",
prompt:"Show employee names and department status: 'Assigned' if department_id is not NULL, 'Unassigned' if NULL.",
hint:"CASE can check for NULL: CASE WHEN department_id IS NULL THEN 'Unassigned' ELSE 'Assigned' END",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, CASE WHEN department_id IS NULL THEN 'Unassigned' ELSE 'Assigned' END AS dept_status FROM Employees;",
xp:30
},

{
id:148,
difficulty:"Intermediate",
topic:"CASE",
title:"Nested CASE",
prompt:"Classify employee salaries: 'Entry' (<50000), 'Mid' (50000-75000), 'Senior' (75001-90000), 'Executive' (>90000).",
hint:"Chain WHEN clauses for ranges: CASE WHEN salary < 50000 THEN 'Entry' WHEN salary <= 75000 THEN 'Mid' ...",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, salary, CASE WHEN salary < 50000 THEN 'Entry' WHEN salary <= 75000 THEN 'Mid' WHEN salary <= 90000 THEN 'Senior' ELSE 'Executive' END AS level FROM Employees;",
xp:35
},

{
id:149,
difficulty:"Intermediate",
topic:"CASE",
title:"CASE in Aggregation",
prompt:"Show the total salary paid to Engineering (dept 1) vs all other departments.",
hint:"Use CASE inside SUM: SUM(CASE WHEN department_id = 1 THEN salary ELSE 0 END) AS engineering_total",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT SUM(CASE WHEN department_id = 1 THEN salary ELSE 0 END) AS engineering_total, SUM(CASE WHEN department_id != 1 OR department_id IS NULL THEN salary ELSE 0 END) AS other_total FROM Employees;",
xp:40
},

/* ----- DATE FUNCTIONS ----- */

{
id:150,
difficulty:"Intermediate",
topic:"DATE FUNCTIONS",
title:"Extract Year",
prompt:"Show each order's id and the year it was placed.",
hint:"STRFTIME('%Y', date_column) extracts the year from a date string. Works with ISO format dates (YYYY-MM-DD).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT id, STRFTIME('%Y', order_date) AS year FROM Orders;",
xp:30
},

{
id:151,
difficulty:"Intermediate",
topic:"DATE FUNCTIONS",
title:"Extract Month",
prompt:"Show each payment's id and the month it was made.",
hint:"STRFTIME('%m', date_column) extracts the 2-digit month (01-12) from a date.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT id, STRFTIME('%m', payment_date) AS month FROM Payments;",
xp:30
},

{
id:152,
difficulty:"Intermediate",
topic:"DATE FUNCTIONS",
title:"Orders This Quarter",
prompt:"Find orders placed in Q1 2024 (January-March).",
hint:"Filter with WHERE: order_date >= '2024-01-01' AND order_date < '2024-04-01' or use BETWEEN.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Orders WHERE order_date BETWEEN '2024-01-01' AND '2024-03-31';",
xp:30
},

{
id:153,
difficulty:"Intermediate",
topic:"DATE FUNCTIONS",
title:"Days Between Dates",
prompt:"Show each project's name and duration in days (end_date minus start_date).",
hint:"JULIANDAY(date) returns a numeric day value. Subtract: JULIANDAY(end_date) - JULIANDAY(start_date) gives days between.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, JULIANDAY(end_date) - JULIANDAY(start_date) AS duration_days FROM Projects;",
xp:35
},

{
id:154,
difficulty:"Intermediate",
topic:"DATE FUNCTIONS",
title:"Hire Year Distribution",
prompt:"Count employees by their hire year.",
hint:"GROUP BY the extracted year: GROUP BY STRFTIME('%Y', hire_date) with COUNT(*).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT STRFTIME('%Y', hire_date) AS hire_year, COUNT(*) AS count FROM Employees GROUP BY STRFTIME('%Y', hire_date);",
xp:35
},

{
id:155,
difficulty:"Intermediate",
topic:"DATE FUNCTIONS",
title:"Current Date",
prompt:"Show today's date using the DATE() function, labeled as 'today'.",
hint:"Pass 'now' to DATE(...) to get today's UTC date in YYYY-MM-DD format, and alias the result column as 'today'.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT DATE('now') AS today;",
strictColumns:true,
xp:25
},

{
id:156,
difficulty:"Intermediate",
topic:"DATE FUNCTIONS",
title:"Sales per Month",
prompt:"Show total quantity_sold per month from SalesLog.",
hint:"STRFTIME('%Y-%m', sale_date) extracts year-month. GROUP BY this to aggregate monthly.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT STRFTIME('%Y-%m', sale_date) AS month, SUM(quantity_sold) AS total FROM SalesLog GROUP BY STRFTIME('%Y-%m', sale_date);",
xp:35
},

{
id:157,
difficulty:"Intermediate",
topic:"DATE FUNCTIONS",
title:"Day of Week",
prompt:"Show each order's id and day of the week (0=Sunday, 6=Saturday).",
hint:"STRFTIME('%w', date) returns the day of the week as a number: 0 for Sunday through 6 for Saturday.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT id, STRFTIME('%w', order_date) AS day_of_week FROM Orders;",
xp:30
},

/* ----- STRING FUNCTIONS ADVANCED ----- */

{
id:158,
difficulty:"Intermediate",
topic:"STRING FUNCTIONS",
title:"Find Position",
prompt:"Show each employee's email and the position of '@' in it.",
hint:"INSTR(string, substring) returns the position of the first occurrence. Returns 0 if not found.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT email, INSTR(email, '@') AS at_position FROM Employees;",
xp:30
},

{
id:159,
difficulty:"Intermediate",
topic:"STRING FUNCTIONS",
title:"Extract Username",
prompt:"Show each employee's email username (the part before '@').",
hint:"Combine SUBSTR and INSTR: SUBSTR(email, 1, INSTR(email, '@') - 1) extracts everything before the @.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT SUBSTR(email, 1, INSTR(email, '@') - 1) AS username FROM Employees;",
xp:35
},

{
id:160,
difficulty:"Intermediate",
topic:"STRING FUNCTIONS",
title:"Trim Spaces",
prompt:"Select the trimmed version of ' Hello World ' (with leading/trailing spaces removed).",
hint:"TRIM(string) removes leading and trailing whitespace. LTRIM removes left only, RTRIM removes right only.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT TRIM('  Hello World  ') AS trimmed;",
xp:25
},

{
id:161,
difficulty:"Intermediate",
topic:"STRING FUNCTIONS",
title:"Pad with Zeros",
prompt:"Show product ids as 3-digit strings padded with leading zeros (e.g., 1 → '001').",
hint:"Use SUBSTR('000' || id, -3, 3) or printf('%03d', id) to zero-pad. The printf approach is cleaner.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT printf('%03d', id) AS padded_id, name FROM Products;",
xp:35
},

{
id:162,
difficulty:"Intermediate",
topic:"STRING FUNCTIONS",
title:"Build Full Address",
prompt:"Show each customer's name and a full address string in format: 'city, country'.",
hint:"Concatenate with ||: city || ', ' || country builds the combined string.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, city || ', ' || country AS address FROM Customers;",
xp:25
},

/* ----- MATH FUNCTIONS ----- */

{
id:163,
difficulty:"Intermediate",
topic:"MATH FUNCTIONS",
title:"Absolute Difference",
prompt:"Show each salary change with the absolute difference between old and new salary.",
hint:"ABS(value) returns the absolute (positive) value: ABS(new_salary - old_salary)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT employee_id, ABS(new_salary - old_salary) AS change_amount FROM EmployeeHistory;",
xp:30
},

{
id:164,
difficulty:"Intermediate",
topic:"MATH FUNCTIONS",
title:"Round Average",
prompt:"Show the average product price rounded to 2 decimal places.",
hint:"ROUND(value, decimals) rounds a number: ROUND(AVG(price), 2) gives the average with 2 decimal places.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT ROUND(AVG(price), 2) AS avg_price FROM Products;",
xp:30
},

{
id:165,
difficulty:"Intermediate",
topic:"MATH FUNCTIONS",
title:"Modulo Operator",
prompt:"Find employees with an odd id number.",
hint:"The modulo operator % gives the remainder: WHERE id % 2 = 1 finds odd numbers (remainder 1 when divided by 2).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees WHERE id % 2 = 1;",
xp:30
},

{
id:166,
difficulty:"Intermediate",
topic:"MATH FUNCTIONS",
title:"Price Per Unit Rounded",
prompt:"Show each product's name and price per hundred (price / 100.0) rounded to 1 decimal.",
hint:"Use ROUND(price / 100.0, 1). Dividing by 100.0 (not 100) ensures decimal result in SQLite.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, ROUND(price / 100.0, 1) AS price_per_hundred FROM Products;",
xp:30
},

/* ----- INSERT ADVANCED ----- */

{
id:167,
difficulty:"Intermediate",
topic:"INSERT",
title:"INSERT from SELECT",
prompt:"Insert all products with price > 200 into a new table 'ExpensiveProducts' (create it first with same structure as Products).",
hint:"First CREATE TABLE, then INSERT INTO ... SELECT: INSERT INTO ExpensiveProducts SELECT * FROM Products WHERE price > 200;",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TABLE ExpensiveProducts AS SELECT * FROM Products WHERE price > 200;",
validationType:"ddl",
verificationQuery:"SELECT * FROM ExpensiveProducts ORDER BY id;",
xp:40
},

{
id:168,
difficulty:"Intermediate",
topic:"INSERT",
title:"INSERT OR REPLACE",
prompt:"Insert or replace a supplier: id=1, name='TechCorp Pro', country='USA', rating=5.",
hint:"INSERT OR REPLACE updates the row if the primary key already exists, inserts if not. Useful for upsert patterns.",
starterCode:"-- Write your SQL here",
expectedQuery:"INSERT OR REPLACE INTO Suppliers VALUES(1, 'TechCorp Pro', 'USA', 5);",
validationType:"dml",
verificationQuery:"SELECT * FROM Suppliers ORDER BY id;",
xp:35
},

{
id:169,
difficulty:"Intermediate",
topic:"INSERT",
title:"Insert Calculated Values",
prompt:"Insert a new payment: id=13, customer_id=1, amount equal to the max existing payment amount, payment_date='2024-06-01', method='Credit Card'.",
hint:"You can place a scalar subquery like (SELECT MAX(amount) FROM Payments) directly inside the VALUES(...) list.",
starterCode:"-- Write your SQL here",
expectedQuery:"INSERT INTO Payments VALUES(13, 1, (SELECT MAX(amount) FROM Payments), '2024-06-01', 'Credit Card');",
validationType:"dml",
verificationQuery:"SELECT * FROM Payments ORDER BY id;",
xp:40
},

{
id:170,
difficulty:"Intermediate",
topic:"INSERT",
title:"Insert Calculated Sales Entry",
prompt:"Insert a new sales log entry (id=19) for product 1 with quantity_sold equal to 2x the average quantity_sold (cast as INTEGER), today's date via DATE('now'), and region 'Europe'.",
hint:"Use CAST((SELECT AVG(quantity_sold) * 2 FROM SalesLog) AS INTEGER) for the quantity and DATE('now') for the date inside VALUES(...).",
starterCode:"-- Write your SQL here",
expectedQuery:"INSERT INTO SalesLog VALUES(19, 1, CAST((SELECT AVG(quantity_sold) * 2 FROM SalesLog) AS INTEGER), DATE('now'), 'Europe');",
validationType:"dml",
verificationQuery:"SELECT id, product_id, quantity_sold, sale_date, region FROM SalesLog ORDER BY id;",
xp:40
},

/* ----- UPDATE ADVANCED ----- */

{
id:171,
difficulty:"Intermediate",
topic:"UPDATE",
title:"Update with Subquery",
prompt:"Set George's salary to the average salary of all employees (cast as INTEGER).",
hint:"Use a scalar subquery inside SET with CAST(... AS INTEGER) and filter with WHERE name = 'George'.",
starterCode:"-- Write your SQL here",
expectedQuery:"UPDATE Employees SET salary = (SELECT CAST(AVG(salary) AS INTEGER) FROM Employees) WHERE name = 'George';",
validationType:"dml",
verificationQuery:"SELECT name, salary FROM Employees WHERE name = 'George';",
xp:40
},

{
id:172,
difficulty:"Intermediate",
topic:"UPDATE",
title:"Update with CASE",
prompt:"Give a 10% raise to employees earning under 50000 and a 5% raise to those earning 50000-70000 (cast new salaries as INTEGER). Leave others unchanged.",
hint:"Use a CASE WHEN ... THEN CAST(... AS INTEGER) ... ELSE salary END expression inside UPDATE Employees SET salary = ...;",
starterCode:"-- Write your SQL here",
expectedQuery:"UPDATE Employees SET salary = CASE WHEN salary < 50000 THEN CAST(salary * 1.1 AS INTEGER) WHEN salary <= 70000 THEN CAST(salary * 1.05 AS INTEGER) ELSE salary END;",
validationType:"dml",
verificationQuery:"SELECT name, salary FROM Employees ORDER BY id;",
xp:40
},

{
id:173,
difficulty:"Intermediate",
topic:"UPDATE",
title:"Swap Values",
prompt:"Swap the names of departments with id 1 and id 2.",
hint:"Use CASE id WHEN 1 THEN ... WHEN 2 THEN ... END in UPDATE Departments SET name = ... with WHERE id IN (1, 2).",
starterCode:"-- Write your SQL here",
expectedQuery:"UPDATE Departments SET name = CASE id WHEN 1 THEN 'Sales' WHEN 2 THEN 'Engineering' END WHERE id IN (1, 2);",
validationType:"dml",
verificationQuery:"SELECT * FROM Departments ORDER BY id;",
xp:40
},

{
id:174,
difficulty:"Intermediate",
topic:"UPDATE",
title:"Conditional Status Update",
prompt:"Set in_stock to 0 for products that appear in Inventory with stock of 30 or less (stock <= 30).",
hint:"Use UPDATE Products SET in_stock = 0 with a WHERE id IN (...) subquery selecting product_id from Inventory where stock <= 30.",
starterCode:"-- Write your SQL here",
expectedQuery:"UPDATE Products SET in_stock = 0 WHERE id IN (SELECT product_id FROM Inventory WHERE stock <= 30);",
validationType:"dml",
verificationQuery:"SELECT name, in_stock FROM Products ORDER BY id;",
xp:40
},

{
id:175,
difficulty:"Intermediate",
topic:"UPDATE",
title:"Increment Counter",
prompt:"Increase the stock by 10 for all inventory items supplied by supplier 1.",
hint:"Reference the existing column value on the right side of SET (stock = stock + 10) and filter by supplier_id = 1.",
starterCode:"-- Write your SQL here",
expectedQuery:"UPDATE Inventory SET stock = stock + 10 WHERE supplier_id = 1;",
validationType:"dml",
verificationQuery:"SELECT * FROM Inventory ORDER BY product_id, supplier_id;",
xp:30
},

/* ----- DELETE ADVANCED ----- */

{
id:176,
difficulty:"Intermediate",
topic:"DELETE",
title:"Delete with Subquery",
prompt:"Delete all orders placed by customers from 'France'.",
hint:"Use DELETE FROM Orders with WHERE customer_id IN (SELECT ...) to match customers whose country is 'France'.",
starterCode:"-- Write your SQL here",
expectedQuery:"DELETE FROM Orders WHERE customer_id IN (SELECT id FROM Customers WHERE country = 'France');",
validationType:"dml",
verificationQuery:"SELECT * FROM Orders ORDER BY id;",
xp:35
},

{
id:177,
difficulty:"Intermediate",
topic:"DELETE",
title:"Delete by Region",
prompt:"Delete all sales log entries from the 'Americas' region.",
hint:"Use DELETE FROM table_name with a WHERE condition matching region = 'Americas'.",
starterCode:"-- Write your SQL here",
expectedQuery:"DELETE FROM SalesLog WHERE region = 'Americas';",
validationType:"dml",
verificationQuery:"SELECT * FROM SalesLog ORDER BY id;",
xp:30
},

{
id:178,
difficulty:"Intermediate",
topic:"DELETE",
title:"Delete Old Records",
prompt:"Delete payments made before March 2024.",
hint:"ISO dates (YYYY-MM-DD) compare lexicographically — filter payment_date < '2024-03-01' inside DELETE FROM Payments.",
starterCode:"-- Write your SQL here",
expectedQuery:"DELETE FROM Payments WHERE payment_date < '2024-03-01';",
validationType:"dml",
verificationQuery:"SELECT * FROM Payments ORDER BY id;",
xp:30
},

{
id:179,
difficulty:"Intermediate",
topic:"DELETE",
title:"Delete with NOT IN",
prompt:"Delete all products that are NOT in any order.",
hint:"Use DELETE FROM Products with WHERE id NOT IN (...) over the distinct product_id values in Orders.",
starterCode:"-- Write your SQL here",
expectedQuery:"DELETE FROM Products WHERE id NOT IN (SELECT DISTINCT product_id FROM Orders);",
validationType:"dml",
verificationQuery:"SELECT * FROM Products ORDER BY id;",
xp:35
},

{
id:180,
difficulty:"Intermediate",
topic:"DELETE",
title:"Delete with EXISTS",
prompt:"Delete employees who have no project assignments.",
hint:"Use DELETE FROM Employees with WHERE NOT EXISTS (SELECT 1 FROM Assignments WHERE ...) correlated on employee_id.",
starterCode:"-- Write your SQL here",
expectedQuery:"DELETE FROM Employees WHERE NOT EXISTS (SELECT 1 FROM Assignments WHERE Assignments.employee_id = Employees.id);",
validationType:"dml",
verificationQuery:"SELECT name FROM Employees ORDER BY id;",
xp:40
}

];
window.Exercises = (window.Exercises || []).concat(exercises);
})();
