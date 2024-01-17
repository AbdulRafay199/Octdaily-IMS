import {Component, DoCheck, Input, OnInit, ViewChild, inject } from '@angular/core';
import {CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
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
  imports: [RatingModule, NgFor,NgIf, FormsModule, FormsModule, CurrencyPipe, DltConfirmationModalComponent, EditConfirmationModalComponent,SearchFilterPipe,DropdownModule,MultiSelectModule]
})
export class ProductsTableComponent implements OnInit{
  
  @ViewChild(EditConfirmationModalComponent) editcomponent!:EditConfirmationModalComponent
  
  // dependency Injection for ngrx store and product service
  store = inject(Store)
  productService = inject(ProductService)
  
  productsList!:any;

  //created variables to store newest and oldest product paginated list
  indProductId!:string;
  newestProdList:any;
  oldestProducts:any=[]

  //for search filter pipe
  searchval!:string;

  //for dropdown
  selectedOption:any ={name:"Oldest",value:"1"};
  options: any | undefined;

  // for multiselect 
  selectedOption1:any =[
    {name:"Sno",value:"sno"},
    {name:"name",value:"name"},
    {name:"price",value:"price"},
    {name:"rating",value:"rating"}
  ];
  options1: any | undefined;

  // necessary attributes for Pagination
  currentPage: number = 1;
  itemsPerPage: number = 4; // Choose number of items per page
  totalItems: number=0;

  //getting index on the basis of current page number
  startIndex = (this.currentPage - 1) * this.itemsPerPage;
  endIndex = this.startIndex + this.itemsPerPage;

  // After component Initialization this function will run first before rendering
  ngOnInit(): void {

    // setting dropdown option
    this.options = [
      {name:"Oldest",value:"1"},
      {name:"Newest",value:"2"},
    ]

    // setting multiselect option values
    this.options1 = [
      {name:"Sno",value:"sno"},
      {name:"name",value:"name"},
      {name:"price",value:"price"},
      {name:"rating",value:"rating"},
    ]

    //fetching all products from store and storing oldest and newest products list with pagination in oldestProducts and newestProdList variable
    this.store.select('products').subscribe(data=>{
      this.oldestProducts = [...data].slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
      this.newestProdList = [...data].reverse().slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
      this.totalItems = data.length
      this.productsList = data
    })

  }

  checkvalue(value:string){
    // first we iterate through each object
    for (const option of this.selectedOption1) {
      // if any of the object value is equal to fprovided value in function means that column should be render thus we have to return true otherwise false
      if (option.value === value) {
        return true; 
      }
    }
    return false;
  }

  // this will set the id of selected product to edit
  setProductToEdit(product:any){
    // this line will change the value in child edit modal component to selected product object 
    this.editcomponent.changeDefaultValue(product)
    this.indProductId = product._id
  }

  // pagination next function
  nextPage() {
      if (this.currentPage < this.calculateTotalPages()) {
          this.currentPage++;
          this.oldestProducts = [...this.productsList].slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
          this.newestProdList = [...this.productsList].reverse().slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
      }
  }
  
  // pagination previous function
  previousPage() {
      if (this.currentPage > 1) {
          this.currentPage--;
          this.oldestProducts = [...this.productsList].slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
          this.newestProdList = [...this.productsList].reverse().slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
      }
  }
  
  // this function calculates total pages
  calculateTotalPages(): number {
    // first we check if search input field value is not empty or undefined if true then it means we have to get total pages from paginated list (oldestProducts/newestProdList) else we calculate from productsList
    if(this.searchval!=="" && this.searchval!==undefined){
      if(this.options.value==='1'){
        // if sorting dropdown is selected to oldest
        return Math.ceil(this.oldestProducts.length / this.itemsPerPage);
      }
      else{
        // if sorting dropdown is selected to newest
        return Math.ceil(this.newestProdList.length / this.itemsPerPage);
      }
    }
    else{
      return Math.ceil(this.productsList.length / this.itemsPerPage);
    }
  }


}
