import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProductInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
