import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { DialogService } from '../core/services/dialog/dialog.service';
import { ConnectionsService } from '../core/services/connections/connections.service';
import { Connection } from '../core/services/connections/connections';
import { TablesService } from '../core/services/tables/tables.service';
import { TreeNode } from 'primeng/api';

type ConnectionTree = Connection & Partial<TreeNode>;

const ICON_CONNECTION = 'pi pi-fw pi-database';
const ICON_TABLE = 'pi pi-fw pi-table';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  connections: ConnectionTree[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private dialogService: DialogService,
    private connectionService: ConnectionsService,
    private tablesService: TablesService
  ) {}

  ngOnInit(): void {
    this.getSavedConnections();
    this.connectionService.connections$.subscribe((connections) => {
      console.log(connections);
      this.connections = connections.map((conn) => ({
        ...conn,
        loading: false,
        icon: ICON_CONNECTION,
        key: conn.id,
        label: conn.name,
        leaf: false,
      }));
    });
  }

  getSavedConnections() {
    this.connectionService.getSavedConnections();
  }

  showConnectionDialog() {
    this.dialogService.openDialog();
  }

  async onExpend(event: any) {
    console.log(event.node);
    if (event.node.parent && !event.node.children) {
      return this.onTableExpend(event);
    }
    if (!event.node.children) {
      this.onConnectionExpend(event);
    }
  }

  async onConnectionExpend(event: any) {
    event.node.loading = true;

    let _node = { ...event.node };
    const index = this.connections.findIndex((conn) => conn.key === _node.key);

    try {
      const tables = await this.tablesService.getTablesFromConnection(_node.id);

      _node.children = tables.map((table) => ({
        ...table,
        icon: ICON_TABLE,
        key: table.table_name,
        label: table.table_name,
        leaf: false,
      }));

      this.connections[index] = { ..._node, loading: false };
    } catch (error) {
      console.error(error);
      this.connections[index] = { ..._node, loading: false };
    }
  }

  async onTableExpend(event: any) {
    event.node.loading = true;

    let _node = { ...event.node };
    const parentIndex = this.connections.findIndex(
      (conn) => conn.key === _node.parent.key
    );
    const index = this.connections[parentIndex]?.children?.findIndex(
      (conn) => conn.key === _node.key
    );

    try {
      const tableDefinitions = await this.tablesService.getTableDefinition(
        _node.parent.id,
        _node.label
      );

      _node.children = tableDefinitions.map((tableDef) => ({
        // icon: ICON_TABLE,
        ...tableDef,
        key: tableDef.column_name,
        label: tableDef.column_name,
      }));

      if (this.connections[parentIndex]?.children) {
        console.log(this.connections[parentIndex]);
        // @ts-ignore
        this.connections[parentIndex].children[index] = {
          ..._node,
          loading: false,
        };
      }
    } catch (error) {
      console.error(error);
      if (this.connections[parentIndex]?.children) {
        // @ts-ignore
        this.connections[parentIndex].children[index] = {
          ..._node,
          loading: false,
        };
      }
    }
  }
}
