import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import productCategoryReducer from './category/categorySlice';
import extraCategoryReducer from './extraCategory/extraCategorySlice';
import kitchenCenterReducer from './kitchenCenter/kitchenCenterSlice';
import productReducer from './product/productSlice';
import storeReducer from './store/storeSlice';

export const store = configureStore({
  reducer: {
    store: storeReducer,
    product: productReducer,
    category: productCategoryReducer,
    extraCategory: extraCategoryReducer,
    kitchenCenter: kitchenCenterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
