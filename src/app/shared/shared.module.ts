import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    RouterModule
  ],
  declarations: [],
  exports: [ClarityModule, FormsModule]
})
export class SharedModule { }
