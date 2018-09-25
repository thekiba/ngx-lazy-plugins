import { NgModule } from '@angular/core';
import { ToolbarService } from './toolbar.service';

@NgModule({})
export class CoreSharedModule {
    static forRoot() {
        return {
            ngModule: CoreSharedModule,
            providers: [ToolbarService]
        };
    }
}
