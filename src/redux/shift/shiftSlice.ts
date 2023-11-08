import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Shift } from '@types';
import shifts from 'mock/shift';
import { getAllShiftsThunk } from './shiftThunk';

interface ShiftState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  shifts: Shift[];
  shift: Shift | null;
}

const initialState: ShiftState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  shifts: shifts,
  shift: null,
};

export const getAllShifts = createAsyncThunk('shift/get-all-shifts', getAllShiftsThunk);

const ShiftSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllShifts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllShifts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getAllShifts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

const shiftReducer = ShiftSlice.reducer;
export default shiftReducer;
