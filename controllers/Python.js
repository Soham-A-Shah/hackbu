import { spawn } from "child_process";
import mysql from "mysql";


// Define the path to your Python script
const pythonScriptPath = "../python_scripts/your_script.py";

// Define arguments to pass to the Python script if needed
const pythonArgs = ["arg1", "arg2"]; // Modify as needed

// Function to execute the Python script
export const executePythonScript = (scriptPath, args) => {
  return new Promise((resolve, reject) => {
    // Spawn a child process to execute the Python script
    console.log("here");
    console.log(scriptPath);
    const pythonProcess = spawn("python", [scriptPath, ...args]);

    let output = ""; // Variable to capture script output

    // Listen for output from the Python script
    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Listen for errors from the Python script
    pythonProcess.stderr.on("data", (data) => {
      reject(`Error from Python script: ${data.toString()}`);
    });

    // Listen for process exit event
    pythonProcess.on("close", (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(`Python script exited with code ${code}`);
      }
    });
  });
};

// Function to insert data into MySQL database
export const insertIntoMySQL = async (data) => {
  try {
    // Create MySQL connection
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    });

    // Insert data into MySQL table
    await connection.execute(
      "INSERT INTO your_table_name (column1, column2, ...) VALUES (?, ?, ...)",
      [data.field1, data.field2]
    );

    // Close MySQL connection
    await connection.end();
  } catch (error) {
    console.error("Error inserting into MySQL:", error);
  }
};
