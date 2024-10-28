export async function getTables(connectionClient: any) {
  const result = await connectionClient.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
  );
  return result.rows;
}
