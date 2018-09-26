import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Init
(() => {
    window.dispatchEvent(new CustomEvent('ngxlazy.newtoolbar', {
        bubbles: true,
        detail: {route: '/lazy/cartremove', title: 'Cart remove'}
    }));
})();

@Component({
    selector: 'app-cartremove-plugin',
    template: `
    <h1>CartRemovePluginModule</h1>
    <button class="btn btn-outline" (click)="remove()">Remove</button>
    `
})
export class CartRemovePluginComponent {
    constructor() {
    }
    remove() {
        window.dispatchEvent(new CustomEvent('ngxlazy.cart.remove', {
            bubbles: true
        }));
    }
}

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: 'cartremove', component: CartRemovePluginComponent
        }])
    ],
    declarations: [CartRemovePluginComponent],
    providers: []
})
export class CartRemovePluginModule { }
