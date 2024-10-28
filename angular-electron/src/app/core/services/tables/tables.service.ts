import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ElectronService } from '../electron/electron.service';
import { Table } from './tables';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  constructor(private electronService: ElectronService) {}

  async getTablesFromConnection(connectionId: string): Promise<Table[]> {
    const tables = this.electronService.ipcRenderer.invoke(
      'GET_TABLES',
      connectionId
    );
    return tables;
  }
}
