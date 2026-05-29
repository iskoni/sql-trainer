/* ==========================
   DATABASE ENGINE
   ========================== */

window.Database = {

    SQL:null,
    db:null,

/* ==========================
   INIT
   ========================== */

async init(){

    const SQL = await initSqlJs({

        locateFile:file =>

        `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`

    });

    this.SQL = SQL;

    this.db = new SQL.Database();

    this.seed();

},

/* ==========================
   RESET DATABASE
   ========================== */

reset(){

    if(this.db){

        this.db.close();

    }

    this.db =
        new this.SQL.Database();

    this.seed();

},

/* ==========================
   SCHEMA METADATA
   ========================== */

getSchema(){

    return [

        "Departments(id, name)",

        "Employees(id, name, salary, department_id, hire_date, email, manager_id)",

        "Customers(id, name, city, country, email, age)",

        "Categories(id, name)",

        "Products(id, name, price, category_id, in_stock)",

        "Orders(id, customer_id, product_id, quantity, order_date)",

        "Suppliers(id, name, country, rating)",

        "Inventory(product_id, supplier_id, stock)",

        "Projects(id, name, budget, start_date, end_date)",

        "Assignments(employee_id, project_id, role)",

        "Payments(id, customer_id, amount, payment_date, method)",

        "SalesLog(id, product_id, quantity_sold, sale_date, region)",

        "EmployeeHistory(id, employee_id, old_salary, new_salary, change_date)",
        "WebTraffic(id, customer_id, page_url, time_spent_sec, visit_date)",
        "Sensors(id, type, location)",
        "SensorReadings(id, sensor_id, reading_value, reading_timestamp)",
        "Authors(id, name, country)",
        "Books(id, title, author_id, published_year)",
        "BookLoans(id, book_id, customer_id, loan_date, return_date)",
        "Demographics(id, city, population, median_income, average_age)"

    ];

},

/* ==========================
   SEED DATABASE
   ========================== */

seed(){

this.db.run(`

/* --------------------------
   TABLES
   -------------------------- */

CREATE TABLE Departments(

    id INTEGER PRIMARY KEY,

    name TEXT

);

CREATE TABLE Employees(

    id INTEGER PRIMARY KEY,

    name TEXT,

    salary INTEGER,

    department_id INTEGER,

    hire_date TEXT,

    email TEXT,

    manager_id INTEGER

);

CREATE TABLE Customers(

    id INTEGER PRIMARY KEY,

    name TEXT,

    city TEXT,

    country TEXT,

    email TEXT,

    age INTEGER

);

CREATE TABLE Categories(

    id INTEGER PRIMARY KEY,

    name TEXT

);

CREATE TABLE Products(

    id INTEGER PRIMARY KEY,

    name TEXT,

    price INTEGER,

    category_id INTEGER,

    in_stock INTEGER

);

CREATE TABLE Orders(

    id INTEGER PRIMARY KEY,

    customer_id INTEGER,

    product_id INTEGER,

    quantity INTEGER,

    order_date TEXT

);

CREATE TABLE Suppliers(

    id INTEGER PRIMARY KEY,

    name TEXT,

    country TEXT,

    rating INTEGER

);

CREATE TABLE Inventory(

    product_id INTEGER,

    supplier_id INTEGER,

    stock INTEGER

);

CREATE TABLE Projects(

    id INTEGER PRIMARY KEY,

    name TEXT,

    budget INTEGER,

    start_date TEXT,

    end_date TEXT

);

CREATE TABLE Assignments(

    employee_id INTEGER,

    project_id INTEGER,

    role TEXT

);

CREATE TABLE Payments(

    id INTEGER PRIMARY KEY,

    customer_id INTEGER,

    amount INTEGER,

    payment_date TEXT,

    method TEXT

);

CREATE TABLE SalesLog(

    id INTEGER PRIMARY KEY,

    product_id INTEGER,

    quantity_sold INTEGER,

    sale_date TEXT,

    region TEXT

);

CREATE TABLE EmployeeHistory(

    id INTEGER PRIMARY KEY,

    employee_id INTEGER,

    old_salary INTEGER,

    new_salary INTEGER,

    change_date TEXT

);

CREATE TABLE WebTraffic(id INTEGER PRIMARY KEY, customer_id INTEGER, page_url TEXT, time_spent_sec INTEGER, visit_date TEXT);
CREATE TABLE Sensors(id INTEGER PRIMARY KEY, type TEXT, location TEXT);
CREATE TABLE SensorReadings(id INTEGER PRIMARY KEY, sensor_id INTEGER, reading_value REAL, reading_timestamp TEXT);
CREATE TABLE Authors(id INTEGER PRIMARY KEY, name TEXT, country TEXT);
CREATE TABLE Books(id INTEGER PRIMARY KEY, title TEXT, author_id INTEGER, published_year INTEGER);
CREATE TABLE BookLoans(id INTEGER PRIMARY KEY, book_id INTEGER, customer_id INTEGER, loan_date TEXT, return_date TEXT);
CREATE TABLE Demographics(id INTEGER PRIMARY KEY, city TEXT, population INTEGER, median_income INTEGER, average_age REAL);

/* --------------------------
   SEED DATA
   -------------------------- */

INSERT INTO Departments VALUES
(1,'Engineering'),
(2,'Sales'),
(3,'HR'),
(4,'Marketing'),
(5,'Finance'),
(7,'R&D');

INSERT INTO Employees VALUES
(1,'Alice',75000,1,'2020-03-15','alice@company.com',NULL),
(2,'Bob',52000,2,'2021-07-01','bob@company.com',1),
(3,'Charlie',88000,1,'2019-01-20','charlie@company.com',1),
(4,'Diana',61000,3,'2022-05-10','diana@company.com',NULL),
(5,'Ethan',47000,2,'2023-02-14','ethan@company.com',2),
(6,'Fiona',92000,4,'2018-11-03','fiona@company.com',NULL),
(7,'George',43000,NULL,'2023-08-22','george@company.com',NULL),
(8,'Hannah',67000,5,'2021-04-18','hannah@company.com',NULL),
(9,'Ivan',55000,1,'2022-09-30','ivan@company.com',3),
(10,'Julia',78000,3,'2020-12-05','julia@company.com',4),
(11,'Kevin',49000,2,'2023-06-11','kevin@company.com',2),
(12,'Laura',105000,4,'2017-08-01','laura@company.com',NULL);

INSERT INTO Customers VALUES
(1,'John','Berlin','Germany','john@mail.com',35),
(2,'Maria','Paris','France','maria@mail.com',28),
(3,'Lucas','Rome','Italy','lucas@mail.com',42),
(4,'Sophie','Madrid','Spain','sophie@mail.com',31),
(5,'Max','Berlin','Germany','max@mail.com',45),
(6,'Emma','London','UK','emma@mail.com',29),
(7,'Oliver','Paris','France','oliver@mail.com',NULL),
(8,'Mia','Tokyo','Japan','mia@mail.com',33),
(9,'Alice','New York','USA','alice@mail.com',27);

INSERT INTO Categories VALUES
(1,'Electronics'),
(2,'Office'),
(3,'Gaming'),
(4,'Audio'),
(5,'Accessories');

INSERT INTO Products VALUES
(1,'Laptop',1200,1,1),
(2,'Keyboard',80,2,1),
(3,'Mouse',40,2,1),
(4,'Monitor',300,1,1),
(5,'Headphones',150,4,1),
(6,'Webcam',90,NULL,0),
(7,'Gamepad',60,3,1),
(8,'Speakers',200,4,0),
(9,'USB Hub',25,5,1),
(10,'Desk Lamp',45,NULL,1),
(11,'Gaming_Mouse',50,3,1);

INSERT INTO Orders VALUES
(1,1,1,1,'2024-01-15'),
(2,1,2,2,'2024-01-15'),
(3,2,3,1,'2024-02-10'),
(4,3,4,2,'2024-02-20'),
(5,4,5,1,'2024-03-05'),
(6,5,1,1,'2024-03-10'),
(7,2,7,3,'2024-03-15'),
(8,6,2,1,'2024-04-01'),
(9,1,9,5,'2024-04-10'),
(10,8,5,2,'2024-04-15'),
(11,3,3,4,'2024-05-01'),
(12,7,10,1,'2024-05-05');

INSERT INTO Suppliers VALUES
(1,'TechCorp','USA',5),
(2,'GlobalParts','Germany',4),
(3,'AsiaSupply','China',3),
(4,'EuroTech','France',4);

INSERT INTO Inventory VALUES
(1,1,50),
(2,2,120),
(3,2,200),
(4,1,30),
(5,3,80),
(6,4,15),
(7,3,100),
(8,4,45);

INSERT INTO Projects VALUES
(1,'Website Revamp',50000,'2024-01-01','2024-06-30'),
(2,'Mobile App',120000,'2024-03-01','2024-12-31'),
(3,'Data Pipeline',75000,'2024-02-15','2024-08-15'),
(4,'CRM System',200000,'2024-04-01','2025-03-31');

INSERT INTO Assignments VALUES
(1,1,'Lead'),
(2,1,'Developer'),
(3,2,'Lead'),
(4,2,'Analyst'),
(5,3,'Developer'),
(9,3,'Tester'),
(6,4,'Lead'),
(12,4,'Manager');

INSERT INTO Payments VALUES
(1,1,200,'2024-01-20','Credit Card'),
(2,2,450,'2024-02-15','PayPal'),
(3,3,300,'2024-02-25','Credit Card'),
(4,4,150,'2024-03-10','Debit Card'),
(5,5,1200,'2024-03-12','Credit Card'),
(6,1,80,'2024-04-01','PayPal'),
(7,6,160,'2024-04-05','Credit Card'),
(8,2,60,'2024-04-12','Debit Card'),
(9,8,300,'2024-04-20','PayPal'),
(10,3,520,'2024-05-05','Credit Card');

INSERT INTO SalesLog VALUES
(1,1,5,'2024-01-10','Europe'),
(2,2,20,'2024-01-15','Europe'),
(3,3,30,'2024-01-20','Asia'),
(4,1,3,'2024-02-05','Americas'),
(5,5,10,'2024-02-15','Europe'),
(6,4,7,'2024-02-28','Americas'),
(7,2,15,'2024-03-10','Asia'),
(8,7,25,'2024-03-15','Europe'),
(9,3,18,'2024-03-20','Americas'),
(10,1,8,'2024-04-01','Asia'),
(11,5,12,'2024-04-10','Europe'),
(12,9,40,'2024-04-15','Asia'),
(13,4,5,'2024-05-01','Europe'),
(14,8,6,'2024-05-10','Americas'),
(15,10,22,'2024-05-15','Europe');

INSERT INTO EmployeeHistory VALUES
(1,1,65000,75000,'2022-01-15'),
(2,3,75000,88000,'2021-06-01'),
(3,6,80000,92000,'2020-03-20'),
(4,12,90000,105000,'2019-12-01'),
(5,2,48000,52000,'2023-01-10'),
(6,8,60000,67000,'2022-07-15');

INSERT INTO WebTraffic VALUES
(1, 1, '/home', 45, '2024-05-01 10:00:00'),
(2, 1, '/products', 120, '2024-05-01 10:00:45'),
(3, 2, '/home', 10, '2024-05-01 10:05:00'),
(4, 1, '/checkout', 300, '2024-05-01 10:02:45'),
(5, 3, '/about', 60, '2024-05-02 11:00:00'),
(6, 4, '/home', 20, '2024-05-02 11:10:00'),
(7, 4, '/products', 150, '2024-05-02 11:10:20'),
(8, 2, '/products', 90, '2024-05-03 09:00:00');

INSERT INTO Sensors VALUES
(1, 'Temperature', 'Lab A'),
(2, 'Humidity', 'Lab A'),
(3, 'Pressure', 'Lab B');

INSERT INTO SensorReadings VALUES
(1, 1, 22.5, '2024-06-01 08:00:00'),
(2, 1, 22.7, '2024-06-01 09:00:00'),
(3, 1, 23.1, '2024-06-01 10:00:00'),
(4, 2, 45.0, '2024-06-01 08:00:00'),
(5, 2, 46.2, '2024-06-01 09:00:00'),
(6, 3, 101.3, '2024-06-01 08:30:00');

INSERT INTO Authors VALUES
(1, 'Jane Austen', 'UK'),
(2, 'Mark Twain', 'USA'),
(3, 'Victor Hugo', 'France');

INSERT INTO Books VALUES
(1, 'Pride and Prejudice', 1, 1813),
(2, 'Emma', 1, 1815),
(3, 'The Adventures of Tom Sawyer', 2, 1876),
(4, 'Les Misérables', 3, 1862);

INSERT INTO BookLoans VALUES
(1, 1, 1, '2024-01-10', '2024-01-24'),
(2, 2, 2, '2024-01-15', '2024-02-15'),
(3, 1, 3, '2024-02-01', NULL),
(4, 4, 1, '2024-02-10', '2024-02-20');

INSERT INTO Demographics VALUES
(1, 'Berlin', 3645000, 45000, 42.5),
(2, 'Paris', 2148000, 48000, 41.2),
(3, 'Rome', 2873000, 39000, 45.1),
(4, 'Madrid', 3223000, 41000, 43.8),
(5, 'London', 8982000, 52000, 39.5);

`);

},

/* ==========================
   EXECUTE QUERY
   ========================== */

execute(sql){

    try{

        const result =
            this.db.exec(sql);

        return {

            success:true,

            data:result

        };

    }

    catch(error){

        return {

            success:false,

            error:error.message

        };

    }

}

};