import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TikTakComponent } from './tik-tak/tik-tak.component';

@NgModule({
  declarations: [
    AppComponent,
    TikTakComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
