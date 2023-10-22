import { BrandProfile, CategoryType, KitchenCenterProfile, UserAuth, UserInfo } from '@types';
import { Error } from 'common/enum';
import { StorageKeys } from 'constants/storageKeys';
import Cookie from 'js-cookie';
import { PATH_ERROR } from 'routes/paths';
import { Md5 } from 'ts-md5';

// localstorage
export const setLocalStorage = (name: string, value: any) => {
  localStorage.setItem(name, value);
};
export const getLocalStorage = (name: string) => localStorage.getItem(name);
export const removeLocalStorage = (key: any) => localStorage.removeItem(key);

// export const setAccessToken = (accessToken: string) => localStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken);
// export const getAccessToken = () => localStorage.getItem(StorageKeys.ACCESS_TOKEN);
// export const removeAccessToken = () => localStorage.removeItem(StorageKeys.ACCESS_TOKEN);

// export const setRefreshToken = (refreshToken: string) => localStorage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken);
// export const getRefreshToken = () => localStorage.getItem(StorageKeys.REFRESH_TOKEN);
// export const removeRefreshToken = () => localStorage.removeItem(StorageKeys.REFRESH_TOKEN);

export const setUserAuth = (userAuth: UserAuth) => setLocalStorage(StorageKeys.USER_AUTH, JSON.stringify(userAuth));
export const getUserAuth = () => {
  const userAuth = getLocalStorage(StorageKeys.USER_AUTH);
  if (userAuth === null || userAuth === undefined || userAuth.toString() === 'undefined') {
    return;
  } else {
    const userRaw = JSON.parse(userAuth);
    return userRaw;
  }
};
export const removeUserAuth = () => removeLocalStorage(StorageKeys.USER_AUTH);

export const setUserInfo = (userInfo: UserInfo) => setLocalStorage(StorageKeys.USER_INFO, JSON.stringify(userInfo));
export const getUserInfo = () => {
  const userAuth = getLocalStorage(StorageKeys.USER_INFO);
  if (userAuth === null || userAuth === undefined || userAuth.toString() === 'undefined') {
    return;
  } else {
    const userRaw = JSON.parse(userAuth);
    return userRaw;
  }
};
export const removeUserInfo = () => removeLocalStorage(StorageKeys.USER_INFO);

export const setBrandInfo = (brandInfo: BrandProfile) =>
  setLocalStorage(StorageKeys.BRAND_INFO, JSON.stringify(brandInfo));
export const getBrandInfo = () => {
  const brandInfo = getLocalStorage(StorageKeys.BRAND_INFO);
  if (brandInfo === null) {
    return;
  }
  const brandRaw = JSON.parse(brandInfo);
  return brandRaw;
};
export const removeBrandInfo = () => removeLocalStorage(StorageKeys.BRAND_INFO);

export const setKitchenCenterInfo = (kitchenCenterInfo: KitchenCenterProfile) =>
  setLocalStorage(StorageKeys.KITCHEN_CENTER_INFO, JSON.stringify(kitchenCenterInfo));
export const getKitchenCenterInfo = () => {
  const kitchenCenterInfo = getLocalStorage(StorageKeys.KITCHEN_CENTER_INFO);
  if (kitchenCenterInfo === null) {
    return;
  }
  const kitchenCenterRaw = JSON.parse(kitchenCenterInfo);
  return kitchenCenterRaw;
};
export const removeKitchenCenterInfo = () => removeLocalStorage(StorageKeys.KITCHEN_CENTER_INFO);

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

export const getPathname = (name: string) => {
  const pathname = getLocalStorage(name);
  if (pathname === null || pathname === undefined) {
    return '';
  }
  return pathname;
};

export const getCategoryType = () => {
  const categoryType = getLocalStorage(StorageKeys.CATEGORY_TYPE);
  if (categoryType === null || categoryType === undefined) {
    return CategoryType.NORMAL;
  }
  const type = categoryType === CategoryType.NORMAL ? CategoryType.NORMAL : CategoryType.EXTRA;
  return type;
};

export const getIsEditing = (key: string) => {
  const isEditing = getLocalStorage(key);
  if (isEditing === null || isEditing === undefined) {
    return false;
  }

  return isEditing === 'true';
};

export const getNumberInStorage = (name: string) => {
  const number = getLocalStorage(name);
  if (number === null || number === undefined) {
    if (name === StorageKeys.PAGE) {
      return 0;
    } else if (name === StorageKeys.ROW_PER_PAGE) {
      return 5;
    }
  }
  return Number(number);
};

export const getIdInStorage = (name: string) => {
  const number = getLocalStorage(name);
  if (number === null || number === undefined) {
    return 0;
  }
  return Number(number);
};

// cookie
export const setAccessToken = (accessToken: string) => Cookie.set(StorageKeys.ACCESS_TOKEN, accessToken);
export const getAccessToken = () =>
  document.cookie
    .split('; ')
    .find((row) => row.startsWith(StorageKeys.ACCESS_TOKEN))
    ?.split('=')[1];

export const removeAccessToken = () => Cookie.remove(StorageKeys.ACCESS_TOKEN);

export const setRefreshToken = (refreshToken: string) => Cookie.set(StorageKeys.REFRESH_TOKEN, refreshToken);
export const getRefreshToken = () => {
  const refreshToken = document.cookie.split('; ').find((row) => row.startsWith(StorageKeys.REFRESH_TOKEN));
  const equalIndex = refreshToken?.indexOf('=');
  if (equalIndex !== -1) {
    var result = refreshToken?.substring(equalIndex ? equalIndex : 0 + 1);
    return result?.replace(/^=/, '');
  }
};
export const removeRefreshToken = () => Cookie.remove(StorageKeys.REFRESH_TOKEN);

// hash password
export const hashPasswordMD5 = (password: string) => Md5.hashStr(password);

// get API error message
export const getErrorMessage = (error: any, navigate: any) => {
  console.log(error);

  // const errorMessage = error?.response.data.Message[0].DescriptionError[0];
  // const errorStatus = error?.response.status;

  if (error?.code === Error.SERVER_ERROR) {
    console.log(error);
    navigate(PATH_ERROR.serverError);
    return;
  }

  // if (errorStatus === 401) {
  //   navigate(PATH_AUTH.login);
  // }

  // if (errorStatus === 403) {
  //   navigate(PATH_ERROR.noPermission);
  // }

  return error?.response.data.Message[0].DescriptionError[0];
};

// appendData
export const appendData = (data: any) => {
  const formData = new FormData();
  for (var key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};
