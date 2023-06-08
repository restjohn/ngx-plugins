import { Component, OnInit } from '@angular/core'
import { EgCoreLibService, EgItem } from '@ng-plugins/eg-core-lib'

@Component({
  selector: 'eg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Angular Dynamic Plugins';
  items: EgItem[] = []
  plugins: string[] = [
    '/eg-plugin1/remoteEntry.js'
  ]

  constructor(private sharedService: EgCoreLibService) {}

  ngOnInit(): void {
    this.sharedService.fetchSomeItems().subscribe(x => {
      this.items = x
    })
  }
}
