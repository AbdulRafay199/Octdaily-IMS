import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { ProductService } from '../../services/productService/product.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dlt-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './dlt-confirmation-modal.component.html',
  styleUrl: './dlt-confirmation-modal.component.css'
})
export class DltConfirmationModalComponent {

  @ViewChild('closebtn') closebtn!: ElementRef;

  @Input() productId!:string;
  productService = inject(ProductService)
  store = inject(Store)

  dltProduct(){
    this.productService.dltProducts(this.productId).subscribe(result=>{
      if(result.success){
        this.productService.getProducts().subscribe(data=>{
          this.closebtn.nativeElement.click()
        })
      }
      console.log("Product removed: ",result)
    })
  }
}
