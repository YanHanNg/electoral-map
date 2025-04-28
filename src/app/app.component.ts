import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ElectoralMapComponent } from './electoral-map/electoral-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ElectoralMapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'electoral-map';
}
