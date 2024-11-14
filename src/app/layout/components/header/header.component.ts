import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
  constructor(private ApiService: ApiService, private router: Router) { }
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

  redirectToShopList(type: string, id: number, title: string) {
    if (type === 'category') {
      this.router.navigate(['/shop'], { queryParams: { categoryId: id, title: title } });
    } else if (type === 'subcategory') {
      this.router.navigate(['/shop'], { queryParams: { subcategoryId: id, title: title } });
    }
  }

}
