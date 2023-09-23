import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { UserAuth } from '@types';
import { getUserAuth } from 'utils';
import { loginThunk, logoutThunk } from './authThunk';

interface AuthState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isAuthenticated: boolean;
  message: string;
  userAuth: UserAuth;
}

const getUserInStorage = getUserAuth() ? getUserAuth() : null;

const initialState: AuthState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  isAuthenticated: false,
  userAuth: getUserInStorage,
};

export const login = createAsyncThunk('auth/login', loginThunk);
export const logout = createAsyncThunk('auth/logout', logoutThunk);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMessageSuccess: (state, action) => {
      state.message = action.payload;
      toast.success(state.message);
    },
    setMessageInfo: (state, action) => {
      state.message = action.payload?.message;
      toast.info(state.message);
    },
    setMessageError: (state, action) => {
      state.message = action.payload;
      toast.error(state.message);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isAuthenticated = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setMessageSuccess, setMessageInfo, setMessageError } = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
