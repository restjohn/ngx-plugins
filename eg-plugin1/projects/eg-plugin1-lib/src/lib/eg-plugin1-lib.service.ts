import { Injectable } from '@angular/core';
import { EgCoreLibService, EgItem } from '@ng-plugins/eg-core-lib'
import { Observable, map, firstValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EgPlugin1LibService {

  constructor(private coreService: EgCoreLibService) {}

  readonly pluginItems$: Observable<EgItem[]> = this.coreService.fetchSomeItems()
    .pipe(
      map(x => x.map(x => ({ ...x, name: `${x.name} from eg-plugin1-lib` })))
    )

  /**
   * This method is just to force the TypeScript compiler to include helpers
   * from tslib to ensure the bundler, rollup, bundles tslib rather than
   * preserving the tslib imports.  This is only applicable if the custom
   * builder bundles from the fesm2015 module as opposed to the fesm2020
   * module, as the 2020 target does not output code does not import and use
   * tslib helpers.
   */
  async itemsAsPromise(): Promise<EgItem[]> {
    const items = await firstValueFrom(this.coreService.fetchSomeItems())
    const itemsMapped = [] as any[]
    for (const item of items) {
      itemsMapped.push({ ...item, name: `${item.name} from eg-plugin1-lib` })
    }
    return itemsMapped
  }
}
