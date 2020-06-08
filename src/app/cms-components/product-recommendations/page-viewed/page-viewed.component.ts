import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {filter, switchMap} from "rxjs/operators";
import {CartDataService, Product, UserService} from "@spartacus/core";
import {HttpClient} from "@angular/common/http";
import {CurrentProductService} from "@spartacus/storefront";
import {PageViewedService} from "./page-viewed.service";

@Component({
  selector: 'app-page-viewed',
  templateUrl: './page-viewed.component.html',
  styleUrls: ['./page-viewed.component.scss']
})
export class PageViewedComponent implements OnInit {
  product$: Observable<Product> = this.currentPageService
    .getProduct()
    .pipe(filter(Boolean));


  res$: Observable<any> = this.product$.pipe(
    filter(Boolean),
    switchMap(product =>
      this.cartDataService.userId != "anonymous" ? this.pageViewedService.postView(this.cartDataService.userId, eval("product.code"), true)
        : this.cartDataService.cartId ? this.pageViewedService.postView(this.cartDataService.cartId, eval("product.code"), false)
        : new Observable()
    )
  );


  constructor(
    private http: HttpClient,
    protected currentPageService: CurrentProductService,
    private userService: UserService,
    private cartDataService: CartDataService,
    private pageViewedService: PageViewedService
  ) {}

  ngOnInit() {
    this.res$.subscribe();
  }
}
