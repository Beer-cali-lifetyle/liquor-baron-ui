import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit, ChangeDetectorRef } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SharedModule } from '../../shared/shared/shared.module';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ContextService } from '../../core/services/context.service';
import { AppBase } from '../../../app-base.component';
declare var Isotope: any



@Component({
  imports: [
    CommonModule,
    SharedModule,
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent extends AppBase implements OnInit {
  categories: any;
  products: any = [];
  currentYear: number = new Date().getFullYear();
  imgBaseUrl: string = environment.api.base_url;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private ApiService: ApiService,
    private router: Router,
    private contextService: ContextService,
    private cdr: ChangeDetectorRef) {
    super();
  }

  async ngOnInit() {
    await this.fetchCategories();
    await this.fetchProducts();
  }

  redirectToShopList(type: string, id: number) {
    if (type === 'category') {
      this.router.navigate(['/shop'], { queryParams: { categoryId: id } });
    } else if (type === 'subcategory') {
      this.router.navigate(['/shop'], { queryParams: { subcategoryId: id } });
    }
  }

  get hasCategories(): boolean {
    return this.categories?.length > 0;
  }


  async fetchCategories() {
    await this.ApiService.getCategories().then(async (res) => {
      this.categories = res?.categories;
    })
  }

  async fetchProducts() {
    await this.ApiService.fetcHlatestProducts({ perPage: 8, page: this.currentPage }).then(res => {
      this.products = res?.data;
    })
  }

  async addToCart(event: Event, id: number, i: number) {
    event.stopPropagation();
    this.products[i]['addedTocart'] = this.products[i]?.addedTocart ? !this.products[i]?.addedTocart : true;
    if (this.contextService.user()) {
      const payload = {
        productId: id,
        quantity: 1
      }
      await this.ApiService.addToCart(payload).then(async res => {
        await this.getCart();
        // await this.toaster.Success('Added to cart successfully')
      })
    }
    else {
      this.router.navigate(['/auth/sign-in'])
    }
  }

  async getCart() {
    if (this.contextService.user()) {
      await this.ApiService.getCartProducts().then((res) => {
        this.contextService.cart.set(res)
      })
    }
  }

  async addToWishlist(id: any, i: number) {
    if (this.contextService.user()) {
      const payload = {
        productId: id
      }
      this.products[i]['wishlisted'] = true;
      await this.ApiService.addToWishlist(payload).then(async (res) => {
        // await this.fetchWishlist();
      })
    } else {
      this.router.navigate(['/auth/sign-in'])
    }
  }


  async removFromWishlist(id: any, i: number) {
    if (this.contextService.user()) {
      const payload = {
        productId: id
      }
      this.products[i]['wishlisted'] = false;
      await this.ApiService.removeFromWishlist(payload).then(async (res) => {
        // await this.fetchWishlist();
      })
    } else {
      this.router.navigate(['/auth/sign-in'])
    }
  }


}
