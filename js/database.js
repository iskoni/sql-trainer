window.Database = {

    db: null,

    async init(){

        const SQL = await initSqlJs({
            locateFile: f =>
            `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${f}`
        });

        this.SQL = SQL;

        this.db = new SQL.Database();

        this.seed();

    },

    reset(){

        if(this.db){
            this.db.close();
        }

        this.db = new this.SQL.Database();

        this.seed();

    },

    seed(){

        this.db.run(`

/* =========================
   CORE TABLES
========================= */

CREATE TABLE Departments(
    id INTEGER PRIMARY KEY,
    name TEXT
);

CREATE TABLE Employees(
    id INTEGER PRIMARY KEY,
    name TEXT,
    salary INTEGER,
    department_id INTEGER
);

CREATE TABLE Customers(
    id INTEGER PRIMARY KEY,
    name TEXT,
    city TEXT
);

CREATE TABLE Products(
    id INTEGER PRIMARY KEY,
    name TEXT,
    price INTEGER,
    category_id INTEGER
);

CREATE TABLE Categories(
    id INTEGER PRIMARY KEY,
    name TEXT
);

CREATE TABLE Orders(
    id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    product_id INTEGER,
    quantity INTEGER
);

CREATE TABLE Suppliers(
    id INTEGER PRIMARY KEY,
    name TEXT,
    country TEXT
);

CREATE TABLE Inventory(
    product_id INTEGER,
    supplier_id INTEGER,
    stock INTEGER
);

CREATE TABLE Projects(
    id INTEGER PRIMARY KEY,
    name TEXT,
    budget INTEGER
);

CREATE TABLE Assignments(
    employee_id INTEGER,
    project_id INTEGER
);

CREATE TABLE Payments(
    id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    amount INTEGER
);

/* =========================
   SEED DATA
========================= */

INSERT INTO Departments VALUES
(1,'Engineering'),
(2,'Sales'),
(3,'HR');

INSERT INTO Employees VALUES
(1,'Alice',75000,1),
(2,'Bob',52000,2),
(3,'Charlie',88000,1),
(4,'Diana',61000,3),
(5,'Ethan',47000,2);

INSERT INTO Customers VALUES
(1,'John','Berlin'),
(2,'Maria','Paris'),
(3,'Lucas','Rome');

INSERT INTO Categories VALUES
(1,'Electronics'),
(2,'Office'),
(3,'Gaming');

INSERT INTO Products VALUES
(1,'Laptop',1200,1),
(2,'Keyboard',80,2),
(3,'Mouse',40,2),
(4,'Monitor',300,1);

INSERT INTO Orders VALUES
(1,1,1,1),
(2,1,2,2),
(3,2,3,1),
(4,3,4,2);

INSERT INTO Suppliers VALUES
(1,'TechCorp','USA'),
(2,'GlobalParts','Germany');

INSERT INTO Inventory VALUES
(1,1,50),
(2,2,120),
(3,2,200),
(4,1,30);

INSERT INTO Projects VALUES
(1,'Website Revamp',50000),
(2,'Mobile App',120000);

INSERT INTO Assignments VALUES
(1,1),
(2,1),
(3,2),
(4,2);

INSERT INTO Payments VALUES
(1,1,200),
(2,2,450),
(3,3,300);

        `);

    },

    execute(sql){

        try{

            const result =
                this.db.exec(sql);

            return {
                success:true,
                data:result
            };

        }catch(err){

            return {
                success:false,
                error:err.message
            };

        }

    }

};