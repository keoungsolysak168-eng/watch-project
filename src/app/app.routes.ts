import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent},   // Default page (home)
  { path: 'product', component: ProductComponent },
  {path: 'contact-us', component:ContactUsComponent},
  {path: 'about-us', component:AboutUsComponent}
   // Product page
];
