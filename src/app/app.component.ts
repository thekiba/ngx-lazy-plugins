import { Component, Type, Injector, NgModuleRef, NgModuleFactoryLoader, AfterViewInit, NgModuleFactory } from '@angular/core';
import { Router, Route, ROUTES } from '@angular/router';
import { PLUGIN_PROVIDER } from 'src/core';

const LAZY_MODULE_URL = 'src/plugins/example/example.module.ts#ExamplePluginModule';

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
    private ngModuleFactoryLoader: NgModuleFactoryLoader,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.ngModuleFactoryLoader.load(LAZY_MODULE_URL)
      .then((ngModuleFactory: NgModuleFactory<any>) => {
        this.ngModuleFactory = ngModuleFactory;
        const ngModuleRef: NgModuleRef<any> = ngModuleFactory.create(this.injector);
        this.component = ngModuleRef.injector.get(PLUGIN_PROVIDER);

        // Attach router config
        // const routes: Route[][] = ngModuleRef.injector.get(ROUTES);
        // this.router.resetConfig(routes.concat.apply([], routes));
      });
  }
}
