import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { CommonModule } from '@angular/common';
import { UiToasterService } from '../../core/services/toaster.service';
import { environment } from '../../../environments/environment';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AppBase } from '../../../app-base.component';
import { ContextService } from '../../core/services/context.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, NgbPaginationModule]
})
export class ShopListComponent extends AppBase implements OnInit, AfterViewInit {
  products: any = [];
  stars = [1, 2, 3, 4, 5];
  categoryId: string | null = null;
  subcategoryId: string | null = null;
  subcategoryTitle: string | null = null;
  categories: any[] = [];
  imgBaseUrl: string = environment.api.base_url;
  constructor(
    private ApiService: ApiService,
    private toaster: UiToasterService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public contextService: ContextService
  ) { super() }

  async ngOnInit() {
    await this.fetchCategories();
    this.route.queryParams.subscribe(async params => {
      this.categoryId = params['categoryId'] || null;
      this.subcategoryId = params['subcategoryId'] || null;
      this.subcategoryTitle = params['title'] || null;

      if (this.categoryId) {
        console.log('Category ID:', this.categoryId);
        await this.fetchproductsWithFilter({ categoryId: this.categoryId, perPage: this.pageSize, page: this.currentPage })
      }

      if (this.subcategoryId) {
        console.log('Subcategory ID:', this.subcategoryId);
        await this.fetchproductsWithFilter({ subcategoryId: this.subcategoryId, perPage: this.pageSize, page: this.currentPage })
      }
    });
    if (!(this.categoryId || this.subcategoryId)) {
      await this.ApiService.fetcHlatestProducts({ perPage: this.pageSize, page: this.currentPage }).then((res) => {
        this.products = res?.data
        console.log(this.products)
      })
    }
  }

  async ngAfterViewInit() {
    await this.cdr.detectChanges();
  }

  async fetchCategories() {
    await this.ApiService.getCategories().then((res) => {
      this.categories = res?.categories;
      this.cdr.detectChanges()
    })
  }

  async addToCart(event: Event, id: number, i: number) {
    event.stopPropagation();
    this.products[i]['cart_details'] = this.products[i]?.cart_details ? !this.products[i]?.cart_details : true;
    if (this.contextService.user()) {
      const payload = {
        productId: id,
        quantity: 1
      }
      await this.ApiService.addToCart(payload).then(async res => {
        // await this.toaster.Success('Added to cart successfully')
      })
    }
    else {
      this.router.navigate(['/auth/sign-in'])
    }
  }

  async addToWishlist(id: any, i: any) {
    await this.ApiService.addToWishlist({ productId: id }).then(async (res) => {
      this.products[i]['is_whishlisted'] = true
    })
  }

  // async removeFromWishlist() {
  //   await this.ApiService.removeFromWishlist(

  //   ).then(async res => {
  //     await this.fetchWishlist();
  //   })
  // }

  async fetchproductsWithFilter(data: any) {
    this.products = []
    await this.ApiService.fetchFilteredProduct(data).then((res) => {
      this.products = res?.data;
    })
  }

  async onPageChange(pagenumber: any) {
    this.currentPage = pagenumber;
    if (!(this.categoryId || this.subcategoryId)) {
      await this.ApiService.fetcHlatestProducts({ perPage: this.pageSize, page: this.currentPage }).then((res) => {
        this.products = res
      })
    } else {
      if (this.subcategoryId) {
        console.log('Subcategory ID:', this.subcategoryId);
        await this.fetchproductsWithFilter({ subcategoryId: this.subcategoryId, perPage: this.pageSize, page: this.currentPage })
      }
      if (this.categoryId) {
        console.log('Category ID:', this.categoryId);
        await this.fetchproductsWithFilter({ categoryId: this.categoryId, perPage: this.pageSize, page: this.currentPage })
      }
    }
  }

}
