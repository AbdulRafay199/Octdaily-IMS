import { Component, Input, OnInit } from '@angular/core';
import { AddProductModalComponent } from "../add-product-modal/add-product-modal.component";
import { ProductService } from '../../services/productService/product.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [AddProductModalComponent]
})
export class NavbarComponent{

}
