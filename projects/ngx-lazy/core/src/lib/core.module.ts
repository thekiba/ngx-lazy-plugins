import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCER } from './state/index';

@NgModule({
  imports: [
    StoreModule.forRoot(ROOT_REDUCER),
  ],
  declarations: [],
  exports: [],
  providers: [
  ],
})
export class CoreModule { }
