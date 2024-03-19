import { Component, OnInit } from '@angular/core';
import { EgItem } from '@ng-plugins/eg-core-lib';
import { EgPlugin1Service } from './eg-plugin1.service'

@Component({
  selector: 'app-eg-plugin1',
  template: `
    <ul>
      <li *ngFor="let item of items">{{item.id}}: {{item.name}}</li>
    </ul>
  `,
  styles: []
})
export class EgPlugin1Component implements OnInit {

  items: EgItem[]

  constructor(private service: EgPlugin1Service) { }

  ngOnInit() {
    this.service.pluginItems$.subscribe(x => {
      this.items = x
    })
  }
}
