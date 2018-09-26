import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { CoreSharedModule } from '../core/shared.module';
import { LoaderService } from './loader.service';
import { PluginsService } from './service/plugins.service';
import { CartService } from 'src/core';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        CoreSharedModule.forRoot(),
        SharedModule,
        // Needed for NgModuleFactoryLoader
        RouterModule.forRoot([{ path: 'mock', loadChildren: './mock.module#MockModule' }])
    ],
    providers: [LoaderService, PluginsService, CartService],
    bootstrap: [AppComponent]
})
export class AppModule { }
