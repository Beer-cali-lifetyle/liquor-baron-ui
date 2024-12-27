import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  subCategories: any[] = [];
  isNavbarCollapsed: boolean = true; 
  mainNavClass = 'main-nav'; // Default class for navigation
  scrolledClass = 'main-nav-scrolled'; // Class to add on scroll
  headerHeight: number = 0; // To store header height dynamically

  constructor(private ApiService: ApiService, private router: Router) {}

  async ngOnInit() {
    await this.fetchCategories();
  }

  ngAfterViewInit() {
    const headerElement = document.querySelector('header') as HTMLElement;
    if (headerElement) {
      this.headerHeight = headerElement.offsetHeight;
    }
  }

  async fetchCategories() {
    await this.ApiService.getCategories().then(async (res) => {
      this.subCategories = res?.categories[0]?.subcategories;
    });
  }

  redirectToShopList(type: string, id: number, title: string) {
    if (type === 'category') {
      this.router.navigate(['/shop'], { queryParams: { categoryId: id, title: title } });
    } else if (type === 'subcategory') {
      this.router.navigate(['/shop'], { queryParams: { subcategoryId: id, title: title } });
    }
    this.isNavbarCollapsed = true; 
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navElement = document.querySelector('.main-nav') as HTMLElement;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > this.headerHeight) {
      navElement.classList.add(this.scrolledClass);
    } else {
      navElement.classList.remove(this.scrolledClass);
    }
  }

}