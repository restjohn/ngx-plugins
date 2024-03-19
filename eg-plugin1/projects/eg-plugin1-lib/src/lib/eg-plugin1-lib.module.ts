import { NgModule } from '@angular/core';
import { EgPlugin1LibComponent } from './eg-plugin1-lib.component';
import { CommonModule } from '@angular/common'



@NgModule({
  declarations: [
    EgPlugin1LibComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EgPlugin1LibComponent
  ]
})
export class EgPlugin1LibModule { }
