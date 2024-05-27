const sequelize = require("../config/database");

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Create the database if it doesn't exist
    await sequelize.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "todo-list"}`
    );
    await sequelize.sync(); // This will create the tables if they don't exist
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();
