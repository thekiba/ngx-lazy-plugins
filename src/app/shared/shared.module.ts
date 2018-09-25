import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    RouterModule
  ],
  declarations: [],
  exports: [ClarityModule]
})
export class SharedModule { }
