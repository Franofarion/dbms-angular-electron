export async function getTables(connectionClient: any) {
  const result = await connectionClient.query(
    `SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'`
  );
  return result.rows;
}

export async function getTableDefinition(
  connectionClient: any,
  tableName: string
) {
  const result = await connectionClient.query(
    `SELECT column_name, data_type, character_maximum_length
     FROM information_schema.columns 
     WHERE table_name = '${tableName}'`
  );
  return result.rows;
}
