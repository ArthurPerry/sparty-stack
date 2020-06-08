import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationComponent } from '../recommendation/recommendation.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CarouselModule, MediaModule} from "@spartacus/storefront";
import {UrlModule} from "@spartacus/core";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [RecommendationComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UrlModule,
    MediaModule,
    HttpClientModule,
    CarouselModule
  ],
  exports: [RecommendationComponent]
})
export class RecommendationModule { }
