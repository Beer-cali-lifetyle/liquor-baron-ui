import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  standalone: true,
  imports: [
    CommonModule, RouterModule
  ]
})
export class ShopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
