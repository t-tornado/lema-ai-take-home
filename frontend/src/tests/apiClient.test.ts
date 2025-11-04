import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAxiosApiClient } from '../lib/apiClient/axios/factory';
import type { InternalAxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import type { InterceptorFn } from '../lib/apiClient/base';

describe('createAxiosApiClient', () => {
  const baseURL = 'https://api.example.com';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('factory returns a client and has all the methods', () => {
    const client = createAxiosApiClient(baseURL);

    expect(client).toBeDefined();
    expect(client.get).toBeDefined();
    expect(client.post).toBeDefined();
    expect(client.put).toBeDefined();
    expect(client.delete).toBeDefined();
    expect(typeof client.get).toBe('function');
    expect(typeof client.post).toBe('function');
    expect(typeof client.put).toBe('function');
    expect(typeof client.delete).toBe('function');
  });

  it('request interceptor can modify config', async () => {
    const customHeader = 'Bearer test-token';
    let capturedConfig: InternalAxiosRequestConfig | null = null;

    const requestInterceptor: InterceptorFn<InternalAxiosRequestConfig> = (config) => {
      config.headers = config.headers || {};
      config.headers['Authorization'] = customHeader;
      return config;
    };

    const client = createAxiosApiClient(baseURL, requestInterceptor);

    const axiosInstance = client as AxiosInstance;

    axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      capturedConfig = config;
      return config;
    });

    axiosInstance.defaults.adapter = async (config: InternalAxiosRequestConfig) => {
      return {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    };

    await client.post('/test', { data: 'test' });

    expect(capturedConfig).not.toBeNull();
    expect(
      (capturedConfig as unknown as InternalAxiosRequestConfig)?.headers?.['Authorization'],
    ).toBe(customHeader);
  });

  interface MockResponse {
    data: Record<string, unknown>;
    status: number;
    headers: Record<string, unknown>;
    config: Record<string, unknown>;
    intercepted?: boolean;
  }

  it('response interceptor can modify response - call get request and modify the response and show that the response is indeed modified', async () => {
    const responseInterceptor: InterceptorFn<AxiosResponse> = (response) => {
      response.data = { ...response.data, intercepted: true };
      return response;
    };

    const client = createAxiosApiClient(baseURL, undefined, responseInterceptor);

    const axiosInstance = client as AxiosInstance;

    axiosInstance.defaults.adapter = async () => {
      return {
        data: { original: 'data' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };
    };

    const response = await client.get('/test');

    expect((response as MockResponse).data).toBeDefined();
    expect((response as MockResponse).data.intercepted).toBe(true);
  });
});
