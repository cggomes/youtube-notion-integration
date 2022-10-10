import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { MoonComponent } from './icons/moon/moon.component';
import { SunComponent } from './icons/sun/sun.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './components/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeSwitchComponent,
    SunComponent,
    MoonComponent,
    HeaderComponent,
    SearchComponent,
    HomeComponent,
    DetailComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
