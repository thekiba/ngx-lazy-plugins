import { Component, NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PLUGIN_PROVIDER, ToolbarService, CoreSharedModule } from 'src/core';

// Init
(() => {
    window.dispatchEvent(new CustomEvent('ngxlazy.newtoolbar', {
        bubbles: true,
        detail: {route: '/lazy/hello', title: 'Hello plugin'}
    }));
})();

@Component({
    selector: 'app-example-plugin',
    template: `
        <h1>Hello World! I'm plugin! And i recompiled!</h1>
    `
})
export class ExamplePluginComponent {
    constructor(private toolbarService: ToolbarService) {
    }
}

@NgModule({
    imports: [
        CoreSharedModule.forRoot(),
        RouterModule.forChild([{
            path: 'hello', component: ExamplePluginComponent
        }])
    ],
    declarations: [ExamplePluginComponent],
    providers: [
        {
            provide: ANALYZE_FOR_ENTRY_COMPONENTS,
            useValue: ExamplePluginComponent,
            multi: true
        }, {
            provide: PLUGIN_PROVIDER,
            useValue: ExamplePluginComponent
        }]
})
export class ExamplePluginModule { }
