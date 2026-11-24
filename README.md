# SQL Trainer Platform

An interactive, 100% browser-based SQL learning and data analytics platform with **330 exercises** across **6 difficulty tiers** (`Beginner` to `Expert`), powered by an in-browser SQLite WebAssembly engine (`sql.js`), interactive data visualizations (`Chart.js`), and auto-generated Entity-Relationship Diagrams (`Mermaid.js`).

---

## Key Features

- **330 Structured Exercises Across 6 Tiers**
  - **Beginner (50)**: `SELECT`, `WHERE`, `NULL`, `LIMIT`, `DISTINCT`, arithmetic, string functions, `CAST`, basic `INSERT` & `DELETE`.
  - **Elementary (60)**: `ORDER BY`, `LIKE`, `IN`, `BETWEEN`, aliases, aggregations (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`), `JOIN`, `UPDATE`, `GROUP BY`, `CASE`.
  - **Intermediate (70)**: Multi-table `JOIN`, `LEFT`/`RIGHT`/`FULL OUTER JOIN`, `HAVING`, subqueries, `UNION`/`INTERSECT`/`EXCEPT`, date & math functions, advanced DML.
  - **Advanced (60)**: Correlated subqueries, window functions (`ROW_NUMBER`, `RANK`, `DENSE_RANK`, `LAG`, `LEAD`, `NTILE`), CTEs, DDL, views, `COALESCE`/`NULLIF`, PostgreSQL/MySQL `GRANT` & stored procedure syntax.
  - **Proficient (60)**: Recursive CTEs, window frames (`ROWS BETWEEN`, `FIRST_VALUE`, `LAST_VALUE`, `PERCENT_RANK`, `CUME_DIST`), pivoting, triggers, partial/covering indexes, `EXPLAIN QUERY PLAN`, JSON functions, transactions & savepoints.
  - **Expert (30)**: Narrative-driven real-world analytics across Finance, E-Commerce, Data Science, HR, IoT/Science, Humanities/Library, Social Science, and Logistics.
- **Interactive Query Visualizations (`Chart.js`)**
  - Toggle between **Table** and **Chart** views on any numeric query result (`Bar`, `Line`, `Pie`, `Doughnut`), with customizable X/Y axes and multi-series support.
- **Live Visual ERDs (`Mermaid.js`)**
  - Switch between **List View** (with `[PK]` / `[FK]` badges) and an interactive **Visual ERD** generated directly from live database introspection (`sqlite_master` + `PRAGMA`), complete with domain scope filters, zoom controls, and a fullscreen modal.
- **Cross-Dialect PostgreSQL & SQLite Learning**
  - Executes queries live against SQLite 3.45+ in WebAssembly while teaching and validating PostgreSQL/MySQL enterprise constructs (`GRANT`, `CREATE PROCEDURE`, `RIGHT JOIN`, `FULL OUTER JOIN`, row-value tuple comparisons, updatable views, savepoints).
- **Persistent Drafts & Progress Tracking**
  - Auto-saves unfinished queries per exercise in `localStorage`, tracks solved exercises (`✓`) and XP score across sessions, and includes a one-click **Reset Progress** option.
- **Keyboard Shortcuts & Responsive UI**
  - Run queries directly from the CodeMirror editor with `Ctrl+Enter` (`Cmd+Enter` on macOS). Fully responsive desktop and mobile drawer layout.

---

## Database Schema (20 Tables)

| Domain | Tables |
| :--- | :--- |
| **E-Commerce & Sales** | `Customers`, `Categories`, `Products`, `Orders`, `Suppliers`, `Inventory`, `Payments`, `SalesLog` |
| **HR & Projects** | `Departments`, `Employees`, `EmployeeHistory`, `Projects`, `Assignments` |
| **Web & IoT Analytics** | `WebTraffic`, `Sensors`, `SensorReadings` |
| **Library & Humanities** | `Authors`, `Books`, `BookLoans` |
| **Social Science** | `Demographics` |

---

## Running Locally or Deploying

No build step or backend server is required:

1. **Direct Browser**: Open `index.html` directly in any modern browser, or serve locally with:
   ```bash
   python -m http.server 8080 -b 127.0.0.1
   ```
   and visit `http://127.0.0.1:8080/`.
2. **GitHub Pages**: Enable **Settings → Pages → Deploy from a branch → `master` / `/ (root)`**. The included `.nojekyll` file ensures fast, direct static deployment.
