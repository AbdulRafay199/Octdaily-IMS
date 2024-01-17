import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import {InputGroupModule} from "primeng/inputgroup"
import {InputGroupAddonModule} from "primeng/inputgroupaddon"
import { productInterface } from '../../store/products/products.interface';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/productService/product.service';

@Component({
  selector: 'app-edit-confirmation-modal',
  standalone: true,
  imports: [InputGroupModule,InputGroupAddonModule,FormsModule],
  templateUrl: './edit-confirmation-modal.component.html',
  styleUrl: './edit-confirmation-modal.component.css'
})
export class EditConfirmationModalComponent{

  // get reference to close button in html file
  @ViewChild('closebtn') closebtn!: ElementRef;

  // Dependency injection to inject services
  productService = inject(ProductService)

  // Getting Product ID from Parent Component
  @Input() productId!:string;

  // Default Product object to Edit
  productItem:any = {name:"", price:"", rating:""}

  // Function to change default value of form
  changeDefaultValue(item:any){
    this.productItem = {name:item.name, price:item.price, rating:item.rating}
  }
  
  // Function to Edit selected product and call Patch API from services
  editProduct(){
    this.productService.editProducts(this.productItem,this.productId).subscribe(result=>{
      if(result.success){
        this.productService.getProducts().subscribe(data=>{
          this.closebtn.nativeElement.click()
        })
      }
    })
  }
}
