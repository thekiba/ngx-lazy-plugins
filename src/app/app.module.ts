import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,

    // Needed for NgModuleFactoryLoader and __webpack_require__
    RouterModule.forRoot(
      [ { path: 'mock', loadChildren: './mock.module#MockModule' } ],
      { initialNavigation: 'enabled' }
    )
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
