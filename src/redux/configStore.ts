import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/authSlice';
import BankingAccountReducer from './bankingAccount/bankingAccountSlice';
import brandReducer from './brand/brandSlice';
import cashierReducer from './cashier/cashierSlice';
import categoryReducer from './category/categorySlice';
import kitchenCenterReducer from './kitchenCenter/kitchenCenterSlice';
import partnerReducer from './partner/partnerSlice';
import productReducer from './product/productSlice';
import storeReducer from './store/storeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    brand: brandReducer,
    kitchenCenter: kitchenCenterReducer,
    store: storeReducer,
    category: categoryReducer,
    product: productReducer,
    cashier: cashierReducer,
    bankingAccount: BankingAccountReducer,
    partner: partnerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
