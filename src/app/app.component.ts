import { Component, Type, Injector, Injectable, NgModuleRef, NgModuleFactoryLoader, AfterViewInit, NgModuleFactory } from '@angular/core';
import { Router, Route, ROUTES } from '@angular/router';
import { PLUGIN_PROVIDER } from 'src/core';

const LAZY_MODULE_URL = 'src-plugins-example-example-module-ts-ngfactory#ExamplePluginModule';
const LAZY_MODULE_NAME = './src/plugins/example/example.module.ngfactory.js';

declare const __webpack_require__: any;

const _SEPARATOR = '#';
const FACTORY_CLASS_SUFFIX = 'NgFactory';

const DEFAULT_CONFIG = {
  factoryPathPrefix: '',
  factoryPathSuffix: '',
};

function loadFactory(path) {
  console.log(path);
  let [ name, exportName ] = path.split(_SEPARATOR);
  let factoryClassSuffix = FACTORY_CLASS_SUFFIX;
  if (exportName === undefined) {
    exportName = 'default';
    factoryClassSuffix = '';
  }
  return __webpack_require__.e(DEFAULT_CONFIG.factoryPathPrefix + name + DEFAULT_CONFIG.factoryPathSuffix)
    .then(function () { return __webpack_require__(LAZY_MODULE_NAME); })
    .then(function (module) { return module[exportName + factoryClassSuffix]; })
    .then(function (factory) { return checkNotEmpty(factory, name, exportName); });
}

function checkNotEmpty(value, modulePath, exportName) {
  if (!value) {
    throw new Error(`Cannot find '${exportName}' in '${modulePath}'`);
  }
  return value;
}

function overrideLoadFactory(overridedLoadFactory, defaultLoadFactory) {
  return (path) => defaultLoadFactory(path)
    .catch(() => overridedLoadFactory(path));
}

export function loaderFactory(ngModuleFactoryLoader: NgModuleFactoryLoader) {
  const mock = ngModuleFactoryLoader as any;
  const defaultLoadFactory = mock.loadFactory.bind(ngModuleFactoryLoader);
  mock.loadFactory = overrideLoadFactory(loadFactory, defaultLoadFactory).bind(mock);

  return mock;
}

@Injectable({
  providedIn: 'root',
  useFactory: loaderFactory,
  deps: [NgModuleFactoryLoader]
})
export abstract class DynamicModuleFactoryLoader extends NgModuleFactoryLoader {}

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
    console.log(this.ngModuleFactoryLoader);
    this.ngModuleFactoryLoader.load(LAZY_MODULE_URL)
      .then((ngModuleFactory: NgModuleFactory<any>) => {
        this.ngModuleFactory = ngModuleFactory;
        const ngModuleRef: NgModuleRef<any> = ngModuleFactory.create(this.injector);
        this.component = ngModuleRef.injector.get(PLUGIN_PROVIDER);

        // Attach router config
        const routes: Route[][] = ngModuleRef.injector.get(ROUTES);
        this.router.resetConfig([
          ...this.router.config,
          { path: 'lazy', loadChildren: LAZY_MODULE_URL }
          // routes.concat.apply([], routes)
        ]);
      });
  }
}
