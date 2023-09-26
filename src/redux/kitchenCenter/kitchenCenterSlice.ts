import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { KitchenCenter } from '@types';
import kitchenCenters from 'mock/kitchenCenter';
import {
  createNewKitchenCenterThunk,
  deleteKitchenCenterThunk,
  getAllKitchenCentersThunk,
  getKitchenCenterDetailThunk,
  updateKitchenCenterThunk,
} from './kitchenCenterThunk';

interface KitchenCenterState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  kitchenCenters: KitchenCenter[];
  kitchenCenter: KitchenCenter | null;
}

const initialState: KitchenCenterState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  kitchenCenters: kitchenCenters,
  kitchenCenter: null,
};

export const createNewKitchenCenter = createAsyncThunk(
  'kitchenCenter/create-kitchen-center',
  createNewKitchenCenterThunk
);
export const getAllCategories = createAsyncThunk('kitchenCenter/get-all-kitchen-centers', getAllKitchenCentersThunk);
export const getKitchenCenterDetail = createAsyncThunk(
  'kitchenCenter/get-kitchen-center-detail',
  getKitchenCenterDetailThunk
);
export const updateKitchenCenter = createAsyncThunk('kitchenCenter/update-kitchen-center', updateKitchenCenterThunk);
export const deleteKitchenCenter = createAsyncThunk('kitchenCenter/delete-kitchen-center', deleteKitchenCenterThunk);

const kitchenCenterSlice = createSlice({
  name: 'kitchenCenter',
  initialState,
  reducers: {
    getKitchenCenterDetail_local: (state, action) => {
      console.log(action);
      state.kitchenCenter = action.payload;
    },
    setAddKitchenCenter: (state) => {
      state.isEditing = false;
    },
    setEditKitchenCenter: (state, action) => {
      state.isEditing = true;
      state.kitchenCenter = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewKitchenCenter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewKitchenCenter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createNewKitchenCenter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getKitchenCenterDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getKitchenCenterDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getKitchenCenterDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateKitchenCenter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateKitchenCenter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateKitchenCenter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteKitchenCenter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteKitchenCenter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteKitchenCenter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { getKitchenCenterDetail_local, setAddKitchenCenter, setEditKitchenCenter } = kitchenCenterSlice.actions;
const kitchenCenterReducer = kitchenCenterSlice.reducer;

export default kitchenCenterReducer;
