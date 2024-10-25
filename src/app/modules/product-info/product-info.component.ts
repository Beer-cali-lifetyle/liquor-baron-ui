import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { AppBase } from '../../../app-base.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UiToasterService } from '../../core/services/toaster.service';
import { ContextService } from '../../core/services/context.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ProductInfoComponent extends AppBase implements OnInit {
  productInfo: any;
  cartInfo: any;
  quantity: number = 1;
  wishlist: any;
  imgBaseUrl: string = environment.api.base_url;
  mainProductImage: string = '';
  relatedProducts: any = [];
  constructor(private ApiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toaster: UiToasterService,
    public contextService: ContextService
  ) {
    super();
    this.checkMode(this.activatedRoute.snapshot.params);
  }

  async ngOnInit() {
    await this.ApiService.fetchProduct(this.id).then(async (res) => {
      this.productInfo = res
      this.mainProductImage = res?.product?.product_image
      await this.getCart();
      await this.fetchWishlist();
      await this.fetchRelatedProducts();
    })
  }

  increment() {
    this.quantity++;
    if (this.cartInfo?.id) {
      this.updateQuantity();
    }
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      if (this.cartInfo?.id) {
        this.updateQuantity();
      }
    }
  }

  async addToCart(id: any, i?: number) {
    if (this.contextService.user()) {
      if (i) {
        this.relatedProducts[i]['addedTocart'] = true;
      } const payload = {
        productId: id,
        quantity: this.quantity
      }
      await this.ApiService.addToCart(payload).then(async res => {
        await this.getCart();
        await this.toaster.Success('Added to cart successfully')
      })
    } else {
      this.router.navigate(['/auth/sign-in'])
    }
  }

  selectImageToShow(e: any) {
    this.mainProductImage = e;
  }

  async getCart() {
    if (this.contextService.user()) {
      await this.ApiService.getCartProducts().then((res) => {
        this.contextService.cart.set(res)
        res?.data?.map((item: any) => {
          
          if (item?.product?.id === this.productInfo?.product?.id) {
            this.cartInfo = item
            this.quantity = item?.quantity;
          }
        })
      })
    }
  }

  async updateQuantity() {
    const payload = {
      quantity: this.quantity
    }
    await this.ApiService.updateQuantity(payload, this.cartInfo?.id).then(async res => {
      await this.getCart()
    })
  }

  async addToWishlist(id: any) {
    debugger;
    if (this.contextService.user()) {
      const payload = {
        productId: id
      }
      await this.ApiService.addToWishlist(payload).then(async (res) => {
        await this.fetchWishlist();
      })
    } else {
      this.router.navigate(['/auth/sign-in'])
    }
  }

  async fetchWishlist() {
    if (this.contextService.user()) {
      this.wishlist = null;
      await this.ApiService.fetchWishlist().then(res => {
        res?.data?.map((item: any) => {
          if (item?.product?.id === this.productInfo?.id) {
            this.wishlist = item;
          }
        })
      })
    }
  }

  async fetchRelatedProducts() {
    await this.ApiService.fetchFilteredProduct({ categoryId: this.productInfo?.product?.cat_id, perPage: 10, page: 1 }).then((res) => {
      this.relatedProducts = res?.data;
    })
  }

  async removeFromWishlist() {
    await this.ApiService.removeFromWishlist(this.wishlist?.id).then(async res => {
      await this.fetchWishlist();
    })
  }

}
