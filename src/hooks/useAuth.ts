// import { useQuery } from 'react-query';

// import { getJWTHeaderFromLocalStorage } from '@/axios/axios';
// import { checkAuthAxiosInstance } from '@/axios/privateAxios';

// export const getUser = async () => {
//   const res = await checkAuthAxiosInstance.get('/user', {
//     headers: getJWTHeaderFromLocalStorage(),
//   });

//   const data = res.data;

//   return data;
// };

// export const useAuth = () => {
//   const { refetch, isLoading, isError } = useQuery(['user'], () => getUser(), { enabled: false });

//   return { refetch, isLoading, isError };
// };
