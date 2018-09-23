import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    // Needed for NgModuleFactoryLoader
    RouterModule.forRoot([ { path: 'mock', loadChildren: './mock.module#MockModule' } ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
