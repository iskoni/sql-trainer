/* ==========================
   ADVANCED EXERCISES
   ========================== */

(function(){
var exercises = [

/* ----- CORRELATED SUBQUERIES ----- */

{
id:181,
difficulty:"Advanced",
topic:"CORRELATED SUBQUERY",
title:"Above Department Average",
prompt:"Find employees earning more than the average salary of their own department.",
hint:"A correlated subquery references the outer query: WHERE salary > (SELECT AVG(salary) FROM Employees e2 WHERE e2.department_id = e1.department_id)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees e1 WHERE salary > (SELECT AVG(salary) FROM Employees e2 WHERE e2.department_id = e1.department_id);",
xp:50
},

{
id:182,
difficulty:"Advanced",
topic:"CORRELATED SUBQUERY",
title:"Employees With Higher Salary Than Manager",
prompt:"Find employees who earn more than their manager.",
hint:"Compare salary to manager's salary: WHERE salary > (SELECT salary FROM Employees m WHERE m.id = e.manager_id)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT e.name, e.salary FROM Employees e WHERE e.manager_id IS NOT NULL AND e.salary > (SELECT m.salary FROM Employees m WHERE m.id = e.manager_id);",
xp:55
},

{
id:183,
difficulty:"Advanced",
topic:"CORRELATED SUBQUERY",
title:"Count in SELECT",
prompt:"Show each department name and the count of its employees (using a correlated subquery in SELECT).",
hint:"Place correlated subquery in SELECT list: SELECT name, (SELECT COUNT(*) FROM Employees WHERE department_id = d.id) FROM Departments d;",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT d.name, (SELECT COUNT(*) FROM Employees e WHERE e.department_id = d.id) AS emp_count FROM Departments d;",
xp:50
},

{
id:184,
difficulty:"Advanced",
topic:"CORRELATED SUBQUERY",
title:"Latest Payment Per Customer",
prompt:"Find each customer's most recent payment (the one with the latest payment_date).",
hint:"Use correlated subquery: WHERE payment_date = (SELECT MAX(payment_date) FROM Payments p2 WHERE p2.customer_id = p1.customer_id)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Payments p1 WHERE payment_date = (SELECT MAX(p2.payment_date) FROM Payments p2 WHERE p2.customer_id = p1.customer_id);",
xp:55
},

{
id:185,
difficulty:"Advanced",
topic:"CORRELATED SUBQUERY",
title:"Products Sold in All Regions",
prompt:"Find products that have sales in every region (Europe, Americas, Asia).",
hint:"Use NOT EXISTS to check no region is missing: WHERE NOT EXISTS (SELECT DISTINCT region FROM SalesLog EXCEPT SELECT region FROM SalesLog s WHERE s.product_id = p.id)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT DISTINCT p.name FROM Products p WHERE NOT EXISTS (SELECT DISTINCT region FROM SalesLog EXCEPT SELECT region FROM SalesLog s WHERE s.product_id = p.id);",
xp:60
},

{
id:186,
difficulty:"Advanced",
topic:"CORRELATED SUBQUERY",
title:"Rank Without Window",
prompt:"Show each employee's name, salary, and their salary rank (count of employees with higher salary + 1).",
hint:"Compute rank via correlated subquery: (SELECT COUNT(*) FROM Employees e2 WHERE e2.salary > e1.salary) + 1 AS rank",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, salary, (SELECT COUNT(*) FROM Employees e2 WHERE e2.salary > e1.salary) + 1 AS rank FROM Employees e1 ORDER BY salary DESC;",
xp:55
},

{
id:187,
difficulty:"Advanced",
topic:"CORRELATED SUBQUERY",
title:"EXISTS for Conditional",
prompt:"Show each customer and whether they have made any payment (true/false as 1/0).",
hint:"EXISTS returns true/false: SELECT name, EXISTS(SELECT 1 FROM Payments WHERE customer_id = c.id) AS has_paid FROM Customers c;",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, EXISTS(SELECT 1 FROM Payments p WHERE p.customer_id = c.id) AS has_paid FROM Customers c;",
xp:50
},

{
id:188,
difficulty:"Advanced",
topic:"CORRELATED SUBQUERY",
title:"Department Max Salary",
prompt:"Show each department's name and its highest-paid employee's salary using a subquery.",
hint:"Use correlated subquery to find MAX salary per department in the SELECT clause.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT d.name, (SELECT MAX(salary) FROM Employees e WHERE e.department_id = d.id) AS max_salary FROM Departments d;",
xp:50
},

/* ----- WINDOW FUNCTIONS ----- */

{
id:189,
difficulty:"Advanced",
topic:"WINDOW FUNCTIONS",
title:"ROW_NUMBER",
prompt:"Show employees with a row number assigned by salary descending.",
hint:"ROW_NUMBER() OVER (ORDER BY salary DESC) assigns sequential numbers. Each row gets a unique number.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num FROM Employees;",
xp:45
},

{
id:190,
difficulty:"Advanced",
topic:"WINDOW FUNCTIONS",
title:"RANK",
prompt:"Rank employees by salary descending. Employees with the same salary should share a rank.",
hint:"RANK() OVER (ORDER BY salary DESC) — unlike ROW_NUMBER, ties share the same rank and the next rank is skipped.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, salary, RANK() OVER (ORDER BY salary DESC) AS rank FROM Employees;",
xp:45
},

{
id:191,
difficulty:"Advanced",
topic:"WINDOW FUNCTIONS",
title:"DENSE_RANK",
prompt:"Dense-rank employees by salary descending. No gaps in ranking after ties.",
hint:"DENSE_RANK() OVER (ORDER BY salary DESC) — like RANK but without gaps. If two share rank 2, the next is 3 (not 4).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank FROM Employees;",
xp:45
},

{
id:192,
difficulty:"Advanced",
topic:"WINDOW FUNCTIONS",
title:"PARTITION BY",
prompt:"Number employees within each department by salary descending (reset numbering per department).",
hint:"PARTITION BY creates groups within windows: ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, department_id, salary, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank FROM Employees;",
xp:50
},

{
id:193,
difficulty:"Advanced",
topic:"WINDOW FUNCTIONS",
title:"Running Total",
prompt:"Show payments ordered by date with a running total of amounts.",
hint:"SUM(amount) OVER (ORDER BY payment_date) computes a cumulative sum — each row includes all previous amounts.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT id, payment_date, amount, SUM(amount) OVER (ORDER BY payment_date) AS running_total FROM Payments;",
xp:50
},

{
id:194,
difficulty:"Advanced",
topic:"WINDOW FUNCTIONS",
title:"LAG Function",
prompt:"Show each employee's name, salary, and the previous employee's salary (ordered by id, defaulting to 0 for the first row) as 'prev_salary'.",
hint:"LAG(column, offset, default) OVER (ORDER BY ...) accesses a previous row's value. LAG(salary, 1, 0) gets the prior row's salary and returns 0 for the first row.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, salary, LAG(salary, 1, 0) OVER (ORDER BY id) AS prev_salary FROM Employees;",
strictColumns:true,
xp:50
},

{
id:195,
difficulty:"Advanced",
topic:"WINDOW FUNCTIONS",
title:"LEAD Function",
prompt:"Show each payment's id, amount, and the next payment amount (ordered by payment_date, defaulting to 0 for the last row) as 'next_amount'.",
hint:"LEAD(column, 1, 0) OVER (ORDER BY ...) looks ahead to the next row and returns 0 for the last row.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT id, amount, LEAD(amount, 1, 0) OVER (ORDER BY payment_date) AS next_amount FROM Payments;",
strictColumns:true,
xp:50
},

{
id:196,
difficulty:"Advanced",
topic:"WINDOW FUNCTIONS",
title:"NTILE",
prompt:"Divide employees into 4 equal quartile groups by salary.",
hint:"NTILE(n) OVER (ORDER BY column) divides rows into n roughly equal groups numbered 1 to n.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, salary, NTILE(4) OVER (ORDER BY salary) AS quartile FROM Employees;",
xp:50
},

{
id:197,
difficulty:"Advanced",
topic:"WINDOW FUNCTIONS",
title:"AVG OVER Partition",
prompt:"Show each employee with their department's average salary alongside their own salary.",
hint:"AVG(salary) OVER (PARTITION BY department_id) computes the average per department without collapsing rows.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, department_id, salary, AVG(salary) OVER (PARTITION BY department_id) AS dept_avg FROM Employees;",
xp:50
},

{
id:198,
difficulty:"Advanced",
topic:"WINDOW FUNCTIONS",
title:"COUNT OVER",
prompt:"Show each sale with the total number of sales in its region.",
hint:"COUNT(*) OVER (PARTITION BY region) counts rows per partition without grouping. Every row gets the regional count.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT id, product_id, region, COUNT(*) OVER (PARTITION BY region) AS region_sales_count FROM SalesLog;",
xp:50
},

{
id:199,
difficulty:"Advanced",
topic:"WINDOW FUNCTIONS",
title:"Cumulative Sum by Department",
prompt:"Show employees ordered by department and salary, with a cumulative salary sum within each department.",
hint:"SUM(salary) OVER (PARTITION BY department_id ORDER BY salary) gives a running total within each department group.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, department_id, salary, SUM(salary) OVER (PARTITION BY department_id ORDER BY salary) AS cumulative_salary FROM Employees;",
xp:55
},

{
id:200,
difficulty:"Advanced",
topic:"WINDOW FUNCTIONS",
title:"Difference from Previous",
prompt:"Show each payment's id, payment_date, amount, and the difference from the previous payment (ordered by payment_date, defaulting to 0 for the first payment).",
hint:"Subtract LAG(amount, 1, amount) OVER (ORDER BY payment_date) from amount so the first row yields 0.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT id, payment_date, amount, amount - LAG(amount, 1, amount) OVER (ORDER BY payment_date) AS diff FROM Payments;",
xp:55
},

/* ----- CTEs ----- */

{
id:201,
difficulty:"Advanced",
topic:"CTE",
title:"Basic CTE",
prompt:"Using a CTE named 'high_earners', find employees with salary > 70000, then select their names.",
hint:"WITH cte_name AS (SELECT ...) SELECT ... FROM cte_name; — the CTE is like a temporary named result set.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH high_earners AS (SELECT * FROM Employees WHERE salary > 70000) SELECT name FROM high_earners;",
xp:40
},

{
id:202,
difficulty:"Advanced",
topic:"CTE",
title:"CTE with Aggregation",
prompt:"Create a CTE showing total payments per customer, then find customers (customer_id and total) who paid more than 500 total.",
hint:"Define WITH cte_name AS (SELECT customer_id, SUM(amount) AS total FROM Payments GROUP BY customer_id) and then filter the CTE in the outer WHERE clause.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH totals AS (SELECT customer_id, SUM(amount) AS total FROM Payments GROUP BY customer_id) SELECT * FROM totals WHERE total > 500;",
xp:45
},

{
id:203,
difficulty:"Advanced",
topic:"CTE",
title:"Multiple CTEs",
prompt:"Create two CTEs: 'dept_counts' (employees per department) and 'dept_salaries' (avg salary per department). Join them to show department_id, count, and avg salary.",
hint:"Separate multiple CTEs with commas: WITH cte1 AS (...), cte2 AS (...) SELECT ... FROM cte1 JOIN cte2 ON ...",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH dept_counts AS (SELECT department_id, COUNT(*) AS cnt FROM Employees GROUP BY department_id), dept_salaries AS (SELECT department_id, AVG(salary) AS avg_sal FROM Employees GROUP BY department_id) SELECT dc.department_id, dc.cnt, ds.avg_sal FROM dept_counts dc JOIN dept_salaries ds ON dc.department_id = ds.department_id;",
xp:55
},

{
id:204,
difficulty:"Advanced",
topic:"CTE",
title:"CTE for Readability",
prompt:"Using a CTE, find distinct product names ordered by customers from Germany.",
hint:"Start with a CTE selecting customer IDs where country = 'Germany', then JOIN that CTE with Orders and Products and select DISTINCT product names.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH german_customers AS (SELECT id FROM Customers WHERE country = 'Germany') SELECT DISTINCT p.name FROM Orders o JOIN german_customers gc ON o.customer_id = gc.id JOIN Products p ON o.product_id = p.id;",
xp:45
},

{
id:205,
difficulty:"Advanced",
topic:"CTE",
title:"CTE with Window",
prompt:"Using a CTE, rank employees by salary descending, then select the name and salary of only the top 3.",
hint:"Assign ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn inside a CTE, then SELECT name, salary FROM the CTE WHERE rn <= 3.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH ranked AS (SELECT name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn FROM Employees) SELECT name, salary FROM ranked WHERE rn <= 3;",
xp:50
},

{
id:206,
difficulty:"Advanced",
topic:"CTE",
title:"CTE Chain",
prompt:"Using CTEs: first get sales totals per product, then join with Products to get names, then filter for total > 20.",
hint:"Chain CTEs: WITH sales AS (...), named_sales AS (SELECT p.name, s.total FROM sales s JOIN Products p ON ...) SELECT * FROM named_sales WHERE total > 20;",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH sales AS (SELECT product_id, SUM(quantity_sold) AS total FROM SalesLog GROUP BY product_id), named_sales AS (SELECT p.name, s.total FROM sales s JOIN Products p ON s.product_id = p.id) SELECT * FROM named_sales WHERE total > 20;",
xp:55
},

{
id:207,
difficulty:"Advanced",
topic:"CTE",
title:"CTE with INSERT",
prompt:"Create a CTE of employees earning over 80000, then count them.",
hint:"WITH ... AS (...) SELECT COUNT(*) FROM cte_name; — CTEs work with any DML, not just SELECT.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH top_earners AS (SELECT * FROM Employees WHERE salary > 80000) SELECT COUNT(*) AS count FROM top_earners;",
xp:45
},

{
id:208,
difficulty:"Advanced",
topic:"CTE",
title:"CTE vs Subquery",
prompt:"Rewrite this subquery as a CTE: SELECT * FROM (SELECT department_id, AVG(salary) AS avg_sal FROM Employees GROUP BY department_id) WHERE avg_sal > 60000.",
hint:"Move the subquery into a WITH clause: WITH dept_avg AS (SELECT ...) SELECT * FROM dept_avg WHERE avg_sal > 60000;",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH dept_avg AS (SELECT department_id, AVG(salary) AS avg_sal FROM Employees GROUP BY department_id) SELECT * FROM dept_avg WHERE avg_sal > 60000;",
xp:45
},

/* ----- COMPLEX JOINs ----- */

{
id:209,
difficulty:"Advanced",
topic:"COMPLEX JOIN",
title:"CROSS JOIN",
prompt:"Generate all possible combinations of department names and project names.",
hint:"CROSS JOIN produces a Cartesian product — every row from table A paired with every row from table B. No ON clause needed.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT d.name AS department, p.name AS project FROM Departments d CROSS JOIN Projects p;",
xp:40
},

{
id:210,
difficulty:"Advanced",
topic:"COMPLEX JOIN",
title:"Anti-Join Pattern",
prompt:"Find departments with no employees using a LEFT JOIN pattern.",
hint:"LEFT JOIN + WHERE IS NULL finds unmatched rows: FROM Departments d LEFT JOIN Employees e ON d.id = e.department_id WHERE e.id IS NULL",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT d.name FROM Departments d LEFT JOIN Employees e ON d.id = e.department_id WHERE e.id IS NULL;",
xp:45
},

{
id:211,
difficulty:"Advanced",
topic:"COMPLEX JOIN",
title:"Multi-Condition Join",
prompt:"Show inventory items where the supplier is from the same country as any customer who ordered that product.",
hint:"Join with multiple conditions: JOIN on product relationship AND country matching using subqueries or additional JOINs.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT DISTINCT p.name, s.name AS supplier, s.country FROM Inventory i JOIN Products p ON i.product_id = p.id JOIN Suppliers s ON i.supplier_id = s.id JOIN Orders o ON o.product_id = p.id JOIN Customers c ON o.customer_id = c.id WHERE s.country = c.country;",
xp:60
},

{
id:212,
difficulty:"Advanced",
topic:"COMPLEX JOIN",
title:"Self-Join for Comparison",
prompt:"Find pairs of employees in the same department (show both names and department_id). Avoid duplicate pairs.",
hint:"Self-join with inequality: FROM Employees e1 JOIN Employees e2 ON e1.department_id = e2.department_id AND e1.id < e2.id",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT e1.name, e2.name, e1.department_id FROM Employees e1 JOIN Employees e2 ON e1.department_id = e2.department_id AND e1.id < e2.id WHERE e1.department_id IS NOT NULL;",
xp:55
},

{
id:213,
difficulty:"Advanced",
topic:"COMPLEX JOIN",
title:"ANY/ALL Concept",
prompt:"Find employees whose salary is greater than ALL salaries in department 2.",
hint:"SQLite doesn't support ALL directly. Emulate with: WHERE salary > (SELECT MAX(salary) FROM Employees WHERE department_id = 2)",
note:"The ALL keyword (e.g., WHERE salary > ALL(subquery)) is supported in PostgreSQL/MySQL. SQLite uses MAX/MIN equivalents.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, salary FROM Employees WHERE salary > (SELECT MAX(salary) FROM Employees WHERE department_id = 2);",
xp:50
},

{
id:214,
difficulty:"Advanced",
topic:"COMPLEX JOIN",
title:"SELECT INTO Concept",
prompt:"Create a backup of the Departments table called 'DepartmentsBackup'.",
hint:"SELECT INTO creates a new table from a query result. In SQLite, use CREATE TABLE ... AS SELECT.",
note:"SELECT INTO is supported in SQL Server/PostgreSQL. SQLite uses CREATE TABLE AS SELECT instead.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TABLE DepartmentsBackup AS SELECT * FROM Departments;",
validationType:"ddl",
verificationQuery:"SELECT * FROM DepartmentsBackup ORDER BY id;",
xp:45
},

/* ----- DDL ----- */

{
id:215,
difficulty:"Advanced",
topic:"DDL",
title:"Create Table",
prompt:"Create a table called 'Reviews' with columns: id (INTEGER PRIMARY KEY), product_id (INTEGER), rating (INTEGER), comment (TEXT).",
hint:"CREATE TABLE name (col1 type constraint, col2 type, ...); — PRIMARY KEY ensures unique IDs.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TABLE Reviews (id INTEGER PRIMARY KEY, product_id INTEGER, rating INTEGER, comment TEXT);",
validationType:"ddl",
expectedSchema:{tableName:"Reviews", columns:["id","product_id","rating","comment"]},
xp:40
},

{
id:216,
difficulty:"Advanced",
topic:"DDL",
title:"Create with NOT NULL",
prompt:"Create a table 'Tags' with columns: id (INTEGER PRIMARY KEY), name (TEXT NOT NULL), color (TEXT DEFAULT '#000000').",
hint:"NOT NULL prevents NULL values. DEFAULT provides a value when none is specified during INSERT.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TABLE Tags (id INTEGER PRIMARY KEY, name TEXT NOT NULL, color TEXT DEFAULT '#000000');",
validationType:"ddl",
expectedSchema:{tableName:"Tags", columns:["id","name","color"]},
xp:45
},

{
id:217,
difficulty:"Advanced",
topic:"DDL",
title:"ALTER TABLE",
prompt:"Add a column 'discount' (INTEGER DEFAULT 0) to the Products table.",
hint:"ALTER TABLE table_name ADD COLUMN col_name type constraints; — adds a new column to an existing table.",
starterCode:"-- Write your SQL here",
expectedQuery:"ALTER TABLE Products ADD COLUMN discount INTEGER DEFAULT 0;",
validationType:"ddl",
verificationQuery:"PRAGMA table_info(Products);",
xp:40
},

{
id:218,
difficulty:"Advanced",
topic:"DDL",
title:"DROP TABLE",
prompt:"Drop (delete) the EmployeeHistory table.",
hint:"DROP TABLE table_name; permanently removes the table and all its data. Use IF EXISTS to avoid errors.",
starterCode:"-- Write your SQL here",
expectedQuery:"DROP TABLE IF EXISTS EmployeeHistory;",
validationType:"ddl",
verificationQuery:"SELECT name FROM sqlite_master WHERE type='table' AND name='EmployeeHistory';",
xp:35
},

{
id:219,
difficulty:"Advanced",
topic:"DDL",
title:"Create Index",
prompt:"Create an index called 'idx_emp_salary' on the salary column of Employees.",
hint:"CREATE INDEX index_name ON table(column); — indexes speed up queries that filter or sort by that column.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE INDEX idx_emp_salary ON Employees(salary);",
validationType:"ddl",
verificationQuery:"SELECT name FROM sqlite_master WHERE type='index' AND name='idx_emp_salary';",
xp:40
},

{
id:220,
difficulty:"Advanced",
topic:"DDL",
title:"Create with CHECK",
prompt:"Create a table 'Ratings' with: id (INTEGER PK), score (INTEGER CHECK score between 1 and 5), reviewer (TEXT).",
hint:"CHECK constraint enforces data validity: CHECK (score >= 1 AND score <= 5) prevents invalid scores.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TABLE Ratings (id INTEGER PRIMARY KEY, score INTEGER CHECK (score >= 1 AND score <= 5), reviewer TEXT);",
validationType:"ddl",
expectedSchema:{tableName:"Ratings", columns:["id","score","reviewer"]},
xp:45
},

{
id:221,
difficulty:"Advanced",
topic:"DDL",
title:"Create with UNIQUE",
prompt:"Create a table 'Usernames' with: id (INTEGER PK), username (TEXT UNIQUE NOT NULL), email (TEXT UNIQUE).",
hint:"UNIQUE constraint prevents duplicate values. You can have multiple UNIQUE columns in one table.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TABLE Usernames (id INTEGER PRIMARY KEY, username TEXT UNIQUE NOT NULL, email TEXT UNIQUE);",
validationType:"ddl",
expectedSchema:{tableName:"Usernames", columns:["id","username","email"]},
xp:45
},

{
id:222,
difficulty:"Advanced",
topic:"DDL",
title:"Composite Primary Key",
prompt:"Create a table 'CourseEnrollments' with student_id (INTEGER), course_id (INTEGER), and enrollment_date (TEXT), with a composite primary key on (student_id, course_id).",
hint:"Composite PK uses table-level constraint: PRIMARY KEY (col1, col2). This ensures no duplicate student-course pairs.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TABLE CourseEnrollments (student_id INTEGER, course_id INTEGER, enrollment_date TEXT, PRIMARY KEY (student_id, course_id));",
validationType:"ddl",
expectedSchema:{tableName:"CourseEnrollments", columns:["student_id","course_id","enrollment_date"]},
xp:50
},

/* ----- VIEWS ----- */

{
id:223,
difficulty:"Advanced",
topic:"VIEW",
title:"Create View",
prompt:"Create a view 'HighEarners' showing name and salary of employees earning over 70000.",
hint:"CREATE VIEW name AS SELECT ...; — a view is a stored query. It acts like a virtual table.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE VIEW HighEarners AS SELECT name, salary FROM Employees WHERE salary > 70000;",
validationType:"ddl",
verificationQuery:"SELECT * FROM HighEarners;",
xp:45
},

{
id:224,
difficulty:"Advanced",
topic:"VIEW",
title:"Query a View",
prompt:"Create a view 'ProductSummary' showing product name and category name (via JOIN), then SELECT all from it.",
hint:"First define CREATE VIEW ProductSummary AS SELECT ... JOIN Categories ..., then query it with SELECT * FROM ProductSummary;",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE VIEW ProductSummary AS SELECT p.name AS product, c.name AS category FROM Products p JOIN Categories c ON p.category_id = c.id; SELECT * FROM ProductSummary;",
validationType:"ddl",
verificationQuery:"SELECT * FROM ProductSummary;",
xp:50
},

{
id:225,
difficulty:"Advanced",
topic:"VIEW",
title:"Drop View",
prompt:"The view 'HighEarners' has been pre-created for this exercise. Drop it using DROP VIEW.",
hint:"DROP VIEW IF EXISTS view_name; removes a view safely without error if it doesn't exist.",
setupSQL:"CREATE VIEW HighEarners AS SELECT name FROM Employees WHERE salary > 70000;",
starterCode:"-- Write your SQL here",
expectedQuery:"DROP VIEW IF EXISTS HighEarners;",
validationType:"ddl",
verificationQuery:"SELECT name FROM sqlite_master WHERE type='view' AND name='HighEarners';",
xp:40
},

{
id:226,
difficulty:"Advanced",
topic:"VIEW",
title:"View with Aggregation",
prompt:"Create a view 'DeptStats' showing each department_id, employee count, and average salary.",
hint:"Define CREATE VIEW DeptStats AS SELECT ... using COUNT(*), AVG(salary), and GROUP BY department_id.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE VIEW DeptStats AS SELECT department_id, COUNT(*) AS cnt, AVG(salary) AS avg_sal FROM Employees GROUP BY department_id;",
validationType:"ddl",
verificationQuery:"SELECT * FROM DeptStats;",
xp:50
},

{
id:227,
difficulty:"Advanced",
topic:"VIEW",
title:"Updatable View Concept",
prompt:"Create a simple view 'SalesEmployees' containing all columns of employees in department 2.",
hint:"Use CREATE VIEW view_name AS SELECT * FROM Employees with a WHERE filter for department_id = 2.",
note:"PostgreSQL / Cross-Dialect Note: Simple single-table views without aggregation are automatically updatable in PostgreSQL/MySQL (you can INSERT/UPDATE/DELETE through them). SQLite requires INSTEAD OF triggers for updatable views.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE VIEW SalesEmployees AS SELECT * FROM Employees WHERE department_id = 2;",
validationType:"ddl",
verificationQuery:"SELECT * FROM SalesEmployees;",
xp:45
},

/* ----- COALESCE/NULLIF ----- */

{
id:228,
difficulty:"Advanced",
topic:"NULL FUNCTIONS",
title:"NULLIF",
prompt:"Show product names and NULLIF(in_stock, 0) — returns NULL when in_stock is 0, otherwise returns in_stock.",
hint:"NULLIF(a, b) returns NULL if a = b, otherwise returns a. Useful for avoiding division by zero.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, NULLIF(in_stock, 0) AS stock_or_null FROM Products;",
xp:45
},

{
id:229,
difficulty:"Advanced",
topic:"NULL FUNCTIONS",
title:"IFNULL",
prompt:"Show employee names and IFNULL(department_id, 999) to replace NULL departments with 999.",
hint:"IFNULL(value, default) is SQLite-specific: returns value if not NULL, otherwise default. Similar to COALESCE with 2 args.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, IFNULL(department_id, 999) AS dept FROM Employees;",
xp:40
},

{
id:230,
difficulty:"Advanced",
topic:"NULL FUNCTIONS",
title:"COALESCE Chain",
prompt:"Show customer name and COALESCE(age, 0) + 10 as 'age_plus_ten'. Handle NULLs by defaulting age to 0.",
hint:"COALESCE handles NULLs before arithmetic. Without it, NULL + 10 = NULL. COALESCE(age, 0) + 10 always gives a number.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, COALESCE(age, 0) + 10 AS age_plus_ten FROM Customers;",
xp:45
},

{
id:231,
difficulty:"Advanced",
topic:"NULL FUNCTIONS",
title:"NULLIF to Avoid Division by Zero",
prompt:"Show each product's name and price divided by NULLIF(in_stock, 0). Products out of stock should show NULL instead of an error.",
hint:"NULLIF(in_stock, 0) returns NULL when in_stock is 0. Division by NULL gives NULL rather than a division-by-zero error.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, price * 1.0 / NULLIF(in_stock, 0) AS price_per_stock FROM Products;",
xp:50
},

/* ----- TYPE HANDLING ----- */

{
id:232,
difficulty:"Advanced",
topic:"TYPE HANDLING",
title:"Mixed Types",
prompt:"Show TYPEOF for various values: 42, 3.14, 'hello', NULL, X'0102'.",
hint:"SQLite has 5 storage classes: integer, real, text, null, and blob. Pass each literal value to TYPEOF(...) in a single SELECT.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT TYPEOF(42) AS int_type, TYPEOF(3.14) AS real_type, TYPEOF('hello') AS text_type, TYPEOF(NULL) AS null_type, TYPEOF(X'0102') AS blob_type;",
xp:40
},

{
id:233,
difficulty:"Advanced",
topic:"TYPE HANDLING",
title:"CAST Division",
prompt:"Show each employee's name and salary divided by 12 as a REAL (monthly salary with decimals).",
hint:"Integer division truncates: 75000/12=6250. Use CAST(salary AS REAL)/12 or salary*1.0/12 to get decimals.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, CAST(salary AS REAL) / 12 AS monthly_salary FROM Employees;",
xp:45
},

{
id:234,
difficulty:"Advanced",
topic:"TYPE HANDLING",
title:"String to Number",
prompt:"Select CAST('12345' AS INTEGER) + 1 as 'result'.",
hint:"CAST converts between types: CAST('12345' AS INTEGER) turns the text string into the number 12345.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT CAST('12345' AS INTEGER) + 1 AS result;",
xp:40
},

{
id:235,
difficulty:"Advanced",
topic:"TYPE HANDLING",
title:"Implicit Coercion",
prompt:"Show what happens when you add text '5' and integer 3 in SQLite: SELECT '5' + 3.",
hint:"SQLite implicitly converts text to numbers when used in arithmetic. '5' + 3 = 8. This is unique to SQLite's flexible typing.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT '5' + 3 AS result;",
xp:40
},

/* ----- GRANT/REVOKE Concept ----- */

{
id:236,
difficulty:"Advanced",
topic:"PERMISSIONS",
title:"GRANT Concept",
prompt:"Write a PostgreSQL/MySQL GRANT statement to give SELECT permission on the Employees table to role/user 'analyst'.",
hint:"Standard SQL access control follows the pattern: GRANT <privilege> ON <table> TO <role_or_user>;",
note:"PostgreSQL / MySQL Exercise: GRANT/REVOKE are server-level access control commands in PostgreSQL, MySQL, and SQL Server (not executed in SQLite). Your syntax is validated directly against PostgreSQL/MySQL rules.",
starterCode:"-- PostgreSQL / MySQL syntax exercise\n-- Write the GRANT statement below",
validationType:"conceptual",
referenceSQL:"GRANT SELECT ON Employees TO analyst;",
conceptualPatterns:[
    { regex:/^\s*GRANT\b/i, message:"Start your statement with the GRANT keyword." },
    { regex:/\bGRANT\s+SELECT\b/i, message:"Specify the SELECT privilege after GRANT." },
    { regex:/\bON\s+(?:TABLE\s+)?["'`]?Employees["'`]?\b/i, message:"Specify the target table using ON Employees." },
    { regex:/\bTO\s+["'`]?analyst["'`]?\b/i, message:"Specify the recipient role/user using TO analyst." }
],
xp:40
},

/* ----- Stored Procedure Concept ----- */

{
id:237,
difficulty:"Advanced",
topic:"STORED PROCEDURES",
title:"Procedure Concept",
prompt:"Write a PostgreSQL/MySQL stored procedure (CREATE PROCEDURE or CREATE FUNCTION) named 'GiveRaise' that takes a percentage parameter and updates Employees.salary accordingly.",
hint:"In PostgreSQL: CREATE PROCEDURE GiveRaise(pct NUMERIC) LANGUAGE SQL AS $$ UPDATE Employees SET salary = ...; $$; (MySQL BEGIN ... END syntax is also accepted).",
note:"PostgreSQL / MySQL Exercise: Stored procedures (CREATE PROCEDURE / CREATE FUNCTION) run server-side in PostgreSQL, MySQL, and SQL Server (not supported in SQLite). Your syntax is validated directly against PostgreSQL/MySQL rules.",
starterCode:"-- PostgreSQL / MySQL syntax exercise\n-- Write CREATE PROCEDURE (or CREATE FUNCTION) below",
validationType:"conceptual",
referenceSQL:"CREATE PROCEDURE GiveRaise(pct NUMERIC) LANGUAGE SQL AS $$ UPDATE Employees SET salary = salary * (1 + pct / 100.0); $$;",
conceptualPatterns:[
    { regex:/\bCREATE\s+(?:OR\s+REPLACE\s+)?(?:PROCEDURE|FUNCTION)\s+["'`]?GiveRaise["'`]?\s*\([^)]+\)/i, message:"Define CREATE PROCEDURE GiveRaise(param ...) or CREATE FUNCTION GiveRaise(param ...)." },
    { regex:/\bUPDATE\s+["'`]?Employees["'`]?\b/i, message:"Include an UPDATE Employees statement in the procedure body." },
    { regex:/\bSET\s+salary\s*=/i, message:"Update the salary column using SET salary = ..." }
],
xp:40
},

/* ----- More DDL ----- */

{
id:238,
difficulty:"Advanced",
topic:"DDL",
title:"Rename Table",
prompt:"Rename the Assignments table to 'ProjectAssignments'.",
hint:"ALTER TABLE old_name RENAME TO new_name; — changes the table name without affecting its data or structure.",
starterCode:"-- Write your SQL here",
expectedQuery:"ALTER TABLE Assignments RENAME TO ProjectAssignments;",
validationType:"ddl",
verificationQuery:"SELECT name FROM sqlite_master WHERE type='table' AND name='ProjectAssignments';",
xp:40
},

{
id:239,
difficulty:"Advanced",
topic:"DDL",
title:"Create Table As Select",
prompt:"Create a table 'TopProducts' containing products with price > 100.",
hint:"CREATE TABLE new_table AS SELECT ... creates a table from query results, copying both structure and data.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TABLE TopProducts AS SELECT * FROM Products WHERE price > 100;",
validationType:"ddl",
verificationQuery:"SELECT * FROM TopProducts ORDER BY id;",
xp:45
},

{
id:240,
difficulty:"Advanced",
topic:"DDL",
title:"Unique Index",
prompt:"Create a unique index 'idx_cust_email' on the email column of Customers.",
hint:"CREATE UNIQUE INDEX name ON table(column); — ensures no two rows can have the same value in the indexed column.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE UNIQUE INDEX idx_cust_email ON Customers(email);",
validationType:"ddl",
verificationQuery:"SELECT name FROM sqlite_master WHERE type='index' AND name='idx_cust_email';",
xp:45
}

];
window.Exercises = (window.Exercises || []).concat(exercises);
})();
