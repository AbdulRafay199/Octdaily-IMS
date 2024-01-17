import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { productReducer } from '../products/products.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  products: productReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
