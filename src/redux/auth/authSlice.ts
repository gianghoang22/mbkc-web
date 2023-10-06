import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserAuth, UserInfo } from '@types';
import { toast } from 'react-toastify';
import { getAuthenticated, getEmailVerify, getUserAuth, getUserInfo, setEmailVerify } from 'utils';
import {
  forgotPasswordThunk,
  getUserInfoThunk,
  loginThunk,
  logoutThunk,
  resetPasswordThunk,
  updatePasswordThunk,
  verifyOtpThunk,
} from './authThunk';

interface AuthState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isAuthenticated: boolean;
  message: string;
  email: string;
  userAuth: UserAuth;
  userInfo: UserInfo;
}

const getUserInStorage = getUserAuth() ? getUserAuth() : null;
const getUserInfoInStorage = getUserInfo() ? getUserInfo() : null;
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
  userInfo: getUserInfoInStorage,
};

export const login = createAsyncThunk('auth/login', loginThunk);
export const getUserInformation = createAsyncThunk('account/user-information', getUserInfoThunk);
export const forgotPassword = createAsyncThunk('auth/forgot-password', forgotPasswordThunk);
export const verifyOtp = createAsyncThunk('auth/verify-otp', verifyOtpThunk);
export const resetPassword = createAsyncThunk('auth/reset-password', resetPasswordThunk);
export const updatePassword = createAsyncThunk('auth/update-password', updatePasswordThunk);
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
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.userAuth = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isAuthenticated = false;
      })
      .addCase(getUserInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInformation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      .addCase(getUserInformation.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(verifyOtp.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setMessageSuccess, setMessageInfo, setMessageError, setEmail } = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
