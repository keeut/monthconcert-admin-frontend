// import axios, { AxiosRequestConfig } from 'axios';

// import { tokenRefresh } from '@/services/signin/signin';
// import { getRefreshToken } from '@/util/localstorage';

// import { baseUrl } from './axios';

// const config: AxiosRequestConfig = { baseURL: baseUrl };

// const privateAxiosInstance = axios.create(config);
// privateAxiosInstance.prototype.retryCount = 0;

// privateAxiosInstance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (error) => {
//     if (privateAxiosInstance.prototype.retryCount > 2) {
//       if (error.response.status === 401 || error.response.status === 403) {
//         return;
//       } else {
//         return Promise.reject(error);
//       }
//     }
//     privateAxiosInstance.prototype.retryCount++;
//     if (error.response.status === 401 || error.response.status === 403) {
//       console.log(`${error.response.status} error, assume as token staled and get another idtoken with refresh token`);
//       const refresh_token = getRefreshToken();

//       if (!refresh_token) {
//         console.log('refresh token not exist');
//         handleInvalidUserSession();
//         throw Promise.reject(error);
//       }
//       try {
//         const access_token_request = await tokenRefresh();
//         const access_token = access_token_request.result.accessToken;
//         const { url, params, data, method } = error.config;
//         const res = await privateAxiosInstance({
//           method,
//           data,
//           url,
//           params,
//           headers: { Authorization: `Bearer ${access_token}` },
//         });
//         return res;
//       } catch (error: any) {
//         console.log('failed to get token by refresh token');
//         handleInvalidUserSession();
//         return Promise.reject(error);
//       }
//     } else {
//       return Promise.reject(error);
//     }
//   },
// );

// const handleInvalidUserSession = () => {
//   // invalid user는 로그인으로 보내기 회원가입인 경우엔 그대로
//   if (window.location.pathname !== '/signin' && window.location.pathname !== '/signup') {
//     window.location.pathname = '/signin';
//     // alert('Session expired. Please sign in again.');
//   }
// };

// const checkAuthAxiosInstance = axios.create(config);
// checkAuthAxiosInstance.prototype.retryCount = 0;

// checkAuthAxiosInstance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (error) => {
//     if (checkAuthAxiosInstance.prototype.retryCount > 2) {
//       if (error.response.status === 401 || error.response.status === 403) {
//         return;
//       } else {
//         return Promise.reject(error);
//       }
//     }
//     checkAuthAxiosInstance.prototype.retryCount++;
//     if (error.response.status === 401 || error.response.status === 403) {
//       console.log(`${error.response.status} error, assume as token staled and get another idtoken with refresh token`);
//       const refresh_token = getRefreshToken();

//       if (!refresh_token) {
//         console.log('refresh token not exist');
//         throw Promise.reject(error);
//       }
//       try {
//         const access_token_request = await tokenRefresh();
//         const access_token = access_token_request.result.accessToken;
//         const { url, params, data, method } = error.config;
//         const res = await checkAuthAxiosInstance({
//           method,
//           data,
//           url,
//           params,
//           headers: { Authorization: `Bearer ${access_token}` },
//         });
//         return res;
//       } catch (error: any) {
//         console.log('failed to get token by refresh token');
//         return Promise.reject(error);
//       }
//     } else {
//       return Promise.reject(error);
//     }
//   },
// );

// export { checkAuthAxiosInstance, privateAxiosInstance };
