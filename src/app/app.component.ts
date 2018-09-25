import { Component, Type, AfterViewInit } from '@angular/core';
import { LoaderService } from './loader.service';

const LAZY_MODULE_URL = 'src-plugins-example-example-module-ts-ngfactory#ExamplePluginModule';
const LAZY_MODULE_NAME = './src/plugins/example/example.module.ngfactory.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ngx-lazy-plugins';
  component: Type<any>;

  constructor(private loader: LoaderService
  ) { }

  ngAfterViewInit() {
    // console.log(this.ngModuleFactoryLoader);
    // this.loader.load(LAZY_MODULE_URL, LAZY_MODULE_NAME);
  }
}
