import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { KitchenCenter } from '@types';
import {
  createNewKitchenCenterThunk,
  deleteKitchenCenterThunk,
  getAllKitchenCentersThunk,
  getKitchenCenterDetailThunk,
  updateKitchenCenterThunk,
} from './kitchenCenterThunk';
import { toast } from 'react-toastify';

interface KitchenCenterState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string[];
  successMessage: string;
  kitchenCenters: KitchenCenter[];
  kitchenCenter: KitchenCenter | null;
  totalPage: number;
  numberItems: number;
}

const initialState: KitchenCenterState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: [''],
  kitchenCenters: [],
  successMessage: '',
  totalPage: 0,
  numberItems: 0,
  kitchenCenter: null,
};

export const createNewKitchenCenter = createAsyncThunk(
  'kitchenCenter/create-kitchen-center',
  createNewKitchenCenterThunk
);

export const getAllKitchenCenters = createAsyncThunk(
  'kitchenCenter/get-all-kitchen-centers',
  getAllKitchenCentersThunk
);

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
    setMessageSuccess: (state, action) => {
      state.successMessage = action?.payload?.message;
      toast.success(state.successMessage);
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
        state.successMessage = action.payload?.message;
      })
      .addCase(createNewKitchenCenter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllKitchenCenters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllKitchenCenters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.kitchenCenters = [...action.payload?.kitchenCenters];
        state.numberItems = action.payload?.numberItems;
        state.totalPage = action.payload?.totalPages;
      })
      .addCase(getAllKitchenCenters.rejected, (state, action) => {
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
        state.kitchenCenter = action.payload;
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

export const { getKitchenCenterDetail_local, setAddKitchenCenter, setEditKitchenCenter, setMessageSuccess } =
  kitchenCenterSlice.actions;
const kitchenCenterReducer = kitchenCenterSlice.reducer;

export default kitchenCenterReducer;
