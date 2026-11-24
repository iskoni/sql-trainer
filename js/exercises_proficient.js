/* ==========================
   PROFICIENT EXERCISES
   ========================== */

(function(){
var exercises = [

/* ----- RECURSIVE CTEs ----- */

{
id:241,
difficulty:"Proficient",
topic:"RECURSIVE CTE",
title:"Generate Number Series",
prompt:"Generate a series of numbers from 1 to 10 using a recursive CTE.",
hint:"WITH RECURSIVE cte(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM cte WHERE n < 10) — the base case starts at 1, recursion adds 1 each time.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH RECURSIVE nums(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM nums WHERE n < 10) SELECT n FROM nums;",
xp:60
},

{
id:242,
difficulty:"Proficient",
topic:"RECURSIVE CTE",
title:"Org Chart",
prompt:"Show the organizational hierarchy: each employee's name, their level (1 for top managers, 2 for their reports, etc.).",
hint:"Start with employees where manager_id IS NULL (level 1), then recursively join to find their reports at level+1.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH RECURSIVE org(id, name, level) AS (SELECT id, name, 1 FROM Employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, o.level + 1 FROM Employees e JOIN org o ON e.manager_id = o.id) SELECT name, level FROM org ORDER BY level, name;",
xp:70
},

{
id:243,
difficulty:"Proficient",
topic:"RECURSIVE CTE",
title:"Fibonacci Sequence",
prompt:"Generate the first 10 Fibonacci numbers using a recursive CTE.",
hint:"WITH RECURSIVE fib(n, a, b) AS (SELECT 1, 0, 1 UNION ALL SELECT n+1, b, a+b FROM fib WHERE n < 10) — carry two values forward.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH RECURSIVE fib(n, a, b) AS (SELECT 1, 0, 1 UNION ALL SELECT n + 1, b, a + b FROM fib WHERE n < 10) SELECT n, a AS fib_number FROM fib;",
xp:70
},

{
id:244,
difficulty:"Proficient",
topic:"RECURSIVE CTE",
title:"Cumulative Budget",
prompt:"Using a recursive CTE, compute cumulative project budgets when ordered by id.",
hint:"Start with first project, recursively add next project's budget: accumulates total budget progressively.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH RECURSIVE cum(id, name, budget, running_total) AS (SELECT id, name, budget, budget FROM Projects WHERE id = 1 UNION ALL SELECT p.id, p.name, p.budget, cum.running_total + p.budget FROM Projects p JOIN cum ON p.id = cum.id + 1) SELECT id, name, budget, running_total FROM cum;",
xp:75
},

{
id:245,
difficulty:"Proficient",
topic:"RECURSIVE CTE",
title:"Date Range Generator",
prompt:"Generate all dates from '2024-01-01' to '2024-01-10'.",
hint:"WITH RECURSIVE dates(d) AS (SELECT '2024-01-01' UNION ALL SELECT DATE(d, '+1 day') FROM dates WHERE d < '2024-01-10') — DATE with modifier adds days.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH RECURSIVE dates(d) AS (SELECT '2024-01-01' UNION ALL SELECT DATE(d, '+1 day') FROM dates WHERE d < '2024-01-10') SELECT d FROM dates;",
xp:65
},

{
id:246,
difficulty:"Proficient",
topic:"RECURSIVE CTE",
title:"Power of 2",
prompt:"Generate powers of 2 from 2^0 to 2^10 using a recursive CTE.",
hint:"WITH RECURSIVE powers(n, val) AS (SELECT 0, 1 UNION ALL SELECT n+1, val*2 FROM powers WHERE n < 10) — doubles the value each step.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH RECURSIVE powers(n, val) AS (SELECT 0, 1 UNION ALL SELECT n + 1, val * 2 FROM powers WHERE n < 10) SELECT n, val FROM powers;",
xp:60
},

/* ----- ADVANCED WINDOW FUNCTIONS ----- */

{
id:247,
difficulty:"Proficient",
topic:"WINDOW FUNCTIONS",
title:"ROWS BETWEEN Frame",
prompt:"Show each payment's id, payment_date, amount, and a 3-row moving average of payment amounts (current row and 2 preceding, ordered by payment_date), rounded to 2 decimal places.",
hint:"Use ROWS BETWEEN to define the window frame and wrap in ROUND(..., 2): ROUND(AVG(amount) OVER (ORDER BY payment_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT id, payment_date, amount, ROUND(AVG(amount) OVER (ORDER BY payment_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg FROM Payments;",
xp:70
},

{
id:248,
difficulty:"Proficient",
topic:"WINDOW FUNCTIONS",
title:"FIRST_VALUE",
prompt:"For each employee, show their name, salary, department_id, and the name of the highest-paid employee in their department.",
hint:"FIRST_VALUE(name) OVER (PARTITION BY department_id ORDER BY salary DESC) returns the name of the top earner per department.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, salary, department_id, FIRST_VALUE(name) OVER (PARTITION BY department_id ORDER BY salary DESC) AS top_earner FROM Employees;",
xp:65
},

{
id:249,
difficulty:"Proficient",
topic:"WINDOW FUNCTIONS",
title:"LAST_VALUE with Frame",
prompt:"Show each employee's name, salary, department_id, and the name of the lowest-paid employee in their department using LAST_VALUE.",
hint:"LAST_VALUE needs explicit frame: LAST_VALUE(name) OVER (PARTITION BY department_id ORDER BY salary DESC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, salary, department_id, LAST_VALUE(name) OVER (PARTITION BY department_id ORDER BY salary DESC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS lowest_earner FROM Employees;",
xp:70
},

{
id:250,
difficulty:"Proficient",
topic:"WINDOW FUNCTIONS",
title:"PERCENT_RANK",
prompt:"Show each employee's name, salary, and salary percentile rank within the company (rounded to 2 decimal places).",
hint:"ROUND(PERCENT_RANK() OVER (ORDER BY salary), 2) returns a value between 0 and 1 representing relative position.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, salary, ROUND(PERCENT_RANK() OVER (ORDER BY salary), 2) AS percentile FROM Employees;",
xp:65
},

{
id:251,
difficulty:"Proficient",
topic:"WINDOW FUNCTIONS",
title:"CUME_DIST",
prompt:"Show each product's name, price, and cumulative distribution (fraction of products with price <= this price, rounded to 2 decimal places).",
hint:"ROUND(CUME_DIST() OVER (ORDER BY price), 2) = fraction of rows with value <= current row's value.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, price, ROUND(CUME_DIST() OVER (ORDER BY price), 2) AS cum_dist FROM Products;",
xp:65
},

{
id:252,
difficulty:"Proficient",
topic:"WINDOW FUNCTIONS",
title:"Running Sum with Reset",
prompt:"Show region, sale_date, quantity_sold, and a running total of quantity_sold per region, ordered by sale_date.",
hint:"SUM() OVER (PARTITION BY region ORDER BY sale_date) — PARTITION BY resets the running total for each region.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT region, sale_date, quantity_sold, SUM(quantity_sold) OVER (PARTITION BY region ORDER BY sale_date) AS running_total FROM SalesLog;",
xp:65
},

{
id:253,
difficulty:"Proficient",
topic:"WINDOW FUNCTIONS",
title:"NTH_VALUE",
prompt:"Show each employee's name, salary, department_id, and the 3rd highest salary in their department.",
hint:"NTH_VALUE(salary, 3) OVER (PARTITION BY department_id ORDER BY salary DESC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) — returns the 3rd value in the window.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, salary, department_id, NTH_VALUE(salary, 3) OVER (PARTITION BY department_id ORDER BY salary DESC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS third_highest FROM Employees;",
xp:70
},

{
id:254,
difficulty:"Proficient",
topic:"WINDOW FUNCTIONS",
title:"Gap Detection",
prompt:"Find gaps in order IDs: show each order id and whether the next id is sequential (next_id - id should be 1).",
hint:"Use LEAD to look ahead: LEAD(id, 1) OVER (ORDER BY id) - id shows 1 for sequential, >1 for gaps.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT id, LEAD(id, 1) OVER (ORDER BY id) AS next_id, LEAD(id, 1) OVER (ORDER BY id) - id AS gap FROM Orders;",
xp:65
},

/* ----- PIVOTING ----- */

{
id:255,
difficulty:"Proficient",
topic:"PIVOT",
title:"Sales by Region Pivot",
prompt:"Pivot SalesLog to show total quantity_sold for each region as separate columns (Europe, Americas, Asia).",
hint:"Use conditional aggregation: SUM(CASE WHEN region = 'Europe' THEN quantity_sold ELSE 0 END) AS europe — one CASE per column.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT SUM(CASE WHEN region = 'Europe' THEN quantity_sold ELSE 0 END) AS europe, SUM(CASE WHEN region = 'Americas' THEN quantity_sold ELSE 0 END) AS americas, SUM(CASE WHEN region = 'Asia' THEN quantity_sold ELSE 0 END) AS asia FROM SalesLog;",
xp:65
},

{
id:256,
difficulty:"Proficient",
topic:"PIVOT",
title:"Payment Methods Pivot",
prompt:"Show each customer's total payments pivoted by method (Credit Card, PayPal, Debit Card columns).",
hint:"GROUP BY customer_id with SUM(CASE WHEN method = '...' THEN amount ELSE 0 END) for each payment method column.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT customer_id, SUM(CASE WHEN method = 'Credit Card' THEN amount ELSE 0 END) AS credit_card, SUM(CASE WHEN method = 'PayPal' THEN amount ELSE 0 END) AS paypal, SUM(CASE WHEN method = 'Debit Card' THEN amount ELSE 0 END) AS debit_card FROM Payments GROUP BY customer_id;",
xp:70
},

{
id:257,
difficulty:"Proficient",
topic:"PIVOT",
title:"Monthly Sales Pivot",
prompt:"Pivot SalesLog to show total quantity_sold per product for each month (Jan, Feb, Mar, Apr, May).",
hint:"GROUP BY product_id, then SUM(CASE WHEN STRFTIME('%m', sale_date) = '01' THEN quantity_sold ELSE 0 END) AS jan",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT product_id, SUM(CASE WHEN STRFTIME('%m', sale_date) = '01' THEN quantity_sold ELSE 0 END) AS jan, SUM(CASE WHEN STRFTIME('%m', sale_date) = '02' THEN quantity_sold ELSE 0 END) AS feb, SUM(CASE WHEN STRFTIME('%m', sale_date) = '03' THEN quantity_sold ELSE 0 END) AS mar, SUM(CASE WHEN STRFTIME('%m', sale_date) = '04' THEN quantity_sold ELSE 0 END) AS apr, SUM(CASE WHEN STRFTIME('%m', sale_date) = '05' THEN quantity_sold ELSE 0 END) AS may FROM SalesLog GROUP BY product_id;",
xp:75
},

{
id:258,
difficulty:"Proficient",
topic:"PIVOT",
title:"Department Salary Ranges",
prompt:"Show each department's count of employees in salary ranges: <50K, 50K-75K, >75K as separate columns.",
hint:"GROUP BY department_id with three SUM(CASE WHEN salary < 50000 THEN 1 ELSE 0 END) AS under_50k expressions.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT department_id, SUM(CASE WHEN salary < 50000 THEN 1 ELSE 0 END) AS under_50k, SUM(CASE WHEN salary BETWEEN 50000 AND 75000 THEN 1 ELSE 0 END) AS mid_range, SUM(CASE WHEN salary > 75000 THEN 1 ELSE 0 END) AS above_75k FROM Employees GROUP BY department_id;",
xp:70
},

/* ----- COMPLEX DML ----- */

{
id:259,
difficulty:"Proficient",
topic:"COMPLEX DML",
title:"UPSERT Pattern",
prompt:"Insert a supplier with id=2, name='GlobalParts EU', country='Germany', rating=5. If id 2 exists, replace it.",
hint:"INSERT OR REPLACE handles both insert and update based on primary key conflict. It deletes then re-inserts the row.",
starterCode:"-- Write your SQL here",
expectedQuery:"INSERT OR REPLACE INTO Suppliers VALUES(2, 'GlobalParts EU', 'Germany', 5);",
validationType:"dml",
verificationQuery:"SELECT * FROM Suppliers ORDER BY id;",
xp:55
},

{
id:260,
difficulty:"Proficient",
topic:"COMPLEX DML",
title:"Bulk Update with CASE",
prompt:"Update all product prices (cast resulting prices as INTEGER): Electronics (cat 1) +10%, Office (cat 2) -5%, others unchanged.",
hint:"Use UPDATE Products SET price = CASE WHEN category_id = 1 THEN CAST(... AS INTEGER) WHEN category_id = 2 THEN ... ELSE price END;",
starterCode:"-- Write your SQL here",
expectedQuery:"UPDATE Products SET price = CASE WHEN category_id = 1 THEN CAST(price * 1.1 AS INTEGER) WHEN category_id = 2 THEN CAST(price * 0.95 AS INTEGER) ELSE price END;",
validationType:"dml",
verificationQuery:"SELECT name, price, category_id FROM Products ORDER BY id;",
xp:60
},

{
id:261,
difficulty:"Proficient",
topic:"COMPLEX DML",
title:"Insert Computed Summary",
prompt:"Insert a row into Payments: id=13, customer_id=1, amount = total of all existing payments by customer 1, date='2024-06-01', method='Bank Transfer'.",
hint:"Use a scalar subquery inside VALUES(...) to compute (SELECT SUM(amount) FROM Payments WHERE customer_id = 1).",
starterCode:"-- Write your SQL here",
expectedQuery:"INSERT INTO Payments VALUES(13, 1, (SELECT SUM(amount) FROM Payments WHERE customer_id = 1), '2024-06-01', 'Bank Transfer');",
validationType:"dml",
verificationQuery:"SELECT * FROM Payments WHERE id = 13;",
xp:60
},

{
id:262,
difficulty:"Proficient",
topic:"COMPLEX DML",
title:"Delete and Insert",
prompt:"Delete all inventory for supplier 3, then insert new inventory: product 1 with stock 100 from supplier 3.",
hint:"Run two semicolon-separated statements: first DELETE FROM Inventory for supplier_id = 3, then INSERT INTO Inventory with (product_id, supplier_id, stock).",
starterCode:"-- Write your SQL here",
expectedQuery:"DELETE FROM Inventory WHERE supplier_id = 3; INSERT INTO Inventory VALUES(1, 3, 100);",
validationType:"dml",
verificationQuery:"SELECT * FROM Inventory WHERE supplier_id = 3 ORDER BY product_id;",
xp:55
},

{
id:263,
difficulty:"Proficient",
topic:"COMPLEX DML",
title:"Archival Pattern",
prompt:"Create an 'OldOrders' table with same structure as Orders, move orders from before March 2024 into it, then delete them from Orders.",
hint:"CREATE TABLE AS SELECT to archive, then DELETE: 1) CREATE TABLE OldOrders AS SELECT... 2) DELETE FROM Orders WHERE...",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TABLE OldOrders AS SELECT * FROM Orders WHERE order_date < '2024-03-01'; DELETE FROM Orders WHERE order_date < '2024-03-01';",
validationType:"multi",
verificationQuery:"SELECT (SELECT COUNT(*) FROM OldOrders) AS archived, (SELECT COUNT(*) FROM Orders) AS remaining;",
xp:70
},

{
id:264,
difficulty:"Proficient",
topic:"COMPLEX DML",
title:"Merge-style Update",
prompt:"New salary revisions have been recorded in EmployeeHistory. For each employee who has an entry in EmployeeHistory, update their salary in Employees to the new_salary from their most recent history entry.",
hint:"Use a correlated subquery in SET ordered by change_date DESC LIMIT 1, and restrict the UPDATE with WHERE id IN (SELECT employee_id FROM EmployeeHistory).",
setupSQL:"INSERT INTO EmployeeHistory VALUES(7, 1, 75000, 82000, '2024-06-01'), (8, 2, 52000, 58000, '2024-06-01');",
starterCode:"-- Write your SQL here",
expectedQuery:"UPDATE Employees SET salary = (SELECT new_salary FROM EmployeeHistory eh WHERE eh.employee_id = Employees.id ORDER BY eh.change_date DESC LIMIT 1) WHERE id IN (SELECT employee_id FROM EmployeeHistory);",
validationType:"dml",
verificationQuery:"SELECT name, salary FROM Employees ORDER BY id;",
xp:70
},

/* ----- ADVANCED DDL ----- */

{
id:265,
difficulty:"Proficient",
topic:"ADVANCED DDL",
title:"Temp Table",
prompt:"Create a temporary table 'TempSales' with product_id (INTEGER) and total_qty (INTEGER).",
hint:"CREATE TEMP TABLE or CREATE TEMPORARY TABLE — temp tables exist only for the current session and are auto-dropped.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TEMP TABLE TempSales (product_id INTEGER, total_qty INTEGER);",
validationType:"ddl",
verificationQuery:"SELECT name FROM sqlite_temp_master WHERE type='table' AND name='TempSales';",
xp:55
},

{
id:266,
difficulty:"Proficient",
topic:"ADVANCED DDL",
title:"Complex CHECK",
prompt:"Create a table 'Events' with: id (PK), start_date (TEXT), end_date (TEXT), with CHECK that end_date > start_date.",
hint:"CHECK constraints can reference multiple columns: CHECK (end_date > start_date) ensures valid date ranges.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TABLE Events (id INTEGER PRIMARY KEY, start_date TEXT NOT NULL, end_date TEXT NOT NULL, CHECK (end_date > start_date));",
validationType:"ddl",
expectedSchema:{tableName:"Events", columns:["id","start_date","end_date"]},
xp:60
},

{
id:267,
difficulty:"Proficient",
topic:"ADVANCED DDL",
title:"Compound Index",
prompt:"Create a compound index 'idx_sales_product_date' on SalesLog covering product_id and sale_date.",
hint:"CREATE INDEX name ON table(col1, col2); — compound indexes optimize queries filtering on both columns.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE INDEX idx_sales_product_date ON SalesLog(product_id, sale_date);",
validationType:"ddl",
verificationQuery:"SELECT name FROM sqlite_master WHERE type='index' AND name='idx_sales_product_date';",
xp:55
},

{
id:268,
difficulty:"Proficient",
topic:"ADVANCED DDL",
title:"Table with Foreign Key",
prompt:"Create a table 'OrderItems' with: id (PK), order_id (INTEGER REFERENCES Orders(id)), product_id (INTEGER), qty (INTEGER).",
hint:"REFERENCES creates a foreign key: column_name INTEGER REFERENCES table(column). Enable with PRAGMA foreign_keys = ON.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TABLE OrderItems (id INTEGER PRIMARY KEY, order_id INTEGER REFERENCES Orders(id), product_id INTEGER, qty INTEGER);",
validationType:"ddl",
expectedSchema:{tableName:"OrderItems", columns:["id","order_id","product_id","qty"]},
xp:60
},

{
id:269,
difficulty:"Proficient",
topic:"ADVANCED DDL",
title:"Create Table IF NOT EXISTS",
prompt:"Create a table 'AuditLog' only if it doesn't already exist: id (PK), action (TEXT), timestamp (TEXT DEFAULT CURRENT_TIMESTAMP).",
hint:"IF NOT EXISTS prevents errors when the table already exists: CREATE TABLE IF NOT EXISTS name (...);",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TABLE IF NOT EXISTS AuditLog (id INTEGER PRIMARY KEY, action TEXT, timestamp TEXT DEFAULT CURRENT_TIMESTAMP);",
validationType:"ddl",
expectedSchema:{tableName:"AuditLog", columns:["id","action","timestamp"]},
xp:55
},

{
id:270,
difficulty:"Proficient",
topic:"ADVANCED DDL",
title:"Drop and Recreate",
prompt:"Drop the Categories table if it exists, then recreate it with id (PK), name (TEXT UNIQUE NOT NULL), description (TEXT).",
hint:"DROP TABLE IF EXISTS followed by CREATE TABLE. This is a common pattern for schema migrations.",
starterCode:"-- Write your SQL here",
expectedQuery:"DROP TABLE IF EXISTS Categories; CREATE TABLE Categories (id INTEGER PRIMARY KEY, name TEXT UNIQUE NOT NULL, description TEXT);",
validationType:"ddl",
expectedSchema:{tableName:"Categories", columns:["id","name","description"]},
xp:60
},

/* ----- TRIGGERS ----- */

{
id:271,
difficulty:"Proficient",
topic:"TRIGGER",
title:"After Insert Trigger",
prompt:"Create a trigger 'log_new_employee' that inserts into AuditLog when a new employee is added. First create AuditLog, then the trigger.",
hint:"CREATE TRIGGER name AFTER INSERT ON table BEGIN ... END; — NEW.column references the inserted row's values.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TABLE IF NOT EXISTS AuditLog (id INTEGER PRIMARY KEY, action TEXT, timestamp TEXT DEFAULT CURRENT_TIMESTAMP); CREATE TRIGGER log_new_employee AFTER INSERT ON Employees BEGIN INSERT INTO AuditLog(action) VALUES('New employee: ' || NEW.name); END;",
validationType:"ddl",
verificationQuery:"SELECT name FROM sqlite_master WHERE type='trigger' AND name='log_new_employee';",
xp:70
},

{
id:272,
difficulty:"Proficient",
topic:"TRIGGER",
title:"Before Update Trigger",
prompt:"Create a trigger that prevents salary decreases: raise an error if new salary < old salary.",
hint:"CREATE TRIGGER name BEFORE UPDATE ON table BEGIN SELECT RAISE(ABORT, 'message') WHERE condition; END; — RAISE stops the operation.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TRIGGER prevent_salary_decrease BEFORE UPDATE ON Employees BEGIN SELECT RAISE(ABORT, 'Salary cannot be decreased') WHERE NEW.salary < OLD.salary; END;",
validationType:"ddl",
verificationQuery:"SELECT name FROM sqlite_master WHERE type='trigger' AND name='prevent_salary_decrease';",
xp:75
},

{
id:273,
difficulty:"Proficient",
topic:"TRIGGER",
title:"Auto-Audit Trigger",
prompt:"Create a trigger that logs salary changes to EmployeeHistory automatically whenever an employee's salary in Employees is updated.",
hint:"Create an AFTER UPDATE OF salary ON Employees trigger that inserts (OLD.id, OLD.salary, NEW.salary, DATE('now')) into EmployeeHistory.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TRIGGER salary_audit AFTER UPDATE OF salary ON Employees BEGIN INSERT INTO EmployeeHistory(employee_id, old_salary, new_salary, change_date) VALUES(OLD.id, OLD.salary, NEW.salary, DATE('now')); END;",
validationType:"ddl",
postTestSQL:"UPDATE Employees SET salary = 80000 WHERE id = 1;",
verificationQuery:"SELECT employee_id, old_salary, new_salary FROM EmployeeHistory WHERE employee_id = 1 AND new_salary = 80000;",
xp:75
},

{
id:274,
difficulty:"Proficient",
topic:"TRIGGER",
title:"Drop Trigger",
prompt:"The trigger 'salary_audit' has been pre-created for this exercise. Drop it using DROP TRIGGER.",
hint:"DROP TRIGGER IF EXISTS trigger_name; safely removes a trigger without error if it doesn't exist.",
setupSQL:"CREATE TRIGGER salary_audit AFTER UPDATE OF salary ON Employees BEGIN INSERT INTO EmployeeHistory(employee_id, old_salary, new_salary, change_date) VALUES(OLD.id, OLD.salary, NEW.salary, DATE('now')); END;",
starterCode:"-- Write your SQL here",
expectedQuery:"DROP TRIGGER IF EXISTS salary_audit;",
validationType:"ddl",
verificationQuery:"SELECT COUNT(*) AS cnt FROM sqlite_master WHERE type='trigger' AND name='salary_audit';",
xp:55
},

/* ----- INDEXES & PERFORMANCE ----- */

{
id:275,
difficulty:"Proficient",
topic:"INDEX",
title:"Covering Index",
prompt:"Create an index on Orders covering both customer_id and order_date for queries that filter by customer and sort by date.",
hint:"A compound index covering both filter and sort columns avoids a separate sort step: CREATE INDEX name ON Orders(customer_id, order_date);",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE INDEX idx_orders_cust_date ON Orders(customer_id, order_date);",
validationType:"ddl",
verificationQuery:"SELECT name FROM sqlite_master WHERE type='index' AND name='idx_orders_cust_date';",
xp:60
},

{
id:276,
difficulty:"Proficient",
topic:"INDEX",
title:"Partial Index",
prompt:"Create an index on Products that only covers in-stock items (WHERE in_stock = 1).",
hint:"Partial (filtered) indexes only index rows matching a condition: CREATE INDEX name ON table(column) WHERE condition;",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE INDEX idx_products_instock ON Products(name) WHERE in_stock = 1;",
validationType:"ddl",
verificationQuery:"SELECT name FROM sqlite_master WHERE type='index' AND name='idx_products_instock';",
xp:65
},

{
id:277,
difficulty:"Proficient",
topic:"INDEX",
title:"EXPLAIN QUERY PLAN",
prompt:"Show the query plan for: SELECT * FROM Employees WHERE salary > 70000.",
hint:"EXPLAIN QUERY PLAN SELECT ... shows how SQLite will execute the query — whether it uses an index or a full table scan.",
starterCode:"-- Write your SQL here",
expectedQuery:"EXPLAIN QUERY PLAN SELECT * FROM Employees WHERE salary > 70000;",
xp:55
},

{
id:278,
difficulty:"Proficient",
topic:"INDEX",
title:"Drop Index",
prompt:"The index 'idx_emp_salary' has been pre-created for this exercise. Drop it using DROP INDEX.",
hint:"DROP INDEX IF EXISTS index_name; removes an index without modifying table data.",
setupSQL:"CREATE INDEX idx_emp_salary ON Employees(salary);",
starterCode:"-- Write your SQL here",
expectedQuery:"DROP INDEX IF EXISTS idx_emp_salary;",
validationType:"ddl",
verificationQuery:"SELECT COUNT(*) AS cnt FROM sqlite_master WHERE type='index' AND name='idx_emp_salary';",
xp:50
},

/* ----- JSON FUNCTIONS ----- */

{
id:279,
difficulty:"Proficient",
topic:"JSON",
title:"json_object",
prompt:"Show each employee as a JSON object with keys 'name' and 'salary'.",
hint:"json_object('key1', val1, 'key2', val2) builds a JSON object: json_object('name', name, 'salary', salary)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT json_object('name', name, 'salary', salary) AS employee_json FROM Employees;",
xp:60
},

{
id:280,
difficulty:"Proficient",
topic:"JSON",
title:"json_array",
prompt:"Show each department's id with its name in a JSON array like [id, name].",
hint:"json_array(val1, val2, ...) creates a JSON array: json_array(id, name)",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT json_array(id, name) AS dept_json FROM Departments;",
xp:55
},

{
id:281,
difficulty:"Proficient",
topic:"JSON",
title:"json_extract",
prompt:"Given the JSON '{\"x\": 10, \"y\": 20}', extract the value of key 'x'.",
hint:"json_extract(json_string, '$.key') navigates JSON using path syntax. $.x gets the top-level 'x' value.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT json_extract('{\"x\": 10, \"y\": 20}', '$.x') AS x_value;",
xp:55
},

{
id:282,
difficulty:"Proficient",
topic:"JSON",
title:"json_group_array",
prompt:"Show each department_id with all employee names in that department as a JSON array.",
hint:"json_group_array(value) aggregates values into a JSON array, like GROUP_CONCAT but producing valid JSON.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT department_id, json_group_array(name) AS employees FROM Employees GROUP BY department_id;",
xp:65
},

/* ----- ADVANCED SUBQUERIES ----- */

{
id:283,
difficulty:"Proficient",
topic:"ADVANCED SUBQUERY",
title:"Multi-Level Nesting",
prompt:"Find departments (department_id and average salary) where the average salary is above the exact company-wide median salary.",
hint:"With an even number of employees (12), the exact median is the average of the two middle sorted salaries (positions 6 and 7). Compare each department's AVG(salary) in HAVING against that scalar subquery.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT department_id, AVG(salary) AS avg_sal FROM Employees GROUP BY department_id HAVING AVG(salary) > (SELECT AVG(salary) FROM (SELECT salary FROM Employees ORDER BY salary LIMIT 2 - (SELECT COUNT(*) % 2 FROM Employees) OFFSET (SELECT (COUNT(*) - 1) / 2 FROM Employees)));",
xp:75
},

{
id:284,
difficulty:"Proficient",
topic:"ADVANCED SUBQUERY",
title:"Subquery in HAVING",
prompt:"Find regions where total sales exceed the overall average regional sales.",
hint:"HAVING SUM(quantity_sold) > (SELECT AVG(total) FROM (SELECT SUM(quantity_sold) AS total FROM SalesLog GROUP BY region))",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT region, SUM(quantity_sold) AS total FROM SalesLog GROUP BY region HAVING SUM(quantity_sold) > (SELECT AVG(total) FROM (SELECT SUM(quantity_sold) AS total FROM SalesLog GROUP BY region));",
xp:70
},

{
id:285,
difficulty:"Proficient",
topic:"ADVANCED SUBQUERY",
title:"Subquery in SELECT",
prompt:"Show each product's name, price, and how much more expensive it is than the cheapest product.",
hint:"Subtract a scalar subquery: price - (SELECT MIN(price) FROM Products) AS above_cheapest",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, price, price - (SELECT MIN(price) FROM Products) AS above_cheapest FROM Products;",
xp:55
},

{
id:286,
difficulty:"Proficient",
topic:"ADVANCED SUBQUERY",
title:"Row Value Comparison",
prompt:"Using a multi-column row-value comparison (col1, col2) IN (...), find the highest-paid employee(s) in each department (excluding NULL departments). Show name, department_id, and salary.",
hint:"Both PostgreSQL and SQLite support tuple comparisons: WHERE (department_id, salary) IN (SELECT department_id, MAX(salary) FROM Employees WHERE department_id IS NOT NULL GROUP BY department_id).",
note:"PostgreSQL / Cross-Dialect Tip: Row-value tuple comparisons like (a, b) IN (SELECT ...) are standard SQL supported in PostgreSQL, MySQL, and SQLite 3.15+.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, department_id, salary FROM Employees WHERE (department_id, salary) IN (SELECT department_id, MAX(salary) FROM Employees WHERE department_id IS NOT NULL GROUP BY department_id);",
xp:60
},

{
id:287,
difficulty:"Proficient",
topic:"ADVANCED SUBQUERY",
title:"Percentage of Total",
prompt:"Show each product's name and its price as a percentage of the total price of all products (rounded to 2 decimal places).",
hint:"Compute ROUND(price * 100.0 / (SELECT SUM(price) FROM Products), 2) to get each product's percentage contribution.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT name, ROUND(price * 100.0 / (SELECT SUM(price) FROM Products), 2) AS pct_of_total FROM Products;",
xp:60
},

{
id:288,
difficulty:"Proficient",
topic:"ADVANCED SUBQUERY",
title:"Correlated Delete Concept",
prompt:"Delete customers who have never made a payment.",
hint:"Use DELETE FROM Customers with WHERE id NOT IN (...) over the distinct customer_id values in Payments (or WHERE NOT EXISTS).",
starterCode:"-- Write your SQL here",
expectedQuery:"DELETE FROM Customers WHERE id NOT IN (SELECT DISTINCT customer_id FROM Payments);",
validationType:"dml",
verificationQuery:"SELECT name FROM Customers ORDER BY id;",
xp:60
},

/* ----- TRANSACTIONS ----- */

{
id:289,
difficulty:"Proficient",
topic:"TRANSACTION",
title:"Basic Transaction",
prompt:"In a single transaction: insert a new department (6, 'Legal') and a new employee (13, 'Nina', 60000, 6, '2024-06-01', 'nina@company.com', NULL).",
hint:"BEGIN; ... COMMIT; wraps statements in an atomic transaction. Either all succeed or none do.",
starterCode:"-- Write your SQL here",
expectedQuery:"BEGIN; INSERT INTO Departments VALUES(6, 'Legal'); INSERT INTO Employees VALUES(13, 'Nina', 60000, 6, '2024-06-01', 'nina@company.com', NULL); COMMIT;",
validationType:"multi",
verificationQuery:"SELECT (SELECT COUNT(*) FROM Departments WHERE name = 'Legal') AS dept_exists, (SELECT COUNT(*) FROM Employees WHERE name = 'Nina') AS emp_exists;",
xp:65
},

{
id:290,
difficulty:"Proficient",
topic:"TRANSACTION",
title:"Transfer Pattern",
prompt:"Simulate a budget transfer: decrease Project 1's budget by 10000 and increase Project 2's by 10000, atomically.",
hint:"Wrap two UPDATE Projects statements inside BEGIN; ... COMMIT; so both budget changes succeed or fail together.",
starterCode:"-- Write your SQL here",
expectedQuery:"BEGIN; UPDATE Projects SET budget = budget - 10000 WHERE id = 1; UPDATE Projects SET budget = budget + 10000 WHERE id = 2; COMMIT;",
validationType:"multi",
verificationQuery:"SELECT id, budget FROM Projects WHERE id IN (1, 2) ORDER BY id;",
xp:65
},

{
id:291,
difficulty:"Proficient",
topic:"TRANSACTION",
title:"Multi-Step Migration",
prompt:"In a transaction: 1) Create a 'EmployeeTags' table (employee_id INT, tag TEXT), 2) Insert tags for employee 1: 'senior' and 'lead'.",
hint:"Wrap DDL + DML in a transaction: BEGIN; CREATE TABLE ...; INSERT ...; INSERT ...; COMMIT;",
starterCode:"-- Write your SQL here",
expectedQuery:"BEGIN; CREATE TABLE EmployeeTags (employee_id INTEGER, tag TEXT); INSERT INTO EmployeeTags VALUES(1, 'senior'); INSERT INTO EmployeeTags VALUES(1, 'lead'); COMMIT;",
validationType:"multi",
verificationQuery:"SELECT * FROM EmployeeTags ORDER BY tag;",
xp:70
},

{
id:292,
difficulty:"Proficient",
topic:"TRANSACTION",
title:"Savepoint Concept",
prompt:"Use a savepoint: begin transaction, insert into Departments (6, 'Legal'), set a savepoint 'sp1', insert (8, 'Research'), then rollback to sp1 and commit.",
hint:"SAVEPOINT name creates a restore point. ROLLBACK TO name undoes changes after that savepoint. Only Legal should remain.",
note:"SAVEPOINT is supported in SQLite, PostgreSQL, and MySQL. It provides nested transaction-like control.",
starterCode:"-- Write your SQL here",
expectedQuery:"BEGIN; INSERT INTO Departments VALUES(6, 'Legal'); SAVEPOINT sp1; INSERT INTO Departments VALUES(8, 'Research'); ROLLBACK TO sp1; COMMIT;",
validationType:"multi",
verificationQuery:"SELECT * FROM Departments ORDER BY id;",
xp:75
},

{
id:293,
difficulty:"Proficient",
topic:"TRANSACTION",
title:"Idempotent Migration",
prompt:"Write a safe migration: create table 'Logs' IF NOT EXISTS, then insert a log entry (1, 'migration_v1', CURRENT_TIMESTAMP).",
hint:"IF NOT EXISTS makes CREATE TABLE idempotent — safe to run multiple times without error.",
starterCode:"-- Write your SQL here",
expectedQuery:"CREATE TABLE IF NOT EXISTS Logs (id INTEGER PRIMARY KEY, message TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP); INSERT INTO Logs VALUES(1, 'migration_v1', DATETIME('now'));",
validationType:"multi",
verificationQuery:"SELECT id, message FROM Logs;",
xp:60
},

{
id:294,
difficulty:"Proficient",
topic:"TRANSACTION",
title:"Atomic Swap",
prompt:"Atomically swap the salaries of Alice and Bob.",
hint:"Use a transaction with a temp variable approach: save one value, update both, commit. Or use CASE: UPDATE SET salary = CASE name WHEN 'Alice' THEN (Bob's) WHEN 'Bob' THEN (Alice's) END WHERE name IN ('Alice','Bob');",
starterCode:"-- Write your SQL here",
expectedQuery:"BEGIN; UPDATE Employees SET salary = CASE name WHEN 'Alice' THEN (SELECT salary FROM Employees WHERE name = 'Bob') WHEN 'Bob' THEN (SELECT salary FROM Employees WHERE name = 'Alice') END WHERE name IN ('Alice', 'Bob'); COMMIT;",
validationType:"multi",
verificationQuery:"SELECT name, salary FROM Employees WHERE name IN ('Alice', 'Bob') ORDER BY name;",
xp:75
},

/* ----- AGGREGATE EDGE CASES ----- */

{
id:295,
difficulty:"Proficient",
topic:"AGGREGATION",
title:"GROUP_CONCAT",
prompt:"Show each department_id with a comma-separated list of employee names.",
hint:"GROUP_CONCAT(column, separator) concatenates values per group: GROUP_CONCAT(name, ', ') with GROUP BY department_id.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT department_id, GROUP_CONCAT(name, ', ') AS employees FROM Employees GROUP BY department_id;",
xp:55
},

{
id:296,
difficulty:"Proficient",
topic:"AGGREGATION",
title:"NULL in Aggregation",
prompt:"Show COUNT(*) vs COUNT(department_id) vs COUNT(DISTINCT department_id) from Employees to demonstrate NULL handling.",
hint:"COUNT(*) counts all rows. COUNT(col) skips NULLs. COUNT(DISTINCT col) counts unique non-NULL values. Compare all three.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT COUNT(*) AS all_rows, COUNT(department_id) AS non_null_dept, COUNT(DISTINCT department_id) AS unique_depts FROM Employees;",
xp:55
},

{
id:297,
difficulty:"Proficient",
topic:"AGGREGATION",
title:"Empty Group Handling",
prompt:"Show each department with employee count, including departments with 0 employees.",
hint:"LEFT JOIN from Departments to Employees, then GROUP BY. COUNT(e.id) returns 0 for empty groups, unlike COUNT(*).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT d.name, COUNT(e.id) AS emp_count FROM Departments d LEFT JOIN Employees e ON d.id = e.department_id GROUP BY d.name;",
xp:60
},

/* ----- PATTERN MATCHING ----- */

{
id:298,
difficulty:"Proficient",
topic:"PATTERN MATCHING",
title:"GLOB Pattern",
prompt:"Find employees whose name contains a lowercase 'a' using GLOB (case-sensitive, unlike LIKE).",
hint:"GLOB is case-sensitive in SQLite: WHERE name GLOB '*a*' matches lowercase 'a' only. * is the wildcard (not %).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees WHERE name GLOB '*a*';",
xp:55
},

{
id:299,
difficulty:"Proficient",
topic:"PATTERN MATCHING",
title:"LIKE with Escape",
prompt:"Find products whose name contains a literal underscore character. Use ESCAPE to treat _ as literal.",
hint:"LIKE '%\\_%' ESCAPE '\\' — the ESCAPE clause lets you define a character that makes the next wildcard literal.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Products WHERE name LIKE '%\\_%' ESCAPE '\\';",
xp:55
},

{
id:300,
difficulty:"Proficient",
topic:"PATTERN MATCHING",
title:"Complex Name Search",
prompt:"Find employees whose names start with a vowel (A, E, I, O, U).",
hint:"Use GLOB with character class: GLOB '[AEIOU]*' matches names starting with any uppercase vowel.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT * FROM Employees WHERE name GLOB '[AEIOU]*';",
xp:55
}

];
window.Exercises = (window.Exercises || []).concat(exercises);
})();
