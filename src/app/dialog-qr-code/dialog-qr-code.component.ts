import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Credentials } from '../model/credentials';
import { EnvService } from '../service/env.service';
import { QrCodeComponent } from '../qr-code/qr-code.component';
import { Device } from '../model/device';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-qr-code.component.html',
  standalone: true,
  imports: [QrCodeComponent],
  styleUrls: ['./dialog-qr-code.component.scss']
})
export class DialogQrCodeComponent {
  @Output() logged = new EventEmitter<Credentials>();
  @Output() cancelled = new EventEmitter<void>();
  public title: string;
  public value: Device;
  public qrProprietary = false;

  constructor(
    private dialogRef: MatDialogRef<DialogQrCodeComponent>,
    public env: EnvService,
    @Inject(MAT_DIALOG_DATA) data: {title: string, value?: Device, qrProprietary?: boolean }
  ) {
    this.title = data.title;
    this.value = data.value ? data.value : new Device();
    this.qrProprietary = data.qrProprietary ? data.qrProprietary : false;
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
