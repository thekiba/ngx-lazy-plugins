import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToolbarService, CartService } from 'src/core';
import { LoaderService } from '../loader.service';
import { PluginsService, PluginInfo } from '../service/plugins.service';

@Component({
    selector: 'app-layout',
    styles: [`.plugin{display:flex;justify-content: space-between;}`],
    templateUrl: 'layout.component.html'
})
export class LayoutComponent implements OnInit, OnDestroy {
    showmenu = false;
    links = [];
    cartItems = [];
    plugins: PluginInfo[];
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
        });
        this.sub.add(subToolbar);
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    load(url: string, name: string) {
        this.loader.load(url, name);
    }
}
