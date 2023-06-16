import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: 'Home'}},
  {path: 'test-error', component: TestErrorComponent, data: {breadcrumb: 'Test Errors'}},
  {path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'}},
  {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Errors'}},
 
  {path: 'car', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule),
  data: {breadcrumb: 'Cars'}},
 
  {path: 'checkout',
  canActivate:[AuthGuard],
  loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule),
  data: {breadcrumb: 'Checkout'}},
 
  {path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule),
  data: {breadcrumb: {skip: true}}},

  {path: 'orders',
  canActivate:[AuthGuard],
  loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule),
  data: {breadcrumb: 'Orders'}},

  {path: 'admin', 
  canActivate: [AuthGuard , AdminGuard],
  loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
  data: {breadcrumb: 'Admin'}},



  {path: '**' , redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }