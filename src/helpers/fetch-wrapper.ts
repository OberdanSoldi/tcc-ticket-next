import type { HttpClient } from "@/domain/HttpClient";
import { createDefaultConfig } from "@/utils/create-default-config";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

class FetchWrapper implements HttpClient {
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
