import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import extraCategoryReducer from './extraCategory/extraCategorySlice';
import productReducer from './product/productSlice';
import productCategoryReducer from './productCategory/productCategorySlice';
import storeReducer from './store/storeSlice';

export const store = configureStore({
  reducer: {
    store: storeReducer,
    product: productReducer,
    extraCategory: extraCategoryReducer,
    productCategory: productCategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
