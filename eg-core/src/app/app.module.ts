import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PluginContentComponent } from './plugin-content/plugin-content.component';
import { EgCoreLibModule } from '@ng-plugins/eg-core-lib';

@NgModule({
  declarations: [
    AppComponent,
    PluginContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EgCoreLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
