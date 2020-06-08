import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageViewedModule} from "./page-viewed/page-viewed.module";
import {RecommendationModule} from "./recommendation/recommendation.module";
import {CmsConfig, ConfigModule} from "@spartacus/core";
import { ProductRecommendationsComponent } from './product-recommendations.component';

@NgModule({
  declarations: [ProductRecommendationsComponent],
  imports: [
    CommonModule,
    PageViewedModule,
    RecommendationModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        SpaProductRecommendationsComponent: {
          component: ProductRecommendationsComponent
        }
      },
    }),
  ],
  exports: [ProductRecommendationsComponent],
  entryComponents: [ProductRecommendationsComponent]
})
export class ProductRecommendationsModule { }
