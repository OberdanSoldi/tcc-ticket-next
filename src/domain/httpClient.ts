export interface HttpClient {
  get<T>(url: string): Promise<T>;

  post<T, K>(url: string, body: K): Promise<T>;

  put<T, K>(url: string, body: K): Promise<T>;

  delete<T>(url: string): Promise<T>;

  patch<T, K>(url: string, body: K): Promise<T>;
}
