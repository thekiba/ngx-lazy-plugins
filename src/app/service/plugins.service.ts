import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

export class PluginInfo {
    name: string;
    url: string;
    title: string;
    description?: string;
}

@Injectable()
export class PluginsService {
    getPlugins(): Observable<PluginInfo[]> {
        const res: PluginInfo[] = [
            {
                url: 'src-plugins-example-example-module-ts-ngfactory#ExamplePluginModule',
                name: './src/plugins/example/example.module.ngfactory.js',
                title: 'Example plugin v1.0.0',
                description: 'Small example plugin'
            },
            {
                url: 'src-plugins-cartadd-cartadd-module-ts-ngfactory#CartAddPluginModule',
                name: './src/plugins/cartadd/cartadd.module.ngfactory.js',
                title: 'Cart add plugin v1.0.0',
                description: 'Increment'
            },
            {
                url: 'src-plugins-cartremove-cartremove-module-ts-ngfactory#CartRemovePluginModule',
                name: './src/plugins/cartremove/cartremove.module.ngfactory.js',
                title: 'Cart remove plugin v1.0.0',
                description: 'Decrement'
            }
        ];
        return of(res);
    }
}
