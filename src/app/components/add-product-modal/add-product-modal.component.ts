import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {InputGroupModule} from "primeng/inputgroup"
import {InputGroupAddonModule} from "primeng/inputgroupaddon"
import { ProductService } from '../../services/productService/product.service';

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  imports: [InputGroupModule,InputGroupAddonModule,FormsModule],
  templateUrl: './add-product-modal.component.html',
  styleUrl: './add-product-modal.component.css'
})
export class AddProductModalComponent{

  // get reference to close button in html file
  @ViewChild('closebtn') closebtn!: ElementRef;

  // Dependency injection to inject services
  productService = inject(ProductService)

  // Product object to add
  cred:any = {name:"", price:null,rating:null}

  // function to add new product and call api from services
  addProduct(){
    this.productService.addProducts(this.cred).subscribe(result=>{
      if(result.success){
        this.productService.getProducts().subscribe(data=>{
          this.closebtn.nativeElement.click()
          this.cred = {name:"", price:null,rating:null}
        })
      }
    })
  }

}
