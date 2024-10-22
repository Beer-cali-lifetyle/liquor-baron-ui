import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  ngOnInit() {
    const myCarousel = document.querySelector('#homepageCarousel');
    if (myCarousel) {
      new bootstrap.Carousel(myCarousel, {
        interval: 3000, 
        ride: 'carousel'
      });
    }
  }

}
