import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Partner } from '@types';
import { partners } from 'mock/partner';
import {
  createNewPartnerThunk,
  deletePartnerThunk,
  getAllPartnersThunk,
  getPartnerDetailThunk,
  updatePartnerThunk,
} from './partnerThunk';

interface PartnerState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  partners: Partner[];
  partner: Partner | null;
}

const initialState: PartnerState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  partners: partners,
  partner: null,
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
    },
    setEditPartner: (state, action) => {
      state.isEditing = true;
      state.partner = action.payload;
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
