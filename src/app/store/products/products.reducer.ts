import { createReducer, on } from "@ngrx/store"
import { initialState } from "./products.state"
import { fetchproduct } from "./products.actions"

const _productReducer = createReducer(initialState,
    on(fetchproduct,(state:any,action:any)=>{return action.products}),
)

export function productReducer(state: any, action:any){
    return _productReducer(state,action)
}