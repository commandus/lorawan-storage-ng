import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Device } from '../model/device';
import { RequestPutDevice } from '../model/request-put-device';
import { DeviceEditComponent } from '../device-edit/device-edit.component';
import { RequestRemoveDevice } from '../model/request-rm-device';

@Component({
  selector: 'app-device-edit-dialog',
  standalone: true,
  templateUrl: './device-edit-dialog.component.html',
  styleUrls: ['./device-edit-dialog.component.scss'],
  imports: [ DeviceEditComponent ]
})
export class DeviceEditDialogComponent {
  @Output() changed = new EventEmitter<RequestPutDevice>();
  @Output() removed = new EventEmitter<RequestRemoveDevice>();
  @Output() cancelled = new EventEmitter<void>();
  title: string;
  message: string;
  value: Device;

  constructor(
    private dialogRef: MatDialogRef<DeviceEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {title: string, message: string, value?: Device}
  ) {
    this.title = data.title;
    this.message = data.message;
    this.value = data.value ? data.value : new Device();
  }

  onChanged(value: RequestPutDevice) {
    this.changed.emit(value);
    this.dialogRef.close( { yes: true } );
  }

  onRemoved(value: RequestRemoveDevice) {
    this.removed.emit(value);
    this.dialogRef.close( { yes: true } );
  }

  onCancel() {
    this.cancelled.emit();
    this.dialogRef.close( { yes: false } );
  }

}
