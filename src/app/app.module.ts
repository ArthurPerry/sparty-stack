import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { translationChunksConfig, translations } from '@spartacus/assets';
import { OccConfig,ConfigModule} from '@spartacus/core';
import { B2cStorefrontModule,LayoutConfig } from '@spartacus/storefront';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ProductRecommendationsModule } from "./cms-components/product-recommendations/product-recommendations.module";

const occConfig: OccConfig = { backend: { occ: {} } };
export const translationOverwrites = {
  en: { // lang
    product: { // chunk
      CMSTabParagraphContainer: { // keys (nested)
        tabs: {
          ProductDetailsTabComponent: "Product Details",
          ProductSpecsTabComponent: "Specs",
          ProductReviewsTabComponent: "Reviews",
          deliveryTab: "Shipping"

        }

      },
    },
  },
};


// only provide the `occ.baseUrl` key if it is explicitly configured, otherwise the value of
// <meta name="occ-backend-base-url" > is ignored.
// This in turn breaks the deployment in CCv2
if (environment.occBaseUrl) {
  occConfig.backend.occ.baseUrl = environment.occBaseUrl;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    B2cStorefrontModule.withConfig({
      backend: occConfig.backend,
      authentication: {
        client_id: 'client4kyma',
        client_secret: 'secret',
      },
      context: {
        baseSite: ['electronics-spa'],
      },
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en',
      },
      features: {
        level: '1.2',
      },
      personalization: {
        enabled: true,
      },
    }),
    ConfigModule.withConfig({
      i18n: { resources: translationOverwrites }
    }),
    ConfigModule.withConfig(<LayoutConfig>{
      layoutSlots: {
        ProductDetailsPageTemplate: {
          slots: [
'PlaceholderContentSlot',
'Summary',
'SpaProductRecommendationsPosition',
            'UpSelling',
            'CrossSelling',
            'Tabs'

          ],
        },
      }
    }
    ),


        ProductRecommendationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
