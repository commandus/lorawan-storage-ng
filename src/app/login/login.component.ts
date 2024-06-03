import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { Credentials } from '../model/credentials';
import { JsonService } from '../service/json.service';
import { RequestCloseResources } from '../model/request-close-resources';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { EnvService } from '../service/env.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatProgressBarModule, MatButtonModule ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() credentials: Credentials = new Credentials;
  @Output() logged = new EventEmitter<Credentials>();
  @Output() cancelled = new EventEmitter<void>();
  public formGroup: FormGroup = new FormGroup({});
  public progress = false;
  message = 'Попробуйте 2a/2a';
  success: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private json: JsonService,
    private env: EnvService
  ) {
    this.success = false;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.formGroup = this.formBuilder.group({
      login: [this.credentials ? this.credentials.code : '',
        [ Validators.required ]],
      password: [this.credentials ? this.credentials.accesscode : '',
        [ Validators.required ]
      ]
    });
   }

  cancel(): void {
    this.cancelled.emit();
  }

  login(): void {
    this.progress = true;
    const r = new RequestCloseResources;
    const v = this.formGroup.getRawValue();
    r.code = v.login;
    r.accessCode = v.password;
    this.json.closeResources(r).subscribe(
      value => {
        this.progress = false;
        if (value) {
          this.success = true;
          this.message = 'Success';
          this.logged.emit(this.credentials);
        } else {
          this.success = false;
          this.message = 'Try again';
          // this.cancelled.emit();
        }
      },
      error => {
        this.progress = false;
        this.success = false;
        this.message = 'Please try again';
        // this.cancelled.emit();
      });
  }

}
