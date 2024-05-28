import { Component } from '@angular/core';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [RouterOutlet, TopMenuComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {

}
