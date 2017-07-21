import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { BicycleManagerComponent } from './bicycle-manager/bicycle-manager.component';
import { BrowseComponent } from './bicycle-manager/browse/browse.component';
import { ListingsComponent } from './bicycle-manager/listings/listings.component';
import { BicycleService } from './bicycle.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    BicycleManagerComponent,
    BrowseComponent,
    ListingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [BicycleService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
