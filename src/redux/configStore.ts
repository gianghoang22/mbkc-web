import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/authSlice';
import BankingAccountReducer from './bankingAccount/bankingAccountSlice';
import brandReducer from './brand/brandSlice';
import cashierReducer from './cashier/cashierSlice';
import categoryReducer from './category/categorySlice';
import kitchenCenterReducer from './kitchenCenter/kitchenCenterSlice';
import mappingProductReducer from './mappingProduct/mappingProductSlice';
import orderReducer from './order/orderSlice';
import partnerReducer from './partner/partnerSlice';
import productReducer from './product/productSlice';
import profileReducer from './profile/profileSlice';
import routesReducer from './routes/routesSlice';
import storeReducer from './store/storeSlice';
import storePartnerReducer from './storePartner/storePartnerSlice';
import walletReducer from './wallet/walletSlice';

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
    order: orderReducer,
    routes: routesReducer,
    wallet: walletReducer,
    profile: profileReducer,
    storePartner: storePartnerReducer,
    mappingProduct: mappingProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
