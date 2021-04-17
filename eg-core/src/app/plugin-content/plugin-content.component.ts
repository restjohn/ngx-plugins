import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ViewContainerRef, TemplateRef, Injector } from '@angular/core';
import { PluginService } from '../plugin.service';

@Component({
  selector: 'eg-plugin-content',
  templateUrl: './plugin-content.component.html',
  styleUrls: ['./plugin-content.component.scss']
})
export class PluginContentComponent implements OnInit, OnChanges {

  @Input()
  pluginId: string

  @ViewChild(TemplateRef, { read: ViewContainerRef, static: true })
  pluginView: ViewContainerRef

  constructor(private pluginService: PluginService, private injector: Injector) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.pluginId) {
      return
    }
    if (!this.pluginId) {
      // TODO: render no content view
      return
    }
    this.pluginService.loadPlugin(this.pluginId).then(plugin => {
      const moduleRef = plugin.moduleRef
      const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(plugin.component)
      this.pluginView.createComponent(componentFactory)
    });
  }
}
