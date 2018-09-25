import { NgModule } from '@angular/core';
import { ToolbarService } from './services/toolbar.service';

@NgModule({})
export class CoreSharedModule {
    static forRoot() {
        return {
            ngModule: CoreSharedModule,
            providers: [ToolbarService]
        };
    }
}
