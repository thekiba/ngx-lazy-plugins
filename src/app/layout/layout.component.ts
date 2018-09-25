import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToolbarService } from 'src/core';
import { LoaderService } from '../loader.service';

@Component({
    selector: 'app-layout',
    templateUrl: 'layout.component.html'
})
export class LayoutComponent implements OnInit, OnDestroy {
    showmenu = false;
    links = [];
    sub: Subscription;
    name: string;
    url: string;
    constructor(private toolbarService: ToolbarService,
    private loader: LoaderService) {
    }
    ngOnInit() {
        this.sub = this.toolbarService.toolbar$.subscribe(data => {
            this.links = data;
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    load(url: string, name: string) {
        this.loader.load(url, name);
    }
}
