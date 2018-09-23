import { NgModuleFactoryLoader, Injectable } from '@angular/core';

declare const __webpack_require__: any;
const webpack_map = {};
const _SEPARATOR = '#';
const FACTORY_CLASS_SUFFIX = 'NgFactory';

const DEFAULT_CONFIG = {
    factoryPathPrefix: '',
    factoryPathSuffix: '',
};

function loadFactory(path) {
    console.log(path);
    let [name, exportName, moduleId] = path.split(_SEPARATOR);
    let factoryClassSuffix = FACTORY_CLASS_SUFFIX;
    if (exportName === undefined) {
        exportName = 'default';
        factoryClassSuffix = '';
    }
    // for lazy routes
    if (moduleId) {
        webpack_map[name] = moduleId;
    } else {
        moduleId = webpack_map[name];
    }
    return  __webpack_require__.e(DEFAULT_CONFIG.factoryPathPrefix + name + DEFAULT_CONFIG.factoryPathSuffix)
        .then(function () { return __webpack_require__(moduleId); })
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
export abstract class DynamicModuleFactoryLoader extends NgModuleFactoryLoader {
}
