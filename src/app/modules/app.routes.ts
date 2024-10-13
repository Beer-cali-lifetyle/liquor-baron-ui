
import { Routes } from '@angular/router';
// import { AuthGuard } from '../core/guards/auth.guard';


const ModuleRoutes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home', loadComponent: () => import('./index').then(c => c.HomeComponent)
    },
    {
        path: 'about', loadComponent: () => import('./index').then(c => c.AboutUsComponent)
    },
    {
        path: 'contact', loadComponent: () => import('./index').then(c => c.ContactUsComponent)
    },
    {
        path: 'our-store', loadComponent: () => import('./index').then(c => c.OurStoreComponent)
    },
    {
        path: 'terms-conditions', loadComponent: () => import('./index').then(c => c.TermsConditionsComponent)
    },
    {
        path: 'privacy-cookies', loadComponent: () => import('./index').then(c => c.PrivacyCookiesComponent)
    },
    {
        path: 'delivery', loadComponent: () => import('./index').then(c => c.DeliveryComponent)
    },
    {
        path: 'returns', loadComponent: () => import('./index').then(c => c.ReturnsComponent)
    },
    {
        path: 'faqs', loadComponent: () => import('./index').then(c => c.FaqsComponent)
    },
    // {
    //     path: 'shop/product/:id', loadComponent: () => import('./index').then(c => c.ProductInfoComponent)
    // },
    // {
    //     path: 'collection', loadComponent: () => import('./index').then(c => c.CollectionComponent)
    // },
    // {
    //     path: 'wishlist', canActivate: [AuthGuard], loadComponent: () => import('./index').then(c => c.WishlistComponent)
    // },
    // {
    //     path: 'profile', canActivate: [AuthGuard], loadComponent: () => import('./index').then(c => c.ProfileComponent)
    // },
    // {
    //     path: 'contact', loadComponent: () => import('./index').then(c => c.ContactComponent)
    // },
    // {
    //     path: 'shopping-cart', canActivate: [AuthGuard], loadComponent: () => import('./index').then(c => c.ShoppingCartComponent)
    // },
    // {
    //     path: 'checkout', canActivate: [AuthGuard], loadComponent: () => import('./index').then(c => c.CheckoutComponent)
    // },
    // {
    //     path: 'magazines', loadComponent: () => import('./index').then(c => c.BlogListComponent)
    // },
    // {
    //     path: 'magazines/:id', loadComponent: () => import('./index').then(c => c.BlogComponent)
    // },
    // {
    //     path: 'orders', canActivate: [AuthGuard], loadComponent: () => import('./index').then(c => c.OrdersComponent)
    // },
]

export default ModuleRoutes