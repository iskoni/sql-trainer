/* GLOBAL DATABASE MODULE */

window.Database = {

    db: null,

    async init(){

        try{

            const SQL = await initSqlJs({
                locateFile: file =>
                `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
            });

            this.db = new SQL.Database();

            this.seed();

            console.log("SQLite database initialized.");

        }catch(err){

            console.error(err);

            throw err;
        }

    },

    seed(){

        this.db.run(`

        /* =======================
           DEPARTMENTS
        ======================= */

        CREATE TABLE Departments(
            id INTEGER PRIMARY KEY,
            department_name TEXT
        );

        INSERT INTO Departments VALUES
        (1,'Engineering'),
        (2,'Sales'),
        (3,'HR'),
        (4,'Marketing');

        /* =======================
           EMPLOYEES
        ======================= */

        CREATE TABLE Employees(
            id INTEGER PRIMARY KEY,
            name TEXT,
            salary INTEGER,
            department_id INTEGER
        );

        INSERT INTO Employees VALUES
        (1,'Alice',72000,1),
        (2,'Bob',54000,2),
        (3,'Charlie',88000,1),
        (4,'Diana',61000,3),
        (5,'Ethan',47000,4);

        /* =======================
           PRODUCTS
        ======================= */

        CREATE TABLE Products(
            id INTEGER PRIMARY KEY,
            product_name TEXT,
            price INTEGER,
            stock INTEGER
        );

        INSERT INTO Products VALUES
        (1,'Laptop',1200,14),
        (2,'Keyboard',70,55),
        (3,'Monitor',350,22),
        (4,'Mouse',30,95);

        /* =======================
           CUSTOMERS
        ======================= */

        CREATE TABLE Customers(
            id INTEGER PRIMARY KEY,
            customer_name TEXT,
            city TEXT
        );

        INSERT INTO Customers VALUES
        (1,'John','Berlin'),
        (2,'Maria','Paris'),
        (3,'Lucas','Rome'),
        (4,'Sophia','Madrid');

        /* =======================
           ORDERS
        ======================= */

        CREATE TABLE Orders(
            id INTEGER PRIMARY KEY,
            customer_id INTEGER,
            product_id INTEGER,
            quantity INTEGER
        );

        INSERT INTO Orders VALUES
        (1,1,1,1),
        (2,2,2,3),
        (3,3,3,2),
        (4,1,4,5);

        `);

    },

    execute(query){

        try{

            const result = this.db.exec(query);

            return {
                success:true,
                data:result
            };

        }catch(error){

            return {
                success:false,
                error:error.message
            };

        }

    },

    reset(){

        this.db.close();

        this.db = null;

        return this.init();

    }

};