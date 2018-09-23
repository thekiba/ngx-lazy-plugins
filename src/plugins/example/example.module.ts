import { Component, NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PLUGIN_PROVIDER } from 'src/core';

@Component({
    selector: 'example-plugin',
    template: `
        <h1>Hello World! I'm plugin! And i recompiled!</h1>
        <a [routerLink]="'/lazy/hello'">Go to link</a>
    `
})
export class ExamplePluginComponent { }

@NgModule({
    imports: [
        RouterModule.forChild([ {
            path: 'hello', component: ExamplePluginComponent
        } ])
    ],
    declarations: [ExamplePluginComponent],
    providers: [{
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: ExamplePluginComponent,
        multi: true
    }, {
        provide: PLUGIN_PROVIDER,
        useValue: ExamplePluginComponent
    }]
})
export class ExamplePluginModule { }
