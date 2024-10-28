import { Connection } from '../models/connection';
import { FileStorage } from './file-storage';

const FILE_NAME = 'connections';

class ConnectionStore {
  private static instance: ConnectionStore;
  private storage: FileStorage<{ connections: Connection[] }>;
  private connections: Connection[];

  private constructor() {
    this.storage = new FileStorage<{ connections: Connection[] }>(FILE_NAME);
    this.connections = this.storage.load().connections || [];
  }

  // Singleton instance method
  public static getInstance(): ConnectionStore {
    if (!ConnectionStore.instance) {
      ConnectionStore.instance = new ConnectionStore();
    }
    return ConnectionStore.instance;
  }

  // Add a new connection
  public addConnection(connection: Omit<Connection, 'id'>) {
    const newConnection = { id: this.generateId(), ...connection };
    this.connections.push(newConnection);
    this.storage.save({ connections: this.connections });
  }

  // Get all connections
  public getConnections(): Connection[] {
    return this.connections;
  }

  // Get a single connection by ID
  public getConnectionById(id: string): Connection | undefined {
    return this.connections.find((conn) => conn.id === id);
  }

  // Delete a connection by ID
  public deleteConnection(id: string) {
    this.connections = this.connections.filter((conn) => conn.id !== id);
    this.storage.save({ connections: this.connections });
  }

  // Generate a unique ID for each connection
  private generateId(): string {
    return crypto.randomUUID();
  }
}

// Export singleton instance
export const connectionStore = ConnectionStore.getInstance();
