import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {
  constructor(private ApiService: ApiService) { }
  subCategories: any[] = [];

  async ngOnInit() {
    await this.fetchCategories();
  }

  async fetchCategories() {
    await this.ApiService.getCategories().then(async (res) => {
      debugger;
      this.subCategories = res?.categories[0]?.subcategories;
    })
  }
}
