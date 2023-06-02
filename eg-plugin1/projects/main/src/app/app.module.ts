import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EgPlugin1Module } from './eg-plugin1.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EgPlugin1Module,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
