import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Credentials } from '../model/credentials';
import { LoginComponent } from '../login/login.component';
import { EnvService } from '../service/env.service';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  standalone: true,
  imports: [LoginComponent],
  styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent {
  @Output() logged = new EventEmitter<Credentials>();
  @Output() cancelled = new EventEmitter<void>();
  title: string;
  message: string;
  credentials: Credentials;

  constructor(
    private dialogRef: MatDialogRef<DialogLoginComponent>,
    public env: EnvService,
    @Inject(MAT_DIALOG_DATA) data: {title: string, message: string, credentials?: Credentials }
  ) {
    this.title = data.title;
    this.message = data.message;
    this.credentials = data.credentials ? data.credentials : new Credentials();
  }

  onLogged(value: Credentials) {
    this.env.settings.credentials = value;
    this.env.settings.save();
    this.logged.emit(value);
    if (value) {
      this.dialogRef.close( { yes: true } );
    }
  }

  onCancel() {
    this.cancelled.emit();
    this.dialogRef.close( { yes: false } );
  }

}
