import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToolbarService, CartService } from 'src/core';
import { LoaderService } from '../loader.service';
import { PluginsService, PluginInfo } from '../service/plugins.service';
import { ClrLoadingState } from '@clr/angular';

@Component({
    selector: 'app-layout',
    styles: [`.plugin{display:flex;justify-content: space-between;}`],
    templateUrl: 'layout.component.html'
})
export class LayoutComponent implements OnInit, OnDestroy {
    showmenu = false;
    links = [];
    cartItems = [];
    plugins: any;
    specificstate = ClrLoadingState.DEFAULT;
    sub = new Subscription();
    name: string;
    url: string;
    constructor(private toolbarService: ToolbarService,
    private pluginsService: PluginsService,
    private cartService: CartService,
    private loader: LoaderService) {
    }
    ngOnInit() {
        const subToolbar = this.toolbarService.toolbar$.subscribe(data => {
            this.links = data;
        });
        const subCart = this.cartService.cart$.subscribe(data => {
            this.cartItems = data;
        });
        this.sub.add(subCart);
        this.pluginsService.getPlugins().subscribe(data => {
            this.plugins = data;
            this.plugins.map(el => el['state'] = ClrLoadingState.DEFAULT);
        });
        this.sub.add(subToolbar);
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    loadEssential(plugin) {
        plugin.state = ClrLoadingState.LOADING;
        this.load(plugin.url, plugin.name);
        // only demo :)
        setTimeout(() => {
            plugin.state = ClrLoadingState.SUCCESS;
        }, 1500);

    }
    loadSpecific(url: string, name: string) {
        this.specificstate = ClrLoadingState.LOADING;
        this.loader.load(url, name);
        setTimeout(() => {
            this.specificstate = ClrLoadingState.SUCCESS;
        }, 1500);
    }
    load(url: string, name: string) {
        this.loader.load(url, name);
    }
}
