import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ProductsTableComponent } from "../products-table/products-table.component";
import { AddProductModalComponent } from "../add-product-modal/add-product-modal.component";
import { ProductService } from '../../services/productService/product.service';
import { Store } from '@ngrx/store';
import { fetchproduct } from '../../store/products/products.actions';
import { filter } from 'rxjs';

@Component({
    selector: 'app-products-page',
    standalone: true,
    templateUrl: './products-page.component.html',
    styleUrl: './products-page.component.css',
    imports: [ProductsTableComponent, AddProductModalComponent]
})
export class ProductsPageComponent implements OnInit {

    productService = inject(ProductService)
    store = inject(Store)
    products:any=[];

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products) => {
              this.store.dispatch(fetchproduct({ products }));
            },
            (error) => {
              console.error('Error fetching products:', error);
            }
          );
      
          this.store.select('products').subscribe((data) => {
            this.products = data;
          });
    }


}
