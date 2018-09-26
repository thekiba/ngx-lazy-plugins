import { Component, NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from 'src/core';

// Init
(() => {
    window.dispatchEvent(new CustomEvent('ngxlazy.newtoolbar', {
        bubbles: true,
        detail: {route: '/lazy/cartadd', title: 'Cart add'}
    }));
})();

@Component({
    selector: 'app-cartadd-plugin',
    template: `
        <h1>CartAddPluginModule</h1>
        <button class="btn btn-outline" (click)="add()">Add</button>
    `
})
export class CartAddPluginComponent {
    constructor() {
    }
    add() {
        window.dispatchEvent(new CustomEvent('ngxlazy.cart.add', {
            bubbles: true,
            detail: {name: 'hi!'}
        }));
    }
}

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: 'cartadd', component: CartAddPluginComponent
        }])
    ],
    declarations: [CartAddPluginComponent],
    providers: []
})
export class CartAddPluginModule { }
