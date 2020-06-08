import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageViewedComponent} from "./page-viewed.component";

@NgModule({
  declarations: [PageViewedComponent],
  imports: [
    CommonModule
  ],
  exports: [PageViewedComponent]
})
export class PageViewedModule { }
