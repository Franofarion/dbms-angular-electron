const { ipcMain } = require('electron');
const { Client } = require('pg');

type ConnectionArgs = {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
};

// Function to connect to PostgreSQL
async function connectToPostgres(connectionArgs: ConnectionArgs) {
  const client = new Client({
    user: connectionArgs.user,
    host: connectionArgs.host,
    database: connectionArgs.database,
    password: connectionArgs.password,
    port: connectionArgs.port,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    const res = await client.query('SELECT * FROM users');
    await client.end();

    console.log(res);

    return true;
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    throw error;
  }
}

// Register the IPC handler for 'get-users' in this module
ipcMain.handle('CONNECTION', async (event, args: ConnectionArgs) => {
  try {
    const users = await connectToPostgres(args);
    return users;
  } catch (error) {
    return { error: 'Failed to retrieve users' };
  }
});

// Optionally, you can export functions if needed elsewhere
module.exports = {
  connectToPostgres,
};
