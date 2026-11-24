/* ==========================
   EXPERT EXERCISES
   ========================== */

(function(){
var exercises = [

/* ----- BUSINESS & FINANCE ----- */

{
id:301,
difficulty:"Expert",
topic:"FINANCIAL ANALYSIS",
title:"Running Balance",
prompt:"Calculate the running balance for each customer's payments, ordered by payment date. Show customer_id, payment_date, amount, and the running balance.",
hint:"Use a window function: SUM(amount) OVER (PARTITION BY customer_id ORDER BY payment_date).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT customer_id, payment_date, amount, SUM(amount) OVER (PARTITION BY customer_id ORDER BY payment_date) AS running_balance FROM Payments;",
xp:100
},

{
id:302,
difficulty:"Expert",
topic:"FINANCIAL ANALYSIS",
title:"Year-Over-Year Growth",
prompt:"Calculate the Year-Over-Year (YoY) growth in total sales quantity. Show the year, total quantity, previous year's quantity, and the percentage growth (rounded to 2 decimals).",
hint:"Use CTEs to aggregate sales by year. Then use LAG() to get the previous year's sales, and calculate ((current - previous) * 100.0 / previous).",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH YearlySales AS (SELECT STRFTIME('%Y', sale_date) AS year, SUM(quantity_sold) AS total_qty FROM SalesLog GROUP BY year) SELECT year, total_qty, LAG(total_qty) OVER (ORDER BY year) AS prev_qty, ROUND(((total_qty - LAG(total_qty) OVER (ORDER BY year)) * 100.0) / LAG(total_qty) OVER (ORDER BY year), 2) AS yoy_growth_pct FROM YearlySales;",
xp:110
},

{
id:303,
difficulty:"Expert",
topic:"E-COMMERCE",
title:"Customer Lifetime Value (CLV)",
prompt:"Categorize customers into 'High', 'Medium', and 'Low' Value based on their total payments. High: > 500, Medium: 200-500, Low: < 200. Show customer name, total paid, and their category.",
hint:"Aggregate payments per customer in a CTE or subquery, then use a CASE statement to assign the category. Don't forget to LEFT JOIN customers who haven't paid.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH CustomerTotals AS (SELECT c.id, c.name, COALESCE(SUM(p.amount), 0) AS total_paid FROM Customers c LEFT JOIN Payments p ON c.id = p.customer_id GROUP BY c.id, c.name) SELECT name, total_paid, CASE WHEN total_paid > 500 THEN 'High' WHEN total_paid >= 200 THEN 'Medium' ELSE 'Low' END AS value_category FROM CustomerTotals;",
xp:105
},

{
id:304,
difficulty:"Expert",
topic:"E-COMMERCE",
title:"Product Bundling (Market Basket)",
prompt:"Find pairs of products (by product_id) bought together by the same customer on the same order_date. Show product1, product2, and the count of times they appear together, ordered by count descending. Avoid duplicates (e.g. 1-2 is the same as 2-1).",
hint:"Self-join Orders on customer_id and order_date, with o1.product_id < o2.product_id to avoid duplicate pairs and self-pairing.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT o1.product_id AS product1, o2.product_id AS product2, COUNT(*) AS times_bought_together FROM Orders o1 JOIN Orders o2 ON o1.customer_id = o2.customer_id AND o1.order_date = o2.order_date AND o1.product_id < o2.product_id GROUP BY product1, product2 ORDER BY times_bought_together DESC;",
xp:120
},

{
id:305,
difficulty:"Expert",
topic:"E-COMMERCE",
title:"Churn Prevention",
prompt:"Find 'at-risk' customers: those who made an order in January 2024 but haven't made any order since February 2024 onwards. Show customer name and email.",
hint:"Use EXCEPT or NOT IN. Find customers with orders before '2024-02-01' EXCEPT those with orders >= '2024-02-01'.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT DISTINCT c.name, c.email FROM Customers c JOIN Orders o ON c.id = o.customer_id WHERE o.order_date < '2024-02-01' AND c.id NOT IN (SELECT customer_id FROM Orders WHERE order_date >= '2024-02-01');",
xp:100
},

/* ----- DATA SCIENCE & WEB ANALYTICS ----- */

{
id:306,
difficulty:"Expert",
topic:"DATA SCIENCE",
title:"Web Sessionization",
prompt:"Group web traffic into sessions. A new session starts if a user's visit is more than 30 minutes (1800 seconds) after their previous visit. This is complex: show customer_id, visit_date, and a flag (1 or 0) indicating if it's a new session.",
hint:"Use LAG() to find the previous visit_date per customer. Convert string dates to UNIXEPOCH() or use JULIANDAY() * 86400 to get seconds difference.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH Lags AS (SELECT customer_id, visit_date, LAG(visit_date) OVER (PARTITION BY customer_id ORDER BY visit_date) AS prev_visit FROM WebTraffic) SELECT customer_id, visit_date, CASE WHEN prev_visit IS NULL THEN 1 WHEN (JULIANDAY(visit_date) - JULIANDAY(prev_visit)) * 86400 > 1800 THEN 1 ELSE 0 END AS is_new_session FROM Lags;",
xp:150
},

{
id:307,
difficulty:"Expert",
topic:"DATA SCIENCE",
title:"Bounce Rate",
prompt:"Calculate the bounce rate: the percentage of customers who only visited exactly 1 page in the WebTraffic log (rounded to 2 decimal places).",
hint:"Count total unique visitors, and count visitors having COUNT(*) = 1. Divide and multiply by 100.0, then wrap in ROUND(..., 2).",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH VisitorCounts AS (SELECT customer_id, COUNT(*) AS page_views FROM WebTraffic GROUP BY customer_id) SELECT ROUND((SUM(CASE WHEN page_views = 1 THEN 1 ELSE 0 END) * 100.0) / COUNT(*), 2) AS bounce_rate_pct FROM VisitorCounts;",
xp:110
},

{
id:308,
difficulty:"Expert",
topic:"DATA SCIENCE",
title:"Pareto Principle (80/20 Rule)",
prompt:"Find the top products that contribute to the first 80% of total sales quantity (up to and including the item that crosses 80%). Rank them by total quantity sold descending and show product name, total quantity, and cumulative percentage (rounded to 2 decimal places).",
hint:"Aggregate totals per product in a CTE, compute a running SUM() OVER (ORDER BY total DESC) and grand total, then filter where the prior cumulative percentage ((running_total - total) * 100.0 / grand_total) <= 80.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH ProdTotals AS (SELECT p.name, SUM(s.quantity_sold) AS total FROM SalesLog s JOIN Products p ON s.product_id = p.id GROUP BY p.name), Cumulatives AS (SELECT name, total, SUM(total) OVER (ORDER BY total DESC) AS running_total, (SELECT SUM(quantity_sold) FROM SalesLog) AS grand_total FROM ProdTotals) SELECT name, total, ROUND((running_total * 100.0) / grand_total, 2) AS cumulative_pct FROM Cumulatives WHERE (running_total - total) * 100.0 / grand_total <= 80;",
xp:140
},

{
id:309,
difficulty:"Expert",
topic:"DATA SCIENCE",
title:"Anomaly Detection",
prompt:"Find payments that are 'anomalies': an amount greater than 3 times the average payment amount of that specific customer.",
hint:"Use a CTE to calculate the AVG(amount) per customer, then join it back to Payments and filter.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH CustAverages AS (SELECT customer_id, AVG(amount) AS avg_amt FROM Payments GROUP BY customer_id) SELECT p.* FROM Payments p JOIN CustAverages c ON p.customer_id = c.customer_id WHERE p.amount > 3 * c.avg_amt;",
xp:115
},

{
id:310,
difficulty:"Expert",
topic:"DATA SCIENCE",
title:"Median Income vs E-Commerce",
prompt:"Analyze if customers from cities with higher median incomes spend more. Show city, median_income, and average payment amount of customers in that city (rounded to 2 decimal places), ordered by median_income descending.",
hint:"JOIN Demographics, Customers, and Payments, GROUP BY city and median_income, apply ROUND(AVG(p.amount), 2), and ORDER BY median_income DESC.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT d.city, d.median_income, ROUND(AVG(p.amount), 2) AS avg_customer_spend FROM Demographics d JOIN Customers c ON d.city = c.city JOIN Payments p ON c.id = p.customer_id GROUP BY d.city, d.median_income ORDER BY d.median_income DESC;",
xp:110
},

/* ----- HR & ORGANIZATION ----- */

{
id:311,
difficulty:"Expert",
topic:"HR",
title:"Flattening the Hierarchy",
prompt:"Create a report showing every employee, their manager, and their manager's manager (leave NULL if they don't have one).",
hint:"Use multiple LEFT JOINs on the Employees table (e1 for employee, e2 for manager, e3 for manager's manager).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT e1.name AS employee, e2.name AS manager, e3.name AS managers_manager FROM Employees e1 LEFT JOIN Employees e2 ON e1.manager_id = e2.id LEFT JOIN Employees e3 ON e2.manager_id = e3.id;",
xp:100
},

{
id:312,
difficulty:"Expert",
topic:"HR",
title:"Salary History Volatility",
prompt:"Find employees whose salary changed by more than 10% in a single jump in EmployeeHistory. Show employee name, old_salary, new_salary, and percentage change rounded to 2 decimal places.",
hint:"Calculate ABS(new_salary - old_salary) * 100.0 / old_salary, round to 2 decimals, and filter where the change exceeds 10%.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT e.name, h.old_salary, h.new_salary, ROUND(ABS(h.new_salary - h.old_salary) * 100.0 / h.old_salary, 2) AS pct_change FROM EmployeeHistory h JOIN Employees e ON h.employee_id = e.id WHERE ABS(h.new_salary - h.old_salary) * 1.0 / h.old_salary > 0.1;",
xp:110
},

{
id:313,
difficulty:"Expert",
topic:"HR",
title:"Budget Rollup",
prompt:"For every manager (an employee who manages someone), calculate the total salary of their entire direct team (including themselves).",
hint:"Self-join Employees to find reports. Group by the manager's info. Don't forget to include the manager's own salary.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT m.name AS manager_name, m.salary + COALESCE(SUM(e.salary), 0) AS team_total_salary FROM Employees m JOIN Employees e ON e.manager_id = m.id GROUP BY m.id, m.name, m.salary;",
xp:120
},

{
id:314,
difficulty:"Expert",
topic:"HR",
title:"Overlapping Project Roles",
prompt:"Find employees who are assigned to more than 1 project simultaneously. Assume projects overlap if they share the same month (for simplicity, just count active projects). Show employee name and active project count.",
hint:"JOIN Employees and Assignments. GROUP BY employee and HAVING count > 1.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT e.name, COUNT(a.project_id) AS project_count FROM Employees e JOIN Assignments a ON e.id = a.employee_id GROUP BY e.id, e.name HAVING COUNT(a.project_id) > 1;",
xp:100
},

{
id:315,
difficulty:"Expert",
topic:"HR",
title:"Median Salary per Department",
prompt:"Calculate the exact median salary for each department. (In SQLite, use window functions NTILE or ROW_NUMBER).",
hint:"Rank salaries within departments. The median is the average of the middle value(s). Use ROW_NUMBER() and COUNT() OVER().",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH Ranked AS (SELECT department_id, salary, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary) AS rn, COUNT(*) OVER (PARTITION BY department_id) AS cnt FROM Employees WHERE department_id IS NOT NULL) SELECT d.name, AVG(salary) AS median_salary FROM Ranked r JOIN Departments d ON r.department_id = d.id WHERE rn IN ((cnt + 1) / 2, (cnt + 2) / 2) GROUP BY d.id, d.name;",
xp:150
},

/* ----- SCIENCE & IoT ----- */

{
id:316,
difficulty:"Expert",
topic:"SCIENCE",
title:"Sensor Smoothing",
prompt:"Sensors can be noisy. Calculate a smoothed reading for Sensor 1 using a 3-point moving average (previous, current, next reading). Show reading_timestamp, reading_value, and smoothed value rounded to 2 decimal places.",
hint:"Use ROUND(AVG(reading_value) OVER (ORDER BY reading_timestamp ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT reading_timestamp, reading_value, ROUND(AVG(reading_value) OVER (ORDER BY reading_timestamp ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS smoothed_value FROM SensorReadings WHERE sensor_id = 1;",
xp:115
},

{
id:317,
difficulty:"Expert",
topic:"SCIENCE",
title:"Spike Detection",
prompt:"Detect 'spikes' in humidity (Sensor 2): when a reading is more than 1.0 higher than the immediate previous reading. Show reading_timestamp, reading_value, and spike amount rounded to 2 decimal places.",
hint:"Use LAG() to get the previous reading, compute ROUND(reading_value - prev_val, 2), and filter where the difference is > 1.0.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH PrevReadings AS (SELECT reading_timestamp, reading_value, LAG(reading_value) OVER (ORDER BY reading_timestamp) AS prev_val FROM SensorReadings WHERE sensor_id = 2) SELECT reading_timestamp, reading_value, ROUND(reading_value - prev_val, 2) AS spike_amount FROM PrevReadings WHERE reading_value - prev_val > 1.0;",
xp:110
},

{
id:318,
difficulty:"Expert",
topic:"SCIENCE",
title:"Sensor Uptime Gaps",
prompt:"Find missing intervals in sensor data. If the time between two consecutive readings for the same sensor is > 30 minutes, report sensor_id, start_time, end_time, and gap in minutes (rounded to 1 decimal place).",
hint:"Use LAG(reading_timestamp) partitioned by sensor_id, calculate (JULIANDAY(end_time) - JULIANDAY(start_time)) * 1440, and round to 1 decimal place.",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH Gaps AS (SELECT sensor_id, reading_timestamp AS end_time, LAG(reading_timestamp) OVER (PARTITION BY sensor_id ORDER BY reading_timestamp) AS start_time FROM SensorReadings) SELECT sensor_id, start_time, end_time, ROUND((JULIANDAY(end_time) - JULIANDAY(start_time)) * 1440, 1) AS gap_minutes FROM Gaps WHERE (JULIANDAY(end_time) - JULIANDAY(start_time)) * 1440 > 30;",
xp:130
},

{
id:319,
difficulty:"Expert",
topic:"SCIENCE",
title:"Cross-Sensor Correlation",
prompt:"Display Temperature and Humidity readings that were taken at the exact same timestamp.",
hint:"Join SensorReadings to itself (or pivot). One alias for sensor 1 (Temp), one for sensor 2 (Humidity), matching on reading_timestamp.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT t.reading_timestamp, t.reading_value AS temperature, h.reading_value AS humidity FROM SensorReadings t JOIN SensorReadings h ON t.reading_timestamp = h.reading_timestamp WHERE t.sensor_id = 1 AND h.sensor_id = 2;",
xp:105
},

{
id:320,
difficulty:"Expert",
topic:"SCIENCE",
title:"Daily Highs and Lows",
prompt:"Find the highest and lowest readings per sensor per day. Extract the day from the timestamp.",
hint:"Use DATE(reading_timestamp) and GROUP BY. Show sensor type, date, max, and min.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT s.type, DATE(r.reading_timestamp) AS reading_date, MAX(r.reading_value) AS daily_high, MIN(r.reading_value) AS daily_low FROM SensorReadings r JOIN Sensors s ON r.sensor_id = s.id GROUP BY s.type, reading_date;",
xp:100
},

/* ----- HUMANITIES & LIBRARY ----- */

{
id:321,
difficulty:"Expert",
topic:"HUMANITIES",
title:"Overdue Books",
prompt:"Find customers who have overdue books (assuming today is '2024-02-25'). A book is overdue if loan_date + 14 days is before today and return_date is NULL.",
hint:"Use DATE(loan_date, '+14 days') to find the due date, and compare it to '2024-02-25'.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT c.name, b.title, DATE(l.loan_date, '+14 days') AS due_date FROM BookLoans l JOIN Customers c ON l.customer_id = c.id JOIN Books b ON l.book_id = b.id WHERE l.return_date IS NULL AND DATE(l.loan_date, '+14 days') < '2024-02-25';",
xp:110
},

{
id:322,
difficulty:"Expert",
topic:"HUMANITIES",
title:"Author Popularity Index",
prompt:"Rank authors by how many times their books have been loaned out. Show author name, loan count, and their rank.",
hint:"Join Authors -> Books -> BookLoans. Group by author, count loans, and use DENSE_RANK() OVER (ORDER BY loan_count DESC).",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH AuthorLoans AS (SELECT a.name, COUNT(l.id) AS loan_count FROM Authors a JOIN Books b ON a.id = b.author_id LEFT JOIN BookLoans l ON b.id = l.book_id GROUP BY a.name) SELECT name, loan_count, DENSE_RANK() OVER (ORDER BY loan_count DESC) AS rank FROM AuthorLoans;",
xp:115
},

{
id:323,
difficulty:"Expert",
topic:"HUMANITIES",
title:"Century Distribution",
prompt:"Group books by the century they were published in (e.g., 1800s, 1900s). Show the century and count of books.",
hint:"Use arithmetic: (published_year / 100) * 100 AS century. Then GROUP BY it.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT (published_year / 100) * 100 AS century, COUNT(*) AS book_count FROM Books GROUP BY century ORDER BY century;",
xp:100
},

{
id:324,
difficulty:"Expert",
topic:"HUMANITIES",
title:"Library Availability",
prompt:"List all books and their current status: 'Available' if not currently loaned out, or 'Loaned to [Customer Name]'.",
hint:"Use a LEFT JOIN to BookLoans (where return_date IS NULL) and a CASE statement to format the output.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT b.title, CASE WHEN l.id IS NULL THEN 'Available' ELSE 'Loaned to ' || c.name END AS status FROM Books b LEFT JOIN BookLoans l ON b.id = l.book_id AND l.return_date IS NULL LEFT JOIN Customers c ON l.customer_id = c.id;",
xp:120
},

{
id:325,
difficulty:"Expert",
topic:"HUMANITIES",
title:"Reading Speed",
prompt:"Calculate the average days a customer takes to return a book (ignoring active loans). Show customer name and average days rounded to 1 decimal place.",
hint:"Average JULIANDAY(return_date) - JULIANDAY(loan_date) for non-null return dates, and wrap in ROUND(..., 1).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT c.name, ROUND(AVG(JULIANDAY(l.return_date) - JULIANDAY(l.loan_date)), 1) AS avg_days_to_return FROM BookLoans l JOIN Customers c ON l.customer_id = c.id WHERE l.return_date IS NOT NULL GROUP BY c.name;",
xp:110
},

/* ----- SOCIAL SCIENCES & LOGISTICS ----- */

{
id:326,
difficulty:"Expert",
topic:"SOCIAL SCIENCE",
title:"High-Income Cities",
prompt:"Identify cities with a median income above the global average median income. Show city and median_income.",
hint:"Use a scalar subquery in WHERE comparing median_income > (SELECT AVG(median_income) FROM Demographics).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT city, median_income FROM Demographics WHERE median_income > (SELECT AVG(median_income) FROM Demographics);",
xp:90
},

{
id:327,
difficulty:"Expert",
topic:"LOGISTICS",
title:"Inventory Restocking Forecast",
prompt:"Forecast inventory depletion assuming a 30-day sales window (daily_rate = total quantity_sold / 30). Using each product's total stock across all suppliers, show product name, total stock, and days until empty (rounded to 1 decimal place).",
hint:"Compute daily_rate per product in one CTE (SUM(quantity_sold) * 1.0 / 30) and total stock per product in another CTE (SUM(stock) FROM Inventory), then compute ROUND(total_stock / daily_rate, 1).",
starterCode:"-- Write your SQL here",
expectedQuery:"WITH DailyRates AS (SELECT product_id, SUM(quantity_sold) * 1.0 / 30 AS daily_rate FROM SalesLog GROUP BY product_id), ProductStock AS (SELECT product_id, SUM(stock) AS total_stock FROM Inventory GROUP BY product_id) SELECT p.name, s.total_stock, ROUND(s.total_stock / d.daily_rate, 1) AS days_until_empty FROM ProductStock s JOIN DailyRates d ON s.product_id = d.product_id JOIN Products p ON s.product_id = p.id WHERE d.daily_rate > 0;",
xp:135
},

{
id:328,
difficulty:"Expert",
topic:"SOCIAL SCIENCE",
title:"Age vs Income Segmentation",
prompt:"Categorize cities into 'Young' (< 42 age) and 'Older' (>= 42 age). Compare the average median_income between these two segments (rounded to the nearest whole number, 0 decimal places).",
hint:"Use a CASE statement for the segment, GROUP BY it, and compute ROUND(AVG(median_income), 0).",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT CASE WHEN average_age < 42 THEN 'Young' ELSE 'Older' END AS age_segment, ROUND(AVG(median_income), 0) AS avg_income FROM Demographics GROUP BY age_segment;",
xp:100
},

{
id:329,
difficulty:"Expert",
topic:"LOGISTICS",
title:"Supplier Redundancy",
prompt:"Find products that are supplied by more than one supplier to ensure supply chain redundancy. Show product name and supplier count.",
hint:"JOIN Inventory with Products, GROUP BY product, and filter using HAVING COUNT(DISTINCT supplier_id) > 1.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT p.name, COUNT(DISTINCT i.supplier_id) AS supplier_count FROM Inventory i JOIN Products p ON i.product_id = p.id GROUP BY p.id, p.name HAVING COUNT(DISTINCT i.supplier_id) > 1;",
xp:95
},

{
id:330,
difficulty:"Expert",
topic:"EXPERT AGGREGATION",
title:"The Master Dashboard",
prompt:"Create a unified dashboard query. Use UNION ALL to combine: 1) Total Revenue (from Payments), 2) Total Users (from Customers), 3) Active Projects (from Projects). Return two columns: 'Metric' and 'Value'.",
hint:"Write three separate SELECT statements with string literals for 'Metric' and aggregated totals for 'Value', and combine them with UNION ALL.",
starterCode:"-- Write your SQL here",
expectedQuery:"SELECT 'Total Revenue' AS Metric, SUM(amount) AS Value FROM Payments UNION ALL SELECT 'Total Users' AS Metric, COUNT(*) AS Value FROM Customers UNION ALL SELECT 'Active Projects' AS Metric, COUNT(*) AS Value FROM Projects;",
strictColumns:true,
xp:120
}

];
window.Exercises = (window.Exercises || []).concat(exercises);
})();
