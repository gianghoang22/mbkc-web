import moment from 'moment';
import pathRegexp from 'path-to-regexp';

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname))
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

// Custom utils
export const buildParams = ({ current, pageSize }, sorter, formData) => {
  // build filters
  const filters = {};
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      filters[`${key}`] = value;
    }
  });
  // build sort
  let sort;
  if (sorter && sorter.field) {
    sort = `${sorter.field},${sorter.order === 'ascend' ? 'ascend' : 'descend'}`;
  }

  return {
    page: current,
    size: pageSize,
    sort,
    ...filters,
  };
};

// get Cookie
export const setCookie = (cname, cvalue, expireDay = 10) => {
  const d = new Date();
  d.setTime(d.getTime() + expireDay * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

// set Cookie
export const getCookie = (cname) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
// delete all cookies
export const deleteAllCookie = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
};

// set localstorage
export const setLocalStorage = (name, value) => {
  localStorage.setItem(name, value);
};

// get localstorage
export const getLocalStorage = (name) => localStorage.getItem(name);
//
export const removeLocalStorage = (key) => localStorage.removeItem(key);

export const removeUserInfo = () => localStorage.removeItem('USER_INFO');
export const setUserInfo = (userInfo) => setLocalStorage('USER_INFO', JSON.stringify(userInfo));
export const getUserInfo = () => getLocalStorage('USER_INFO');

export const removeAppToken = (token) => localStorage.removeItem('accessToken');
export const setAppToken = (token) => setLocalStorage('accessToken', token);
export const getAppToken = () => getLocalStorage('accessToken');

export const DATE_FORMAT = 'DD/MM/YYYY';

export const convertStrToDate = (string, format = DATE_FORMAT) => moment(string, format);

export const convertDateToStr = (date, format = DATE_FORMAT) =>
  moment(date).isValid() ? moment(date).format(format).toString() : '-';

export const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

export const normalizeImg = ([firstImg]) => {
  const { response } = firstImg || {};
  return response;
};

export const formatCurrency = (amount) => {
  if (!isNaN(amount)) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }
  return '-';
};
