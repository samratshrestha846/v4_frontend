import jwtDecode, { JwtPayload } from 'jwt-decode';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { DitAuthUser, User } from '../../../types/user/user';

import config from '../../../config';
import { AUTH_SESSION_KEY } from '../../../constants/authConstants';

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

class APICoreP {
  axiosInstance: any;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      withCredentials: true,
    });

    this.axiosInstance.interceptors.request.use(
      async (requestConfig: AxiosRequestConfig) => {
        const user = getUserFromSession();
        if (!user) {
          return requestConfig;
        }
        const decoded: JwtPayload = jwtDecode(user.token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          if (requestConfig.url === '/logout/') {
            clearUserSession();
            window.location.href = '/login';
          }
          return refreshToken(requestConfig);
          // eslint-disable-next-line
        } else {
          requestConfig.headers.Authorization = `Bearer ${user.token}`;
          return requestConfig;
        }
      }
    );

    // intercepting to capture errors
    this.axiosInstance.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: {
        response: { status: number; data: { status: { code_text: string } } };
      }) => {
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
          if (error.response.data.status.code_text === 'Unauthenticated.')
            window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  static prepareSearchParams(params: Object = {}) {
    return Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }

  /**
   * Fetches data from given url
   */
  // eslint-disable-next-line
  get = (url: string, params?: Object | null) => {
    let response;
    if (params) {
      const queryString = params ? APICoreP.prepareSearchParams(params) : '';
      response = this.axiosInstance.get(`${url}?${queryString}`, params);
    } else {
      response = this.axiosInstance.get(`${url}`);
    }
    return response;
  };

  // eslint-disable - next - line
  getFile = (url: string, params?: Object | null) => {
    let response;
    if (params) {
      const queryString = params ? APICoreP.prepareSearchParams(params) : '';
      response = this.axiosInstance.get(`${url}?${queryString}`, {
        responseType: 'blob',
      });
    } else {
      response = this.axiosInstance.get(`${url}`, { responseType: 'blob' });
    }
    return response;
  };
  // eslint-disable-next-line
  getMultiple = (urls: string[], params?: Object | null) => {
    const reqs = [];
    let queryString = '';
    if (params) {
      queryString = params ? APICoreP.prepareSearchParams(params) : '';
    }
    // eslint-disable-next-line
    for (const url of urls) {
      reqs.push(this.axiosInstance.get(`${url}?${queryString}`));
    }
    return Promise.all(reqs);
  };

  /**
   * post given data to url
   */
  // eslint-disable-next-line
  create = (url: string, data: any) => {
    return this.axiosInstance.post(url, data);
  };

  /**
   * Updates patch data
   */
  // eslint-disable-next-line
  updatePatch = (url: string, data: any) => {
    return this.axiosInstance.patch(url, data);
  };

  /**
   * Updates data
   */
  // eslint-disable-next-line
  update = (url: string, data: any) => {
    return this.axiosInstance.put(url, data);
  };

  /**
   * Deletes data
   */
  // eslint-disable-next-line
  delete = (url: string) => {
    return this.axiosInstance.delete(url);
  };

  // eslint-disable-next-line class-methods-use-this
  createFormData = (data: Record<any, any>) => {
    const formData = new FormData();
    // eslint-disable-next-line
    for (const k in data) {
      if (Array.isArray(data[k])) {
        // handle array of files
        if (data[k].every((item: any) => item instanceof File)) {
          data[k].forEach((file: File) => {
            formData.append(`${k}[]`, file);
          });
        } else {
          // handle array of objects
          data[k].forEach((item, keyIndex) => {
            Object.entries(item).forEach(([key, value]) => {
              formData.append(`${k}[${keyIndex}][${key}]`, String(value));
            });
          });
        }
      } else {
        // handle for single values
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
        ...this.axiosInstance.defaults.headers,
        'content-type': 'multipart/form-data',
      },
    };
    return this.axiosInstance.post(url, formData, configs);
  };

  /**
   * post given data to url with file
   */
  // eslint-disable-next-line
  updateWithFile = (url: string, data: any) => {
    const formData = this.createFormData(data);

    const configs = {
      headers: {
        ...this.axiosInstance.defaults.headers,
        'content-type': 'multipart/form-data',
      },
    };
    return this.axiosInstance.patch(url, formData, configs);
  };

  // download file
  // eslint-disable-next-line
  downloadFile = (url: string, params?: Object | null) => {
    let response;
    if (params) {
      const queryString = params ? APICoreP.prepareSearchParams(params) : '';
      response = this.axiosInstance.get(`${url}?${queryString}`, {
        params,
        responseType: 'blob', // Set response type to blob
      });
    } else {
      response = this.axiosInstance.get(url, {
        responseType: 'blob', // Set response type to blob
      });
    }
    return response;
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
export { APICoreP };
