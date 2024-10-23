import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';
import { EVENT } from '../../../shared/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private electronService: ElectronService
  ) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

  testConnection() {
    this.electronService.ipcRenderer.invoke(EVENT.CONNECTION);
  }
}
