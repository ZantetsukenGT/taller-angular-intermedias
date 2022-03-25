import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductService } from './product.service'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductaddComponent } from './productadd/productadd.component';

const appRoutes: Routes = [
  { path: '', component: MainpageComponent },//localhost:4200
  { path: 'mainpage', component: MainpageComponent },//localhost:4200/mainpage
  { path: 'productlist', component: ProductlistComponent },//localhost:4200/productlist
  { path: 'productadd', component: ProductaddComponent },//localhost:4200/productadd
  { path: 'productadd/:_id', component: ProductaddComponent },//localhost:4200/productadd/5
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainpageComponent,
    ProductlistComponent,
    ProductaddComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
