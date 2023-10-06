import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Profile } from '@types';
import { getBrandProfileThunk, getKitchenCenterProfileThunk, getStoreProfileThunk } from './profileThunk';

interface ProfileState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  profile: Profile | null;
}

const initialState: ProfileState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  profile: null,
};

export const getKitchenCenterProfile = createAsyncThunk(
  'product/get-kitchen-center-profile',
  getKitchenCenterProfileThunk
);
export const getBrandProfile = createAsyncThunk('product/get-brand-profile', getBrandProfileThunk);
export const getStoreProfile = createAsyncThunk('product/get-store-profile', getStoreProfileThunk);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getKitchenCenterProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getKitchenCenterProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getKitchenCenterProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      .addCase(getBrandProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrandProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getBrandProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      .addCase(getStoreProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStoreProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getStoreProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

const profileReducer = profileSlice.reducer;

export default profileReducer;
