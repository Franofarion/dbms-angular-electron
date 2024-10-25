// TODO : refactor to handle multiple dialogs
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogVisible = new BehaviorSubject<boolean>(false);
  dialogVisible$ = this.dialogVisible.asObservable();

  openDialog() {
    this.dialogVisible.next(true);
  }

  closeDialog() {
    this.dialogVisible.next(false);
  }
}
