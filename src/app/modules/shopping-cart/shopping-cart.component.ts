import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ScriptLoadComponent } from '../script-load/script-load.component';
import { ApiService } from '../../shared/services/api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UiToasterService } from '../../core/services/toaster.service';
import { ContextService } from '../../core/services/context.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  standalone: true,
  imports: [
    CommonModule, ScriptLoadComponent, RouterModule
  ]
})
export class ShoppingCartComponent implements OnInit {
  imgBaseUrl: string = environment.api.base_url;
  cartInfo: any;
  constructor(
    private ApiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private toaster: UiToasterService,
    public contextService: ContextService,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    this.contextService.cart()?.subscribe((cartData: any) => {
      if (cartData && cartData.data) {
        this.calculateSubTotal(cartData.data);
      }
    });
    await this.getCart();
  }

  async getCart() {
    await this.ApiService.getCartProducts().then((res) => {
      this.contextService.cart.set(res)
      this.cdr.detectChanges();
    })
  }

  async removeItemFromCart(id: any) {
    await this.ApiService.removeItemCart(id).then(async res => {
      await this.getCart();
    })
  }

  async updateQuantity(quantity: number, id: string) {
    const payload = {
      quantity: quantity
    }
    await this.ApiService.updateQuantity(payload, id).then(async res => {
      await this.getCart();
    })
  }

  increment(quantity: number, id: string) {
    quantity++;
    this.updateQuantity(quantity, id);

  }

  decrement(quantity: number, id: string) {
    if (quantity > 1) {
      quantity--;
      this.updateQuantity(quantity, id);
    }
  }

  async emptyCart() {
    await this.ApiService.clearCart().then(async (res) => {
      await this.getCart()
    });
  }

  calculateSubTotal(cart: any) {
    let itemsTotal = 0;
    cart?.data?.map((item: any) => {
      itemsTotal += item?.quantity * item?.product?.price
    })
    return itemsTotal
  }

}
