import { NgModule } from '@angular/core';
import { EgPlugin1Component } from './eg-plugin1.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [EgPlugin1Component],
  imports: [
    CommonModule
  ],
  exports: [EgPlugin1Component]
})
export class EgPlugin1Module { }
