import { Component, Type, Injector, NgModuleRef, AfterViewInit, NgModuleFactory } from '@angular/core';
import { Router, Route, ROUTES } from '@angular/router';
import { PLUGIN_PROVIDER } from 'src/core';
import { DynamicModuleFactoryLoader } from '../core/ng_dynamic_factory_loader';

const LAZY_MODULE_URL = 'src-plugins-example-example-module-ts-ngfactory#ExamplePluginModule';
const LAZY_MODULE_NAME = './src/plugins/example/example.module.ngfactory.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ngx-lazy-plugins';
  component: Type<any>;
  ngModuleFactory: NgModuleFactory<any>;

  constructor(
    private injector: Injector,
    private ngModuleFactoryLoader: DynamicModuleFactoryLoader,
    private router: Router
  ) { }

  ngAfterViewInit() {
    // console.log(this.ngModuleFactoryLoader);
    this.ngModuleFactoryLoader.load(`${LAZY_MODULE_URL}#${LAZY_MODULE_NAME}`)
      .then((ngModuleFactory: NgModuleFactory<any>) => {
        this.ngModuleFactory = ngModuleFactory;
        const ngModuleRef: NgModuleRef<any> = ngModuleFactory.create(this.injector);
        this.component = ngModuleRef.injector.get(PLUGIN_PROVIDER);

        // Attach router config
        const routes: Route[][] = ngModuleRef.injector.get(ROUTES);
        console.log(this.router.config);
        this.router.resetConfig([
          ...this.router.config,
          { path: 'lazy', loadChildren: LAZY_MODULE_URL }
        ]);
        console.log(this.router.config);
      });
  }
}
