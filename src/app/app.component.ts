import { Component, HostBinding } from '@angular/core';
import { ControlPanelComponent } from './control-panel/control-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ControlPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
