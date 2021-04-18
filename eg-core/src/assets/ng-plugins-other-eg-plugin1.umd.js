(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ng-plugins/eg-core-lib'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@ng-plugins-other/eg-plugin1', ['exports', '@angular/core', '@ng-plugins/eg-core-lib', '@angular/common'], factory) :
    (global = global || self, factory((global['ng-plugins-other'] = global['ng-plugins-other'] || {}, global['ng-plugins-other']['eg-plugin1'] = {}), global.ng.core, global.egCoreLib, global.ng.common));
}(this, (function (exports, core, egCoreLib, common) { 'use strict';

    function EgPlugin1Component_li_1_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "li");
        core.ɵɵtext(1);
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var item_r1 = ctx.$implicit;
        core.ɵɵadvance(1);
        core.ɵɵtextInterpolate1("Plugin 1 decortated item ", item_r1.id, "");
    } }
    var EgPlugin1Component = /** @class */ (function () {
        function EgPlugin1Component(coreService) {
            this.coreService = coreService;
        }
        EgPlugin1Component.prototype.ngOnInit = function () {
            var _this = this;
            this.coreService.fetchSomeItems().subscribe(function (x) {
                _this.items = x;
            });
        };
        EgPlugin1Component.ɵfac = function EgPlugin1Component_Factory(t) { return new (t || EgPlugin1Component)(core.ɵɵdirectiveInject(egCoreLib.EgCoreLibService)); };
        EgPlugin1Component.ɵcmp = core.ɵɵdefineComponent({ type: EgPlugin1Component, selectors: [["p1-eg-plugin1"]], decls: 2, vars: 1, consts: [[4, "ngFor", "ngForOf"]], template: function EgPlugin1Component_Template(rf, ctx) { if (rf & 1) {
                core.ɵɵelementStart(0, "ul");
                core.ɵɵtemplate(1, EgPlugin1Component_li_1_Template, 2, 1, "li", 0);
                core.ɵɵelementEnd();
            } if (rf & 2) {
                core.ɵɵadvance(1);
                core.ɵɵproperty("ngForOf", ctx.items);
            } }, directives: [common.NgForOf], encapsulation: 2 });
        return EgPlugin1Component;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(EgPlugin1Component, [{
            type: core.Component,
            args: [{
                    selector: 'p1-eg-plugin1',
                    template: "\n    <ul>\n      <li *ngFor=\"let item of items\">Plugin 1 decortated item {{item.id}}</li>\n    </ul>\n  ",
                    styles: []
                }]
        }], function () { return [{ type: egCoreLib.EgCoreLibService }]; }, null); })();

    var EgPlugin1Module = /** @class */ (function () {
        function EgPlugin1Module() {
        }
        EgPlugin1Module.ɵmod = core.ɵɵdefineNgModule({ type: EgPlugin1Module });
        EgPlugin1Module.ɵinj = core.ɵɵdefineInjector({ factory: function EgPlugin1Module_Factory(t) { return new (t || EgPlugin1Module)(); }, imports: [[
                    common.CommonModule
                ]] });
        return EgPlugin1Module;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core.ɵɵsetNgModuleScope(EgPlugin1Module, { declarations: [EgPlugin1Component], imports: [common.CommonModule], exports: [EgPlugin1Component] }); })();
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(EgPlugin1Module, [{
            type: core.NgModule,
            args: [{
                    declarations: [EgPlugin1Component],
                    imports: [
                        common.CommonModule
                    ],
                    exports: [EgPlugin1Component]
                }]
        }], null, null); })();

    /*
     * Public API Surface of eg-plugin1
     */
    var plugin = {
        id: '@ng-plugins-other/eg-plugin1',
        title: 'E.g. Plugin 1',
        module: EgPlugin1Module,
        component: EgPlugin1Component
    };

    exports.plugin = plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-plugins-other-eg-plugin1.umd.js.map
