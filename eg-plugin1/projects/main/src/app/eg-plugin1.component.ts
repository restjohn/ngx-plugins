import { Component, OnInit } from '@angular/core';
import { EgItem } from '@ng-plugins/eg-core-lib';
import { EgPlugin1Service } from './eg-plugin1.service'

@Component({
  selector: 'egp1-eg-plugin1',
  template: `
    <ul>
      <li *ngFor="let item of items">Plugin 1 decortated item {{item.id}}</li>
    </ul>
  `,
  styles: []
})
export class EgPlugin1Component implements OnInit {

  items: EgItem[]

  constructor(private coreService: EgPlugin1Service) { }

  ngOnInit() {
    this.coreService.pluginItems$.subscribe(x => {
      this.items = x
    })
  }
}
