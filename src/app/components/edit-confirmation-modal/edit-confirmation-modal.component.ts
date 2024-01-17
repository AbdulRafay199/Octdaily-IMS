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
export class EditConfirmationModalComponent implements OnInit{

  @ViewChild('closebtn') closebtn!: ElementRef;

  productService = inject(ProductService)
  @Input() productId!:string;

  productItem:any = {name:"", price:"", rating:""}

  ngOnInit(): void {
  }

  changeDefaultValue(item:any){
    this.productItem = {name:item.name, price:item.price, rating:item.rating}
  }
  
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
