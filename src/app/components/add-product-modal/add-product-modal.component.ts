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
export class AddProductModalComponent implements OnInit{

  @ViewChild('closebtn') closebtn!: ElementRef;

  cred:any = {name:"", price:null,rating:null}
  productService = inject(ProductService)

  addProduct(){
    this.productService.addProducts(this.cred).subscribe(result=>{
      if(result.success){
        this.productService.getProducts().subscribe(data=>{
          this.closebtn.nativeElement.click()
        })
      }
    })
  }

  ngOnInit(): void {
    // console.log(this.addbtn)
  }





}
