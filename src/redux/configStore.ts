import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/authSlice';
import brandReducer from './brand/brandSlice';
import categoryReducer from './category/categorySlice';
import extraCategoryReducer from './extraCategory/extraCategorySlice';
import kitchenReducer from './kitchen/kitchenSlice';
import kitchenCenterReducer from './kitchenCenter/kitchenCenterSlice';
import productReducer from './product/productSlice';
import storeReducer from './store/storeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    store: storeReducer,
    product: productReducer,
    category: categoryReducer,
    extraCategory: extraCategoryReducer,
    kitchenCenter: kitchenCenterReducer,
    kitchen: kitchenReducer,
    brand: brandReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
