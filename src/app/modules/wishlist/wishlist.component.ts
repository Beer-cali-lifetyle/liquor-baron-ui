import { Component, OnInit } from '@angular/core';
import { ScriptLoadComponent } from "../script-load/script-load.component";
import { ApiService } from '../../shared/services/api.service';
import { Console } from 'console';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UiToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  standalone: true,
  imports: [ScriptLoadComponent, CommonModule, RouterModule]
})
export class WishlistComponent implements OnInit {
  wishLstItems: any;
  imgBaseUrl: string = environment.api.base_url;
  constructor(
    private ApiService: ApiService,
    private toaster: UiToasterService
  ) { }

  async ngOnInit() {
    await this.fetchWishList()
  }

  async fetchWishList() {
    await this.ApiService.fetchWishList().then((res) => {
      this.wishLstItems = res
      console.log(this.wishLstItems)
    })
  }

  async addToCart(id: any) {
    const payload = {
      productId: id,
      quantity: 1
    }
    await this.ApiService.addToCart(payload).then(async res => {
      await this.toaster.Success('Added to cart successfully')
    })
  }

  async addToWishlist(id: any, i: any) {
    await this.ApiService.addToWishlist({ productId: id }).then(async (res) => {
      this.wishLstItems[i]['is_whishlisted'] = true
    })
  }

}
