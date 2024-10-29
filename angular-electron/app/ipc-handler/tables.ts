import { connectionStore } from '../store/connections-store';
import { getTableDefinition, getTables } from '../database/tables';
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

ipcMain.handle(
  'GET_TABLE_DEFINITION',
  async (event, connectionId: string, tableName: string) => {
    console.log(connectionId, tableName);
    const connection = connectionStore.getConnectionById(connectionId);
    if (!connection) {
      return { error: 'Connection not found' };
    }
    const connectionClient = await connectToPostgres(connection);
    const tableDefinition = await getTableDefinition(
      connectionClient,
      tableName
    );
    return tableDefinition;
  }
);
