const { EVENT } = require("../../shared/event");

const { ipcMain } = require('electron');
const { Client } = require('pg');

// Function to connect to PostgreSQL
async function connectToPostgres() {
  const client = new Client({
    user: 'user',
    host: 'localhost',
    database: 'testdb',
    password: 'password',
    port: 5432
  });

  try {
    await client.connect();
    console.log("Connected to PostgreSQL");

    const res = await client.query('SELECT * FROM users');
    await client.end();

    console.log(res);

    return true;
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    throw error;
  }
}

// Register the IPC handler for 'get-users' in this module
ipcMain.handle(EVENT.CONNECTION, async () => {
  try {
    const users = await connectToPostgres();
    return users;
  } catch (error) {
    return { error: 'Failed to retrieve users' };
  }
});

// Optionally, you can export functions if needed elsewhere
module.exports = {
  connectToPostgres
};