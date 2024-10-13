import { Component } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,RouterOutlet],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss'
})
export class BaseLayoutComponent {

}
