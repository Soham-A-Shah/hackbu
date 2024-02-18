import mysql from "mysql";
import { executePythonScript, insertIntoMySQL } from './Python.js'

export const getApplicationList = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
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
  j.company_name AS companyName,
  j.job_role AS jobRole,
  j.description AS jobDesc,
  a.date AS dateOfApplication,
  a.status AS status
FROM 
  Application a
JOIN 
  Job j ON a.job_id = j.id;`;
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
import path from "path";

export const executeScrapping = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log(req.body)
  const { url } = req.body;

  try {
    console.log("hello from execute")
    executePythonScript(path.resolve('../hackbu/pythonScripts/testopenapi.py'), url)
    .then((output) => {
      // Assuming the Python script outputs data in JSON format
      console.log(output)
      // const parsedData = JSON.parse(output);
      // Insert the parsed data into MySQL database
      // insertIntoMySQL(parsedData);
      res.status(200).json({
        message: "Success"
      })
    })
    .catch((error) => {
    console.log("hello from error :::   ")

      console.error("Error executing Python script:", error);
    });

    
  } catch (err) {
    console.log(err)
    res.status(400).json({
      message: "U r a failure like Naruto"
    })
  }

  res.status(200).json({
    message: "Success"
  })
}
