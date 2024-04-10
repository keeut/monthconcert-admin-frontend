import axios from 'axios';

import { baseUrl } from './axios';

const config = { baseURL: baseUrl };
export const publicAxiosInstance = axios.create(config);
