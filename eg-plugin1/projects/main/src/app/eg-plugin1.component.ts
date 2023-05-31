import { Component, OnInit, Input } from '@angular/core';
import { EgCoreLibService, EgItem } from '@ng-plugins/eg-core-lib';

@Component({
  selector: 'p1-eg-plugin1',
  template: `
    <ul>
      <li *ngFor="let item of items">Plugin 1 decortated item {{item.id}}</li>
    </ul>
  `,
  styles: []
})
export class EgPlugin1Component implements OnInit {

  items: EgItem[]

  constructor(private coreService: EgCoreLibService) { }

  ngOnInit() {
    this.coreService.fetchSomeItems().subscribe(x => {
      this.items = x
    })
  }
}
