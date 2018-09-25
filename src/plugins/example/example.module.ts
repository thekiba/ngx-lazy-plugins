import { Component, NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PLUGIN_PROVIDER, ToolbarService, CoreSharedModule } from 'src/core';

// Init
// tslint:disable-next-line:no-unused-expression
((e: any) => {
    window.dispatchEvent(new CustomEvent('ngxlazy.newtoolbar', {
        bubbles: true,
        detail: {route: '/lazy/hello', title: 'test'}
    }));
});

@Component({
    selector: 'example-plugin',
    template: `
        <h1>Hello World! I'm plugin! And i recompiled!</h1>
        <button class="btn btn-outline">Add</button>
        <a [routerLink]="'/lazy/hello'">Go to link</a>
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
