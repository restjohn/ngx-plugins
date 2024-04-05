import { Component, OnInit } from '@angular/core';
import { EgPlugin1LibService } from './eg-plugin1-lib.service'
import { EgCoreLibService, EgItem } from '@ng-plugins/eg-core-lib'
import { Observable, map } from 'rxjs'
import * as xml from 'xml-js'

@Component({
  selector: 'lib-eg-plugin1-lib',
  template: `
    <pre>
{{ items$ | async }}
    </pre>
  `,
  styles: []
})
export class EgPlugin1LibComponent implements OnInit {

  items$: Observable<string>

  constructor(private service: EgPlugin1LibService) { }

  ngOnInit() {
    this.items$ = this.service.pluginItems$.pipe(
      map(items => {
        console.log('items', items)
        const itemsXmlModel = items.map(x => ({ _attributes: { 'item-id': x.id }, _text: x.name }))
        const itemsXml = xml.js2xml({ 'eg-plugin1-lib': { 'eg-plugin1-lib-item': itemsXmlModel } }, { spaces: 2, compact: true }) as string
        console.log('items xml', itemsXml)
        return itemsXml
      })
    )
  }
}
