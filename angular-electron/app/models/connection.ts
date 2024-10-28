export type ConnectionArgs = {
  user: string;
  name?: string;
  host: string;
  database: string;
  password: string;
  port: number;
};

export type Connection = ConnectionArgs & {
  id: string;
};
