// app/db.js

const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Connection string
const connectionString = process.env.PG_CONNECTION_STRING;

// Create a new PostgreSQL client
const client = new Client({
  connectionString: connectionString,
});

// Connect to PostgreSQL
const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};

module.exports = { client, connectToDatabase };
