import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  standalone: true,
  styleUrls: ['./dialog-confirm.component.scss'],
  imports: [MatIconModule, MatPaginatorModule, MatDialogModule],
})
export class DialogConfirmComponent implements OnInit {
  title: string;
  message: string;

  constructor(
    private dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data : { title: string, message: string }
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }

  ok() {
    this.dialogRef.close({yes: true});
  }

  cancel() {
    this.dialogRef.close({yes: false});
}

}
