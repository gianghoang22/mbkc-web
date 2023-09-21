import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import categoryReducer from './category/categorySlice';
import extraCategoryReducer from './extraCategory/extraCategorySlice';
import kitchenCenterReducer from './kitchenCenter/kitchenCenterSlice';
import productReducer from './product/productSlice';
import storeReducer from './store/storeSlice';
import kitchenReducer from './kitchen/kitchenSlice';
import brandReducer from './brand/brandSlice';

export const store = configureStore({
  reducer: {
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
