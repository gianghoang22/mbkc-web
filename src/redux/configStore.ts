import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/authSlice';
import brandReducer from './brand/brandSlice';
import categoryReducer from './category/categorySlice';
import extraCategoryReducer from './extraCategory/extraCategorySlice';
import kitchenCenterReducer from './kitchenCenter/kitchenCenterSlice';
import productReducer from './product/productSlice';
import storeReducer from './store/storeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    brand: brandReducer,
    kitchenCenter: kitchenCenterReducer,
    store: storeReducer,
    category: categoryReducer,
    extraCategory: extraCategoryReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
