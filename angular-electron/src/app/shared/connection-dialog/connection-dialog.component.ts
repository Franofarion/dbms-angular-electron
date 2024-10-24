import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-connection-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule],
  templateUrl: './connection-dialog.component.html',
  styleUrl: './connection-dialog.component.scss'
})
export class ConnectionDialogComponent {

}
