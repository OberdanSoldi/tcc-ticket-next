import { authHeader } from "@/helpers/auth-header";
import type { AxiosRequestConfig } from "axios";

export function createDefaultConfig(
  config: AxiosRequestConfig | undefined
): AxiosRequestConfig {
  const authHeaders = authHeader.createHeaders();
  return {
    ...config,
    headers: {
      ...authHeaders,
      ...(config !== undefined ? config.headers : {}),
    },
  };
}
