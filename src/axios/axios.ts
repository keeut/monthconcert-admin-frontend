// import { COOKIE_KEYS } from '@/constants/storageKeys';
// import { getAccessToken } from '@/util/localstorage';

export const baseUrl = "https://l8z7m7cg78.execute-api.ap-northeast-2.amazonaws.com";

// export const getJWTHeaderFromLocalStorage = (): Record<string, string> => {
//   const access_token = getAccessToken();

//   if (access_token) {
//     return { Authorization: `Bearer ${access_token}` };
//   } else {
//     console.error(`cookie storage에 인증토큰 ${COOKIE_KEYS.jwtAccessToken}이 없습니다`);
//     return {};
//     // throw new Error(`local storage에 인증토큰 ${JWT_ACCESS_TOKEN_LOCALSTORAGE_KEY}이 없습니다`);
//   }
// };
