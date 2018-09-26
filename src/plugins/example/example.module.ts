import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PLUGIN_PROVIDER } from 'src/core';

@Component({
  selector: 'example-plugin',
  template: `
    <h1>Hello World! I'm plugin! And i recompiled!</h1>
    <a [routerLink]="'/lazy/hello'">Go to link</a>
  `
})
export class ExamplePluginComponent {}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'hello',
        component: ExamplePluginComponent
      }
    ])
  ],
  declarations: [ ExamplePluginComponent ],
  providers: [
    {
      provide: PLUGIN_PROVIDER,
      useValue: ExamplePluginComponent
    }
  ]
})
export class ExamplePluginModule {}
