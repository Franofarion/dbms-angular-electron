import { connectToPostgres } from '../database/connection';
import { ConnectionArgs } from '../models/connection';
import { connectionStore } from '../store/connections-store';

const { ipcMain } = require('electron');

// Function to connect to PostgreSQL

// Register the IPC handler for 'get-users' in this module
ipcMain.handle('CONNECTION', async (event, args: ConnectionArgs) => {
  try {
    const conn = await connectToPostgres(args);
    if (!conn) {
      return { error: 'Failed to connect to PostgreSQL' };
    }
    connectionStore.addConnection(args);
    const connections = connectionStore.getConnections();
    return connections;
  } catch (error) {
    return {
      error: 'Unexpected error. Failed to connect to PostgreSQL - ' + error,
    };
  }
});

ipcMain.handle('GET_CONNECTIONS', async (event) => {
  const connections = connectionStore.getConnections();
  return connections;
});
