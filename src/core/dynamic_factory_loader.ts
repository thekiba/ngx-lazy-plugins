import { NgModuleFactoryLoader, Injectable, NgModuleFactory } from '@angular/core';

/**
 * This is necessary for loading lazy modules using webpack require ensure.
 * And also we do not need to use the functions from the webpack. This is just an example.
 */
declare const __webpack_require__: any;

/**
 * To override the load of modules, we need to override the loadFactory method.
 * This can only be done through a factory.
 */
@Injectable({
  providedIn: 'root',
  useFactory: loaderFactory,
  deps: [ NgModuleFactoryLoader ]
})
export abstract class DynamicNgModuleFactoryLoader extends NgModuleFactoryLoader {}

/**
 * It's the same as this.
 * loadFactory(path) {
 *   return super.loadFactory(path)
 *   .catch(() => loadFactory(path));
 * }
 */
export function loaderFactory(ngModuleFactoryLoader: NgModuleFactoryLoader): NgModuleFactoryLoader {
  const mock = ngModuleFactoryLoader as any;
  const defaultLoadFactory = mock.loadFactory.bind(ngModuleFactoryLoader);
  mock.loadFactory = overrideLoadFactory(loadFactory, defaultLoadFactory).bind(mock);
  return mock;
}

function overrideLoadFactory<T>(overriddenLoadFactory, defaultLoadFactory): (path: string) => Promise<NgModuleFactory<T>> {
  return (path) => defaultLoadFactory(path)
    .catch(() => overriddenLoadFactory(path));
}


const _SEPARATOR = '#';
const FACTORY_CLASS_SUFFIX = 'NgFactory';

const DEFAULT_CONFIG = {
  factoryPathPrefix: '',
  factoryPathSuffix: '',
  moduleIdSuffix: '.ngfactory.js'
};

/**
 * We override the load of lazy modules to use the native functionality of Angular.
 * Warning! Work with anonymous modules is not implemented.
 */
function loadFactory<T>(path: string): Promise<NgModuleFactory<T>> {
  const [ moduleId, ngModuleName, fileName ] = path.split(_SEPARATOR);

  return __webpack_require__.e(DEFAULT_CONFIG.factoryPathPrefix + fileName + DEFAULT_CONFIG.factoryPathSuffix)
                            .then(() => __webpack_require__(moduleId + DEFAULT_CONFIG.moduleIdSuffix))
                            .then(module => module[ ngModuleName + FACTORY_CLASS_SUFFIX ])
                            .then(factory => checkNotEmpty(factory, path, ngModuleName));
}

function checkNotEmpty(value, modulePath, exportName) {
  if (!value) {
    throw new Error(`Cannot find '${exportName}' in '${modulePath}'`);
  }
  return value;
}
