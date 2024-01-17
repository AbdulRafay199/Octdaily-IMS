import {Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import {CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DltConfirmationModalComponent } from "../dlt-confirmation-modal/dlt-confirmation-modal.component";
import { EditConfirmationModalComponent } from "../edit-confirmation-modal/edit-confirmation-modal.component";
import { Store } from '@ngrx/store';
import { ProductService } from '../../services/productService/product.service';
import { SearchFilterPipe } from '../../pipes/searchFilterPipe/search-filter.pipe';


@Component({
    selector: 'app-products-table',
    standalone: true,
    templateUrl: './products-table.component.html',
    styleUrl: './products-table.component.css',
    imports: [RatingModule, NgFor,NgIf, FormsModule, FormsModule, CurrencyPipe, DltConfirmationModalComponent, EditConfirmationModalComponent,SearchFilterPipe,DropdownModule]
})
export class ProductsTableComponent implements OnInit{

    @ViewChild(EditConfirmationModalComponent) editcomponent!:EditConfirmationModalComponent
    @Input() productsList:any;

    store = inject(Store)
    productService = inject(ProductService)

    indProductId!:string;
    reversedProdList:any;

    searchval!:string;
    selectedOption:any ={name:"Oldest",value:"1"};
    options: any | undefined;

    currentPage: number = 1;
    itemsPerPage: number = 4; // Choose your desired number of items per page
    totalItems: number=0;
    //getting index on the basis of current page number
    startIndex = (this.currentPage - 1) * this.itemsPerPage;
    endIndex = this.startIndex + this.itemsPerPage;


    paginatedProducts:any=[]

    ngOnInit(): void {
      this.options = [
        {name:"Oldest",value:"1"},
        {name:"Newest",value:"2"},
      ]
      // setTimeout(() => {
      //   this.paginatedProducts = [...this.productsList].slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
      //   this.reversedProdList = [...this.productsList].reverse().slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
      //   this.totalItems = this.productsList.length
      // }, 500);
      this.store.select('products').subscribe(data=>{
        console.log(data)
        this.paginatedProducts = [...data].slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
        this.reversedProdList = [...data].reverse().slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
        this.totalItems = data.length
      })
    }
    
      setProductToEdit(product:any){
        this.editcomponent.changeDefaultValue(product)
        this.indProductId = product._id
      }

    nextPage() {
        if (this.currentPage < this.calculateTotalPages()) {
            this.currentPage++;
            this.paginatedProducts = [...this.productsList].slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
            this.reversedProdList = [...this.productsList].reverse().slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
        }
    }
    
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.paginatedProducts = [...this.productsList].slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
            this.reversedProdList = [...this.productsList].reverse().slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
        }
    }
    
    calculateTotalPages(): number {
        return Math.ceil(this.productsList.length / this.itemsPerPage);
    }

}
