import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { EnvService } from '../service/env.service';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {
  public version = '';

  constructor(
    private router: Router,
    public env: EnvService
  )
  {
  }

  ngOnInit(): void {
    // this.env.calc.version().subscribe(v => this.version = v.version);
    this.version = '1.0';
  }


  nav(path: string): void {
    this.router.navigateByUrl(path);
  }
}
