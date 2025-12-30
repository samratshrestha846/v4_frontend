import jwtDecode, { JwtPayload } from 'jwt-decode';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import HttpApi from '@project/ditconnect/Http/http';
import { ME } from '@project/ditconnect/constants/apiUrls';
import config from '../../config';
import { DitAuthUser, User } from '../../types/user/user';
import { AUTH_SESSION_KEY } from '../../constants/authConstants';

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const getUserFromSession = (): any => {
  const user = localStorage.getItem(AUTH_SESSION_KEY);
  return user ? (JSON.parse(user) as DitAuthUser) : null;
};

const clearUserSession = () => {
  localStorage.removeItem(AUTH_SESSION_KEY);
};

const refreshToken = async (requestConfig: AxiosRequestConfig) => {
  try {
    const axiosApi = axios.create({
      baseURL: config.API_URL,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    const response: AxiosResponse<{ body: { token: string } }> =
      await axiosApi.post('token/refresh');

    if (response && response.data?.body?.token) {
      localStorage.setItem(
        AUTH_SESSION_KEY,
        JSON.stringify(response.data.body)
      );

      requestConfig.headers.Authorization = `Bearer ${response.data.body.token}`;
      return requestConfig;
    }
    return requestConfig;
  } catch (error) {
    clearUserSession();
    window.location.href = '/login';
    return Promise.reject(new Error('Session expired, redirecting to login.'));
  }
};

axiosInstance.interceptors.request.use(async (requestConfig) => {
  const user = getUserFromSession();

  // If no user is found, proceed with the request as-is
  if (!user) return requestConfig;

  const decoded: JwtPayload = jwtDecode(user.token);
  const currentTime = Date.now() / 1000;

  // Check if the token is expired
  if (decoded.exp && decoded.exp < currentTime) {
    // Handle logout scenario
    if (requestConfig.url === '/logout/') {
      clearUserSession();
      window.location.href = '/login';
    }

    // Refresh token and retry request
    return refreshToken(requestConfig);
    // eslint-disable-next-line
  }
  // Attach the Authorization header if the token is valid
  requestConfig.headers.Authorization = `Bearer ${user.token}`;
  return requestConfig;
});

// intercepting to capture errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // TODO: Handle general type of error here. Any specific error such as validation should be returned as a promise and handled by specific component.
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    // if (error && error.response && error.response.status === 404) {
    //   window.location.href = '/page-not-found';
    // }

    if (error && error.response && error.response.status === 403) {
      window.location.href = '/permission-denied';
    }

    if (error && error.response && error.response.status === 401) {
      clearUserSession();
    }
    return Promise.reject(error);
  }
);

const prepareSearchParams = (params: Object = {}) => {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

class APICore {
  /**
   * Fetches data from given url
   */
  // eslint-disable-next-line
  get = (url: string, params?: Object | null) => {
    let response;
    if (params) {
      const queryString = params ? prepareSearchParams(params) : '';
      response = axiosInstance.get(`${url}?${queryString}`, params);
    } else {
      response = axiosInstance.get(`${url}`);
    }
    return response;
  };
  // eslint-disable-next-line
  getFile = (url: string, params?: Object | null) => {
    let response;
    if (params) {
      const queryString = params ? prepareSearchParams(params) : '';
      response = axiosInstance.get(`${url}?${queryString}`, {
        responseType: 'blob',
      });
    } else {
      response = axiosInstance.get(`${url}`, { responseType: 'blob' });
    }
    return response;
  };
  // eslint-disable-next-line
  getMultiple = (urls: string[], params?: Object | null) => {
    const reqs = [];
    let queryString = '';
    if (params) {
      queryString = params ? prepareSearchParams(params) : '';
    }
    // eslint-disable-next-line
    for (const url of urls) {
      reqs.push(axiosInstance.get(`${url}?${queryString}`));
    }
    return Promise.all(reqs);
  };

  /**
   * post given data to url
   */
  // eslint-disable-next-line
  create = (url: string, data: any) => {
    return axiosInstance.post(url, data);
  };

  /**
   * Updates patch data
   */
  // eslint-disable-next-line
  updatePatch = (url: string, data: any) => {
    return axiosInstance.patch(url, data);
  };

  /**
   * Updates data
   */
  // eslint-disable-next-line
  update = (url: string, data: any) => {
    return axiosInstance.put(url, data);
  };

  /**
   * Deletes data
   */
  // eslint-disable-next-line
  delete = (url: string) => {
    return axiosInstance.delete(url);
  };

  // eslint-disable-next-line class-methods-use-this
  createFormData = (data: Record<any, any>) => {
    const formData = new FormData();
    // eslint-disable-next-line
    for (const k in data) {
      if (
        Array.isArray(data[k]) &&
        data[k].every((item: any) => item instanceof File)
      ) {
        data[k].forEach((file: File) => {
          formData.append(`${k}[]`, file);
        });
      } else {
        formData.append(k, data[k] !== null ? data[k] : '');
      }
    }
    return formData;
  };
  /**
   * post given data to url with file
   */
  // eslint-disable-next-line
  createWithFile = (url: string, data: any) => {
    const formData = this.createFormData(data);
    const configs = {
      headers: {
        ...axiosInstance.defaults.headers,
        'content-type': 'multipart/form-data',
      },
    };
    return axiosInstance.post(url, formData, configs);
  };

  /**
   * post given data to url with file
   */
  // eslint-disable-next-line
  updateWithFile = (url: string, data: any) => {
    const formData = this.createFormData(data);

    const configs = {
      headers: {
        ...axiosInstance.defaults.headers,
        'content-type': 'multipart/form-data',
      },
    };
    return axiosInstance.patch(url, formData, configs);
  };

  isUserAuthenticated = () => {
    const user = this.getLoggedInUser();
    if (!user || (user && !user.token)) {
      return false;
    }
    return true;
  };

  // eslint-disable-next-line
  setLoggedInUser = (user: DitAuthUser | null) => {
    if (user) {
      const httpApi = new HttpApi();
      // TODO TEMP fix for now. use Global auth state
      try {
        httpApi.get(ME).then((data: any) => {
          const ditConnectUser = data.data.data;
          user.roles.push(...ditConnectUser.roles);
          user.permissions.push(...ditConnectUser.permissions);
          user.platforms = ['dit-connect', 'uhub'];
          localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(`error ${error}`);
      }
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_SESSION_KEY);
    }
  };

  /**
   * Returns the logged in user
   */
  // eslint-disable-next-line
  getLoggedInUser = () => {
    return getUserFromSession();
  };

  setUserInSession = (modifiedUser: User) => {
    const userInfo = localStorage.getItem(AUTH_SESSION_KEY);
    if (userInfo) {
      const { token, ...otherProps } = JSON.parse(userInfo) as DitAuthUser;
      this.setLoggedInUser({ token, ...otherProps, ...modifiedUser });
    }
  };
}
// eslint-disable-next-line
export { APICore };
