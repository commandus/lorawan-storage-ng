import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvService } from '../service/env.service';
import { Device } from '../model/device';
import { JsonService } from '../service/json.service';
import { UrnService } from '../service/urn.service';
import { RequestGetByAddr } from '../model/request-get-by-addr';
import { RequestPutDevice } from '../model/request-put-device';
import { RequestRemoveDevice } from '../model/request-rm-device';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  standalone: true,
  styleUrls: ['./device-edit.component.scss'],
  imports: [ ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatProgressBarModule, MatButtonModule,
    MatAutocompleteModule
   ]
})
export class DeviceEditComponent implements OnInit {
  @Input() value: Device = new Device;
  
  @Output() changed = new EventEmitter<RequestPutDevice>();
  @Output() removed = new EventEmitter<RequestRemoveDevice>();
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
    private json: JsonService,
    public urn: UrnService
  ) {
    this.success = true;
  }

  ngOnInit(): void {
    this.initForm();
    if (this.route.snapshot.paramMap.has('addr')) {
      let request = new RequestGetByAddr;
      const a = this.route.snapshot.paramMap.get('addr');
      request.addr = a ? a : '0';
      this.json.getDeviceByAddr(request).subscribe(v => {
        this.value = v;
        this.initForm();
      });
    } else {
      /*
      this.urn.getSVGByAddr(this.value.addr).subscribe(v => {
        this.buildQrCode(v);
      });
      */
    }
  }

  private initForm() {
    this.formGroup = this.formBuilder.group({
      addr: [this.value ? this.value.addr : '', [ Validators.required ]],
      activation: [this.value ? this.value.activation : 'ABP', [ Validators.required ]],
      class: [this.value ? this.value.class : 'A', [ Validators.required ]],
      deveui: [this.value ? this.value.deveui : '', [ Validators.required ]],
      nwkSKey: [this.value ? this.value.nwkSKey : '', [ Validators.required ]],
      appSKey: [this.value ? this.value.appSKey : '', [ Validators.required ]],
      version: [this.value ? this.value.version : '1.0.0', [ Validators.required ]],
      appeui: [this.value ? this.value.appeui : '', [ Validators.required ]],
      appKey: [this.value ? this.value.appKey : '', [ Validators.required ]],
      nwkKey: [this.value ? this.value.nwkKey : '', [ Validators.required ]],
      devNonce: [this.value ? this.value.devNonce : '', [ Validators.required ]],
      joinNonce: [this.value ? this.value.joinNonce : '', [ Validators.required ]],
      name: [this.value ? this.value.name : '', []]
    });
   }

  cancel(): void {
    this.cancelled.emit();
  }

  save(): void {
    const r = new RequestPutDevice;
    r.code = this.app.settings.credentials.code;
    r.accessCode = this.app.settings.credentials.accessCode;

    const v = this.formGroup.getRawValue();
    r.addr = v.addr;
    r.activation = v.activation;
    r.class = v.class;
    r.deveui = v.deveui;
    r.nwkSKey = v.nwkSKey;
    r.appSKey = v.appSKey;
    r.version = v.version;
    r.appeui = v.appeui;
    r.appKey = v.appKey;
    r.nwkKey = v.nwkKey;
    r.devNonce = v.devNonce;
    r.joinNonce = v.joinNonce;
    r.name = v.name;
    // save device
    this.changed.emit(r);
  }

  /**
   * remove device
   */
  rm(): void {
    const r = new RequestRemoveDevice;
    r.code = this.app.settings.credentials.code;
    r.accessCode = this.app.settings.credentials.accessCode;
    r.addr = this.formGroup.getRawValue().addr;
    this.removed.emit(r);
  }

  showQrCode(showProprietary: boolean) {
    this.app.showQrCode(this.value, showProprietary).then(
      value => {
      }
    );
  }

}
