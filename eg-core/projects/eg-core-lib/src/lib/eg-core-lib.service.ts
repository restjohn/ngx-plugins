import { Injectable } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { EgItem } from './eg-core.model'

@Injectable({
  providedIn: 'root'
})
export class EgCoreLibService {

  constructor() { }

  fetchSomeItems(): Observable<EgItem[]> {
    return new Observable<EgItem[]>(subscriber => {
      const timeout = setTimeout(() => {
        const items: EgItem[] = []
        let remaining = 10
        while (remaining--) {
          items.unshift({
            id: `eg-${remaining}`,
            name: `E.g. Item ${remaining}`
          })
        }
        subscriber.next(items)
        subscriber.complete()
      }, 350)
      return new Subscription(() => {
        clearTimeout(timeout)
      })
    })
  }
}
