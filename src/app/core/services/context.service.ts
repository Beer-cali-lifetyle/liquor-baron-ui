import {
    Injectable,
    WritableSignal,
    signal,
    Inject,
    PLATFORM_ID,
    HostListener
  } from "@angular/core";
  import { isPlatformBrowser } from '@angular/common';
  
  interface User {
    id: number;
    name: string;
    email: string;
    // Add more fields as needed
  }
  
  @Injectable({ providedIn: 'root' })
  export class ContextService {
    user: WritableSignal<User | null> = signal(null);
    cart: WritableSignal<any | null> = signal(null);
  
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
      this.loadFromLocalStorage();
    }
  
    private loadFromLocalStorage() {
      if (isPlatformBrowser(this.platformId)) {
        const storedUser = localStorage.getItem('user');
        const cart: any = localStorage.getItem('cart');
        if (storedUser !== null) {
          try {
            this.user.set(JSON.parse(storedUser));
            this.cart.set(JSON.parse(cart));
          } catch (error) {
            console.error('Error parsing local storage for user:', error);
          }
        }
      }
    }
  
    @HostListener("window:beforeunload", ["$event"])
    unloadHandler(event: Event) {
      this.saveToLocalStorage();
    }
  
    saveToLocalStorage() {
      if (isPlatformBrowser(this.platformId)) {
        const currentUser = this.user();
        const cartStatus = this.cart();
        if (currentUser !== null) {
          localStorage.setItem('user', JSON.stringify(currentUser));
          localStorage.setItem('cart', JSON.stringify(cartStatus));
        }
      }
    }
  
    public clearLocalStorage() {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
      }
    }
  }
  