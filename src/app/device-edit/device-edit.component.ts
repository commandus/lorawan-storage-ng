import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnvService } from '../service/env.service';
import { Device } from '../model/device';
import { RequestChangeDevice } from '../model/request-ch-device';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonService } from '../service/json.service';
import { RequestGetByAddr } from '../model/request-get-by-addr';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  standalone: true,
  styleUrls: ['./device-edit.component.scss'],
  imports: [ ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatProgressBarModule, MatButtonModule ]
})
export class DeviceEditComponent implements OnInit {
  @Input() value: Device = new Device;
  @Output() changed = new EventEmitter<RequestChangeDevice>();
  @Output() cancelled = new EventEmitter<void>();
  
  public formGroup: FormGroup = new FormGroup({});
  public progress = false;
  
  message = '';
  success: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private app: EnvService,
    private json: JsonService
  ) {
    this.success = true;
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('addr')) {
      let request = new RequestGetByAddr;
      const a = this.route.snapshot.paramMap.get('addr');
      request.addr = a ? a : '0';
      this.json.getDeviceByAddr(request).subscribe(v => {
        this.value = v;
        this.initForm();
      });
    } else {
      this.initForm();
    }
  }

  private initForm() {
    this.formGroup = this.formBuilder.group({
      addr: [this.value ? this.value.addr : '', [ Validators.required]],
      activation: [this.value ? this.value.activation : 'ABP', [ Validators.required]],
      class: [this.value ? this.value.class : 'A', [ Validators.required]],
      deveui: [this.value ? this.value.deveui : '', [ Validators.required]],
      nwkSKey: [this.value ? this.value.nwkSKey : '', [ Validators.required]],
      appSKey: [this.value ? this.value.appSKey : '', [ Validators.required]],
      version: [this.value ? this.value.version : '1.0.0', [ Validators.required]],
      appeui: [this.value ? this.value.appeui : '', [ Validators.required]],
      appKey: [this.value ? this.value.appKey : '', [ Validators.required]],
      nwkKey: [this.value ? this.value.nwkKey : '', [ Validators.required]],
      devNonce: [this.value ? this.value.devNonce : '', [ Validators.required]],
      joinNonce: [this.value ? this.value.joinNonce : '', [ Validators.required]],
      name: [this.value ? this.value.name : '', []]
    });
   }

  cancel(): void {
    this.cancelled.emit();
  }

  save(): void {
    const r = new RequestChangeDevice;
    
    r.value.addr = this.formGroup.getRawValue().addr;
    r.value.name = this.formGroup.getRawValue().name;
    r.operationSymbol = r.value.addr ? '=' : '+';
    
    // save box
    this.changed.emit(r);
  }

  /**
   * remove box
   */
  rm(): void {
    const r = new RequestChangeDevice;
    r.operationSymbol = '-';
    r.value.addr = this.formGroup.getRawValue().addr
    this.app.confirmRmDevice(r).then(v => {
      if (v = 'y')
        this.changed.emit(r);
    })
  }
}