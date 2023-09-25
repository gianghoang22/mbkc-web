import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserAuth } from '@types';
import { toast } from 'react-toastify';
import { getAuthenticated, getEmailVerify, getUserAuth, setEmailVerify } from 'utils';
import { forgotPasswordThunk, loginThunk, logoutThunk, resetPasswordThunk, verifyOtpThunk } from './authThunk';

interface AuthState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isAuthenticated: boolean;
  message: string;
  email: string;
  userAuth: UserAuth;
}

const getUserInStorage = getUserAuth() ? getUserAuth() : null;
const getIsAuthenticated = getAuthenticated() ? getAuthenticated() : false;
const getEmailInStorage = getEmailVerify() ? getEmailVerify() : '';

const initialState: AuthState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isAuthenticated: getIsAuthenticated,
  message: '',
  email: getEmailInStorage,
  userAuth: getUserInStorage,
};

export const login = createAsyncThunk('auth/login', loginThunk);
export const forgotPassword = createAsyncThunk('auth/forgot-password', forgotPasswordThunk);
export const verifyOtp = createAsyncThunk('auth/verify-otp', verifyOtpThunk);
export const resetPassword = createAsyncThunk('auth/reset-password', resetPasswordThunk);
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
    setEmail: (state, action) => {
      state.email = action.payload?.email;
      setEmailVerify(action.payload?.email);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        console.log(getIsAuthenticated);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.userAuth = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isAuthenticated = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
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

export const { setMessageSuccess, setMessageInfo, setMessageError, setEmail } = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
