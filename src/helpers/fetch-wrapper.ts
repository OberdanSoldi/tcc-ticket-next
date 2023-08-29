"use client";

import { HttpClient } from "@/domain/httpClient";
import axios, { AxiosResponse } from "axios";

class FetchWrapper implements HttpClient {
  async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
  }
  async post<T, K>(url: string, body: K): Promise<T> {
    const response: AxiosResponse<T> = await axios.post(url, body);
    return response.data;
  }
  async put<T, K>(url: string, body: K): Promise<T> {
    const response: AxiosResponse<T> = await axios.put(url, body);
    return response.data;
  }
  async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await axios.delete(url);
    return response.data;
  }
  async patch<T, K>(url: string, body: K): Promise<T> {
    const response: AxiosResponse<T> = await axios.patch(url, body);
    return response.data;
  }
}

const fetchWrapper = new FetchWrapper();
export { fetchWrapper };
