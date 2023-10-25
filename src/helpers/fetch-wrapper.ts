"use client";
import { createDefaultConfig } from "@/utils/create-default-config";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

class FetchWrapper {
  constructor() {
    this.responseInterceptor;
  }

  private responseInterceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("access_token");
        window.location.href = "/auth/login";
      }
      return Promise.reject(error);
    }
  );

  async get<T>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<T> {
    const defaultConfig = createDefaultConfig(config);
    const response: AxiosResponse<T> = await axios.get(url, defaultConfig);
    return response.data;
  }

  async post<T, K>(
    url: string,
    body: K,
    config?: AxiosRequestConfig | undefined
  ): Promise<T> {
    const defaultConfig = createDefaultConfig(config);
    const response: AxiosResponse<T> = await axios.post(
      url,
      body,
      defaultConfig
    );
    return response.data;
  }

  async put<T, K>(
    url: string,
    body: K,
    config?: AxiosRequestConfig | undefined
  ): Promise<T> {
    const defaultConfig = createDefaultConfig(config);
    const response: AxiosResponse<T> = await axios.put(
      url,
      body,
      defaultConfig
    );
    return response.data;
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<T> {
    const defaultConfig = createDefaultConfig(config);
    const response: AxiosResponse<T> = await axios.delete(url, defaultConfig);
    return response.data;
  }

  async patch<T, K>(
    url: string,
    body: K,
    config?: AxiosRequestConfig | undefined
  ): Promise<T> {
    const defaultConfig = createDefaultConfig(config);
    const response: AxiosResponse<T> = await axios.patch(
      url,
      body,
      defaultConfig
    );
    return response.data;
  }
}

const fetchWrapper = new FetchWrapper();
export { fetchWrapper };
