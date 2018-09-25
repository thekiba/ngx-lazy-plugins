import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface Toolbar {
    route: string;
    title: string;
}
@Injectable()
export class ToolbarService {
    toolbar$ = new BehaviorSubject<Toolbar[]>([]);
    constructor() {
        window.addEventListener('ngxlazy.newtoolbar', (e: any) => {
            this.toolbar$.next([...this.toolbar$.value, e.detail]);
        });
    }
    addToolbar(model: Toolbar) {
        window.dispatchEvent(new CustomEvent('ngxlazy.newtoolbar', {
            bubbles: true,
            detail: model
        }));
    }
}
