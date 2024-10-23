import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpServie } from './http.service';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private isBrowser: boolean;

  constructor(
    private httpRequest: HttpServie,
    @Inject(PLATFORM_ID) private platformId: Object  // Inject PLATFORM_ID for SSR checks
  ) {
    this.isBrowser = isPlatformBrowser(platformId);  // Detect if it's a browser or server
  }

  async SignIn(data: any) {
    return await this.httpRequest.POST(`/login`, data);
  }

  async SignUp(data: any) {
    return await this.httpRequest.POST(`/register`, data);
  }

  async getUserDetails(id: string) {
    return await this.httpRequest.GET(`/user/${id}`);
  }

  async getCategories() {
    return await this.httpRequest.GET(`/totalcategory`);
  }

  async getById(code: string) {
    return await this.httpRequest.GET(`/end-point/${code}`);
  }

  async getList() {
    return await this.httpRequest.GET('/end-point');
  }

  async submit(data: any) {
    return await this.httpRequest.POST('/end-point', data, { withFormData: true });
  }

  async update(id: string, data: any) {
    return await this.httpRequest.PUT(`/end-point/${id}`, data, { withFormData: true });
  }

  async updateWithFormData(id: string, data: any) {
    return await this.httpRequest.PUT(`/end-point/${id}`, data, { withFormData: true });
  }

  async fetchWishList() {
    return await this.httpRequest.GET('/wishlist');
  }

  async fetcHlatestProducts(data: any) {
    return await this.httpRequest.GET('/random-products', data);
  }

  async fetchProduct(id: string) {
    return await this.httpRequest.GET(`/products/${id}`);
  }

  async fetchFilteredProduct(data: any) {
    return await this.httpRequest.GET(`/productfilter`, data);
  }

  async fetchAddress() {
    return await this.httpRequest.GET('/addresses');
  }

  async saveAddress(data: any) {
    return await this.httpRequest.POST('/addresses', data);
  }

  async editAddress(data: any, id: any) {
    return await this.httpRequest.PUT(`/addresses/${id}`, data);
  }

  async deletAddress(id: any) {
    return await this.httpRequest.DELETE(`/addresses/${id}`);
  }

  async fetchPaymentCards(id: any) {
    return await this.httpRequest.GET(`/payment-methods`);
  }

  async savePaymentCards(data: any) {
    return await this.httpRequest.POST('/payment-methods', data);
  }

  async editPaymentCards(data: any, id: any) {
    return await this.httpRequest.PUT(`/payment-methods/${id}`, data);
  }

  async deletePaymentCards(id: any) {
    return await this.httpRequest.DELETE(`/payment-methods/${id}`);
  }

  async addToCart(data: any) {
    return await this.httpRequest.POST(`/cart`, data);
  }

  async getCartProducts() {
    return await this.httpRequest.GET(`/cart`);
  }

  async removeItemCart(id: any) {
    return await this.httpRequest.DELETE(`/cart/${id}`);
  }

  async clearCart() {
    return await this.httpRequest.DELETE(`/cart/clear`);
  }

  async updateQuantity(data: any, id: any) {
    return await this.httpRequest.PUT(`/cart/${id}`, data);
  }

  async fetchWishlist() {
    return await this.httpRequest.GET(`/wishlist`, {}, true);
  }

  async addToWishlist(data: any) {
    return await this.httpRequest.POST(`/wishlist`, data, { withFormData: false }, true);
  }

  async removeFromWishlist(id: any) {
    return await this.httpRequest.DELETE(`/wishlist/${id}`);
  }

  async contactUs(data: any) {
    return await this.httpRequest.POST('/contact', data)
  }

  async fetchBlogs(data: any) {
    return await this.httpRequest.GET(`/blogs`, data);
  }

  async fetchBlog(id: any) {
    return await this.httpRequest.GET(`/blogs/${id}`);
  }

  async placeOrder(data: any) {
    return await this.httpRequest.POST(`/orders`, data);
  }

  async fetchOrders(id: any) {
    return await this.httpRequest.GET(`/users/${id}/orders`);
  }

}
