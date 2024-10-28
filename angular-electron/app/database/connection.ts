import { ConnectionArgs } from '../models/connection';

const { Client } = require('pg');

export async function connectToPostgres(connectionArgs: ConnectionArgs) {
  const client = new Client({
    user: connectionArgs.user,
    host: connectionArgs.host,
    database: connectionArgs.database,
    password: connectionArgs.password,
    port: connectionArgs.port,
  });

  try {
    await client.connect();
    return client;
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    return false;
  }
}
