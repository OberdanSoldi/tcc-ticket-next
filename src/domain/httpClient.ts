import { AxiosRequestConfig } from "axios";

export interface HttpClient {
  get<T>(url: string, config?: AxiosRequestConfig | undefined): Promise<T>;

  post<T, K>(
    url: string,
    body: K,
    config?: AxiosRequestConfig | undefined
  ): Promise<T>;

  put<T, K>(
    url: string,
    body: K,
    config?: AxiosRequestConfig | undefined
  ): Promise<T>;

  delete<T>(url: string, config?: AxiosRequestConfig | undefined): Promise<T>;

  patch<T, K>(
    url: string,
    body: K,
    config?: AxiosRequestConfig | undefined
  ): Promise<T>;
}
