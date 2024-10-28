import { connectionStore } from '../store/connections-store';
import { getTables } from '../database/tables';
import { connectToPostgres } from '../database/connection';

const { ipcMain } = require('electron');

ipcMain.handle('GET_TABLES', async (event, connectionId: string) => {
  const connection = connectionStore.getConnectionById(connectionId);
  if (!connection) {
    return { error: 'Connection not found' };
  }
  const connectionClient = await connectToPostgres(connection);
  const tables = await getTables(connectionClient);
  return tables;
});
