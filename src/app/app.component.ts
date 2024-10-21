import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/ui/loader/loader.component';
import { ToasterComponent } from './shared/ui/toaster/toaster.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoaderComponent,ToasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'liquor-baron';
}
