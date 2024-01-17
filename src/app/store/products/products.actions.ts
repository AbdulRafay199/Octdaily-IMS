import { createAction, props } from "@ngrx/store";
import { productInterface } from "./products.interface";

export const fetchproduct = createAction("fetchproduct", props<{products: productInterface}>())