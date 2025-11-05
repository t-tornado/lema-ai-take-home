import { createAxiosApiClient } from './factory';
import { requestInterceptor } from './interceptors/request';
import { responseInterceptor } from './interceptors/response';
import { env } from '../../dotenv';

const apiClient = createAxiosApiClient(env.API_URL, requestInterceptor, responseInterceptor);

export { apiClient };
