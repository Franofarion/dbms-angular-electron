import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService } from '../../core/services/dialog/dialog.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ElectronService } from '../../core/services';

@Component({
  selector: 'app-connection-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
  ],
  templateUrl: './connection-dialog.component.html',
})
export class ConnectionDialogComponent implements OnInit {
  visible = false;
  formGroup: FormGroup | undefined;

  constructor(
    private dialogService: DialogService,
    private electronService: ElectronService
  ) {}

  ngOnInit(): void {
    this.dialogService.dialogVisible$.subscribe(
      (visible) => (this.visible = visible)
    );

    this.formGroup = new FormGroup({
      host: new FormControl<string | null>('localhost'),
      port: new FormControl<string | null>('5432'),
      user: new FormControl<string | null>('user'),
      database: new FormControl<string | null>('testdb'),
      password: new FormControl<string | null>('password'),
    });
  }

  closeDialog() {
    this.dialogService.closeDialog();
  }

  connect() {
    console.log(this.formGroup?.getRawValue());
    this.electronService.ipcRenderer
      .invoke('CONNECTION', {
        ...this.formGroup?.getRawValue(),
        port: Number(this.formGroup?.get('port')?.value),
      })
      .then((res) => {
        console.log(res);
      });
  }
}
