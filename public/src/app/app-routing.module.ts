import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { BicycleManagerComponent } from './bicycle-manager/bicycle-manager.component';
import { BrowseComponent } from './bicycle-manager/browse/browse.component';
import { ListingsComponent } from './bicycle-manager/listings/listings.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch:'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'bicycle_manager', component: BicycleManagerComponent, children: [
  	{ path: '', component: BrowseComponent },
  	{ path: 'browse', component: BrowseComponent },
  	{ path: 'listings', component: ListingsComponent } 
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
