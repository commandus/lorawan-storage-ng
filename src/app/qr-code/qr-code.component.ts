import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Device } from '../model/device';
import { UrnService } from '../service/urn.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [ MatButtonModule ],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.scss'
})
export class QrCodeComponent {
  @Output() cancelled = new EventEmitter<void>();
  @Input() value: Device = new Device;
  @Input() qrProprietary = false;

  constructor(
    public urn: UrnService
  ) {
  }

  qrSrc(v: string) : string {
    if (this.qrProprietary)
      return this.urn.urlProprietary(v);
    else
    return this.urn.url(v);
  }

  cancel(): void {
    this.cancelled.emit();
  }

}
