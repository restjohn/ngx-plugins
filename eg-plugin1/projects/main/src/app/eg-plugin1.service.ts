import { Injectable } from '@angular/core';
import { EgCoreLibService, EgItem } from '@ng-plugins/eg-core-lib'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

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
