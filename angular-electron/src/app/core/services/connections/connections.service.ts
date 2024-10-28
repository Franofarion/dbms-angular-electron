import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ElectronService } from '../electron/electron.service';
import { Connection } from './connections';

@Injectable({
  providedIn: 'root',
})
export class ConnectionsService {
  private connections = new BehaviorSubject<Connection[]>([]);
  connections$ = this.connections.asObservable();

  constructor(private electronService: ElectronService) {}

  addConnection(connection: Connection) {
    this.electronService.ipcRenderer
      .invoke('CONNECTION', connection)
      .then((res) => {
        console.log(res);
      });
    this.getSavedConnections();
  }

  getSavedConnections() {
    console.log('getSavedConnections');
    this.electronService.ipcRenderer
      .invoke('GET_CONNECTIONS')
      .then((connections: Connection[]) => this.connections.next(connections));
  }
}
