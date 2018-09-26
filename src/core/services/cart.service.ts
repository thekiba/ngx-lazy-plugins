import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface Cart {
    name: string;
}
@Injectable()
export class CartService {
    cart$ = new BehaviorSubject<Cart[]>([]);
    constructor() {
        window.addEventListener('ngxlazy.cart.add', (e: any) => {
            this.cart$.next([...this.cart$.value, e.detail]);
        });
        window.addEventListener('ngxlazy.cart.remove', (e: any) => {
            this.cart$.next(this.cart$.value.splice(1));
        });
    }
}
