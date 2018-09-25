import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToolbarService } from 'src/core';

@Component({
    selector: 'app-layout',
    templateUrl: 'layout.component.html'
})
export class LayoutComponent implements OnInit, OnDestroy {
    showmenu = false;
    links = [];
    sub: Subscription;
    constructor(@Optional() private toolbarService: ToolbarService) {
    }
    ngOnInit() {
        this.sub = this.toolbarService.toolbar$.subscribe(data => {
            this.links = data;
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
