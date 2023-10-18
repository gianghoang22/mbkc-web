import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Partner } from '@types';
import {
  createNewPartnerThunk,
  deletePartnerThunk,
  getAllPartnersThunk,
  getPartnerDetailThunk,
  updatePartnerThunk,
} from './partnerThunk';
import { StorageKeys } from 'constants/storageKeys';
import { getIsEditing, setLocalStorage } from 'utils';

interface PartnerState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  partners: Partner[];
  partner: Partner | null;
  totalPage: number;
  numberItems: number;
}

const getIsEditingInStorage = getIsEditing(StorageKeys.IS_EDIT_PARTNER)
  ? getIsEditing(StorageKeys.IS_EDIT_PARTNER)
  : false;

const initialState: PartnerState = {
  isEditing: getIsEditingInStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  partners: [],
  partner: null,
  totalPage: 0,
  numberItems: 5,
};

export const createNewPartner = createAsyncThunk('partner/create-Partner', createNewPartnerThunk);
export const getAllPartners = createAsyncThunk('partner/get-all-Partners', getAllPartnersThunk);
export const getPartnerDetail = createAsyncThunk('partner/get-Partner-detail', getPartnerDetailThunk);
export const updatePartner = createAsyncThunk('partner/update-Partner', updatePartnerThunk);
export const deletePartner = createAsyncThunk('partner/delete-Partner', deletePartnerThunk);

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    setAddPartner: (state) => {
      state.isEditing = false;
      setLocalStorage(StorageKeys.IS_EDIT_PARTNER, false);
    },
    setEditPartner: (state, action) => {
      state.isEditing = true;
      state.partner = action.payload;
      setLocalStorage(StorageKeys.IS_EDIT_PARTNER, true);
    },
    getPartnerDetail_local: (state, action) => {
      state.partner = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewPartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewPartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createNewPartner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllPartners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPartners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.partners = [...action.payload?.partners];
        state.totalPage = action.payload?.totalPage;
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllPartners.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getPartnerDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPartnerDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.partner = { ...action.payload };
      })
      .addCase(getPartnerDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updatePartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updatePartner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deletePartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deletePartner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setAddPartner, setEditPartner, getPartnerDetail_local } = partnerSlice.actions;
const partnerReducer = partnerSlice.reducer;

export default partnerReducer;
