import { UserAuth } from '@types';
import { StorageKeys } from 'constants/storageKeys';
import Cookie from 'js-cookie';
import { Md5 } from 'ts-md5';

// localstorage
export const setLocalStorage = (name: string, value: any) => {
  localStorage.setItem(name, value);
};
export const getLocalStorage = (name: string) => localStorage.getItem(name);
export const removeLocalStorage = (key: any) => localStorage.removeItem(key);

export const setUserAuth = (userAuth: UserAuth) => setLocalStorage(StorageKeys.USER_AUTH, JSON.stringify(userAuth));
export const getUserAuth = () => {
  const userAuth = getLocalStorage(StorageKeys.USER_AUTH);
  if (userAuth === null) {
    return;
  }
  const userRaw = JSON.parse(userAuth);
  return userRaw;
};
export const removeUserAuth = () => removeLocalStorage(StorageKeys.USER_AUTH);

export const setAuthenticated = () => setLocalStorage(StorageKeys.AUTHENTICATE, true);
export const getAuthenticated = () => {
  const isAuthenticated = getLocalStorage(StorageKeys.AUTHENTICATE);
  if (isAuthenticated === null || isAuthenticated === undefined) {
    return false;
  }
  return Boolean(isAuthenticated);
};
export const removeAuthenticated = () => removeLocalStorage(StorageKeys.AUTHENTICATE);

export const setEmailVerify = (email: string) => setLocalStorage(StorageKeys.EMAIL_VERIFY, email);
export const getEmailVerify = () => {
  const emailStorage = getLocalStorage(StorageKeys.EMAIL_VERIFY);
  if (emailStorage === null || emailStorage === undefined) {
    return '';
  }
  return emailStorage;
};
export const removeEmailVerify = () => removeLocalStorage(StorageKeys.EMAIL_VERIFY);

export const getLanguage = () => getLocalStorage(StorageKeys.I18_LANGUAGE);
export const removeLanguage = () => removeLocalStorage(StorageKeys.I18_LANGUAGE);

// cookie
export const setAccessToken = (accessToken: string) => Cookie.set(StorageKeys.ACCESS_TOKEN, accessToken);
export const getAccessToken = () =>
  document.cookie
    .split('; ')
    .find((row) => row.startsWith(StorageKeys.ACCESS_TOKEN))
    ?.split('=')[1];

export const removeAccessToken = () => Cookie.remove(StorageKeys.ACCESS_TOKEN);

export const setRefreshToken = (refreshToken: string) => Cookie.set(StorageKeys.REFRESH_TOKEN, refreshToken);
export const getRefreshToken = () =>
  document.cookie
    .split('; ')
    .find((row) => row.startsWith(StorageKeys.REFRESH_TOKEN))
    ?.split('=')[1];
export const removeRefreshToken = () => Cookie.remove(StorageKeys.REFRESH_TOKEN);

// hash password
export const hashPasswordMD5 = (password: string) => Md5.hashStr(password);

// get API error message
export const getErrorMessage = (error: any) => error?.response.data.Message[0].DescriptionError[0];
