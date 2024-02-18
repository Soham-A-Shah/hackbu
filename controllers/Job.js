import mysql from "mysql";

export const getApplicationList = async (req, res) => {
  const { id } = req.params;
  const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  con.connect((err) => {
    if (err) throw err;
    console.log("Database Connected!");
  });

  const sql = `SELECT 
  c.company_name AS companyName,
  j.job_role AS jobRole,
  j.description AS jobDesc,
  a.date AS dateOfApplication,
  a.status AS status
FROM 
  Application a
JOIN 
  Job j ON a.job_id = j.id
JOIN 
  Company c ON j.company_id = c.id;`;
  const queryPromise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

  try {
    const result1 = await queryPromise;

    res.status(200).json({
      data: result1,
    });

  } catch (error) {
    console.error("Query error: ", error);
    res.status(500).json({
      error: "Internal server error",
    });
  } finally {
    con.end();
  }
};
