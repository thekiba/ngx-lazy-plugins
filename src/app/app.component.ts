import { AfterViewInit, Component, Injector, NgModuleFactory, NgModuleRef, Type } from '@angular/core';
import { Router } from '@angular/router';
import { PLUGIN_PROVIDER, DynamicNgModuleFactoryLoader, PluginManifest } from 'src/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit {
  title = 'ngx-lazy-plugins';
  component: Type<any>;
  ngModuleFactory: NgModuleFactory<any>;

  constructor(
    private injector: Injector,
    private ngModuleFactoryLoader: DynamicNgModuleFactoryLoader,
    private router: Router
  ) {}

  ngAfterViewInit() {
    const manifest = new PluginManifest({
      id: './src/plugins/example/example.module',
      name: 'ExamplePluginModule',
      path: 'src-plugins-example-example-module-ts-ngfactory'
    });

    this.ngModuleFactoryLoader.load(manifest.importUrl)
        .then((ngModuleFactory: NgModuleFactory<any>) => {
          this.ngModuleFactory = ngModuleFactory;
          const ngModuleRef: NgModuleRef<any> = ngModuleFactory.create(this.injector);

          // We can resolve by any provider from lazy loaded module
          this.component = ngModuleRef.injector.get(PLUGIN_PROVIDER);

          // And we can attach routes from lazy loaded module
          this.router.resetConfig([
            ...this.router.config,
            { path: 'lazy', loadChildren: () => ngModuleFactory }
          ]);
        });
  }
}
