import { Component, NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PLUGIN_PROVIDER } from 'src/core';

@Component({
    selector: 'example2-plugin',
    template: `
        <h1>Hello World! Ex2 I'm plugin! And i recompiled!</h1>
        <a [routerLink]="'/lazy/hello'">Go to link</a>
    `
})
export class Example2PluginComponent { }

@NgModule({
    imports: [
        RouterModule.forChild([ {
            path: 'hello', component: Example2PluginComponent
        } ])
    ],
    declarations: [Example2PluginComponent],
    providers: [{
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: Example2PluginComponent,
        multi: true
    }, {
        provide: PLUGIN_PROVIDER,
        useValue: Example2PluginComponent
    }]
})
export class Example2PluginModule { }
