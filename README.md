# NgxLazyPlugins

LazyLoading + AOT + Recompile modules = Super Lazy Reusable Plugins

## How its works

Firstly, you need to configure the application assembly

angular.json
```js
// you must turn off all optimizations so that you do not break the plugins
projects.APP.architect.build.configurations.production = {
    ...,
    "outputHashing": "none", // for easy management of plugins 
    "namedChunks": true, // for easy management of plugins 
    "optimization": false, // disabled tree shaking
    "commonChunk": false, // disabled chunk of chunks :)
    "preserveSymlinks": true, // for to use dependencies in plugins
    "vendorChunk": false,
    "buildOptimizer": true
}

// you must add each plug-in to this list
projects.APP.architect.build.options = [
    "src/plugins/example/example.module.ts"
]
```

Next, you need to create a plugin
```typescript
// You must use the token to provide the component to the main application
import { PLUGIN_PROVIDER } from 'src/core';

@Component({
    selector: 'example-plugin',
    template: `
        <h1>Hello World! I'm plugin! And i recompiled!</h1>
        <a [routerLink]="'/hello'">Go to link</a>
    `
})
export class ExamplePluginComponent { }

@NgModule({
    imports: [
        // dosent work yet
        RouterModule.forChild([ {
            path: 'hello', component: ExamplePluginComponent
        } ])
    ],
    declarations: [ExamplePluginComponent],
    providers: [
        // alias for entryComponents: []
        {
            provide: ANALYZE_FOR_ENTRY_COMPONENTS,
            useValue: ExamplePluginComponent,
            multi: true
        },
        // provide component by token
        {
            provide: PLUGIN_PROVIDER,
            useValue: ExamplePluginComponent
        }
    ]
})
export class ExamplePluginModule { }
```

You must use NgModuleFactoryLoader to load the plugin
```typescript
import { PLUGIN_PROVIDER } from 'src/core';
// you must specify a url to load the module
const LAZY_MODULE_URL = 'src/plugins/example/example.module.ts#ExamplePluginModule';

@Component({...})
export class AppComponent implements AfterViewInit {
  constructor(
    private injector: Injector,
    private ngModuleFactoryLoader: NgModuleFactoryLoader
  ) {
    // loading a lazy module, its your plugin
    this.ngModuleFactoryLoader.load(LAZY_MODULE_URL)
      .then((ngModuleFactory: NgModuleFactory<any>) => {
        // create NgModule Reference and get component
        const ngModuleRef: NgModuleRef<any> = ngModuleFactory.create(this.injector);
        // receiving component if necessary
        const component: Type<any> = ngModuleRef.injector.get(PLUGIN_PROVIDER);
      });
  }

}
```

After all this, you can safely re-build plugins.
