import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { Observable, of, combineLatest } from "rxjs";
import {Product, ProductService, UserService, User} from "@spartacus/core";
import {CurrentProductService} from "@spartacus/storefront";
import {HttpClient} from "@angular/common/http";
import {filter, map, mergeMap, switchMap, tap} from "rxjs/operators";

class Product1 {
  id: string;
}


@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {
  @Input() atype: string;
  title: string;
  prod: Product;
  items$: Observable<Observable<Product>[]>;
  productItems = [];
  selectedProduct: Product1;
  temp: Product1[];
  buiprod: Product;
  uid: string;
  carouselType = '';

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private http: HttpClient,
    protected currentPageService: CurrentProductService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.title = "Customers who " + this.atype + " this item also " + this.atype;

    this.items$ = this.userService.get()
      .pipe(
        mergeMap(data => {
          this.uid = data.uid;
          return of(data);
        }),
        filter(data => data !== undefined),
        mergeMap(data => this.currentPageService.getProduct()),
        mergeMap(v => {
          this.buiprod = v;
          return of(v);
        }),
        filter(v => v !== undefined),
        mergeMap(() => {
          let u = ""
          if(this.atype == 'bought'){
            if(this.uid){
              u = "/" + this.uid;
            }else{
              u = "/0";
            }
          }
          return this.http
            .get<any>(
              "https://recommends.k112ac.cx-coe.shoot.canary.k8s-hana.ondemand.com/" + this.atype + "/" +
              this.buiprod.code + u
            )
        }),
        mergeMap( res => {
          console.log("res = " + JSON.stringify(res));
          let resultArray = [];
          if(res){
            if(res.recommendationType == 'alsoBoughtProducts'){
              console.log("Bought products")
              this.temp = res.products;
              this.temp.forEach(p => {
                let prod = this.productService.get(p.id);
                if (prod !== undefined) {
                  resultArray.push(prod);
                }
              })
              this.carouselType = 'bought-products'
            }else if(res.recommendationType == 'alsoViewedProducts'){
              console.log("Viewed products")
              this.temp = res.products;
              this.temp.forEach(p => {
                let prod = this.productService.get(p.id);
                if (prod !== undefined) {
                  resultArray.push(prod);
                }
              })
              this.carouselType = 'viewed-products'
            }
          }
          else{
            console.log("No recos");
          }
          return combineLatest(resultArray);
        }),
        map(array => {
          let resultArray = [];
          array.forEach(elem => {
            if(elem !== undefined)
              resultArray.push(elem);
          });
          return resultArray.map(element => of(element));
        })
      );
  }
}
