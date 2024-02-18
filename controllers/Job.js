import mysql from "mysql";

export const getApplicationList = () => {

    const con = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        // port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
      });
    
      con.connect((err) => {
        if (err) throw err;
        console.log("Database Connected!");
      });

    const sql = "select * from student;";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
}