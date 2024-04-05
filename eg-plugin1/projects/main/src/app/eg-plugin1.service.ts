import { Injectable } from '@angular/core';
import { EgCoreLibService, EgItem } from '@ng-plugins/eg-core-lib'
import { Observable, map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EgPlugin1Service {

  constructor(private coreService: EgCoreLibService) {}

  readonly pluginItems$: Observable<EgItem[]> = this.coreService.fetchSomeItems()
    .pipe(
      map(x => x.map(x => ({ ...x, name: `${x.name} from eg-plugin1` })))
    )
}
