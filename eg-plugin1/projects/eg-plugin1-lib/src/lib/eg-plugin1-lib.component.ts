import { Component, OnInit } from '@angular/core';
import { EgPlugin1LibService } from './eg-plugin1-lib.service'
import { EgCoreLibService, EgItem } from '@ng-plugins/eg-core-lib'
import { Observable } from 'rxjs'

@Component({
  selector: 'lib-eg-plugin1-lib',
  template: `
    <ul>
      <li *ngFor="let item of items$ | async">{{item.id}}: {{item.name}}</li>
    </ul>
  `,
  styles: []
})
export class EgPlugin1LibComponent implements OnInit {

  items$: Observable<EgItem[]>

  constructor(private service: EgPlugin1LibService) { }

  ngOnInit() {
    this.items$ = this.service.pluginItems$
  }
}
