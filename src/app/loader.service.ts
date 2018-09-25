import { Injectable, Injector, NgModuleFactory, NgModuleRef } from '@angular/core';
import { Router, ROUTES, Route } from '@angular/router';
import { DynamicModuleFactoryLoader } from '../core/ng_dynamic_factory_loader';

@Injectable()
export class LoaderService {
    constructor(private injector: Injector,
        private ngModuleFactoryLoader: DynamicModuleFactoryLoader,
        private router: Router) { }
    ngModuleFactory: NgModuleFactory<any>;
    load(LAZY_MODULE_URL: string, LAZY_MODULE_NAME: string) {
        this.ngModuleFactoryLoader.load(`${LAZY_MODULE_URL}#${LAZY_MODULE_NAME}`)
            .then((ngModuleFactory: NgModuleFactory<any>) => {
                this.ngModuleFactory = ngModuleFactory;
                const ngModuleRef: NgModuleRef<any> = ngModuleFactory.create(this.injector);
                // this.component = ngModuleRef.injector.get(PLUGIN_PROVIDER);

                // Attach router config
                const routes: Route[][] = ngModuleRef.injector.get(ROUTES);
                this.router.resetConfig([
                    ...this.router.config,
                    { path: 'lazy', loadChildren: LAZY_MODULE_URL }
                ]);
            });
    }
}
