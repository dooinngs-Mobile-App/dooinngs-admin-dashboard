import axios from "axios";
import Cookies from "js-cookie";

const RAW_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
const BASE_URL = /^https?:\/\//.test(RAW_BASE_URL)
  ? RAW_BASE_URL
  : `https://${RAW_BASE_URL}`;

export const API_URL = `${BASE_URL}/api/v1`;

export const ACCESS_TOKEN_COOKIE = "access_token";
export const REFRESH_TOKEN_COOKIE = "refresh_token";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = Cookies.get(ACCESS_TOKEN_COOKIE);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export function throwError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.detail ??
      error.response?.data?.message ??
      error.message;
    throw new Error(message);
  }
  throw error instanceof Error ? error : new Error("Something went wrong.");
}

export function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export type SendOtpPayload = {
  phone_number: string;
};

export type VerifyOtpPayload = {
  phone_number: string;
  otp_code: string;
};

export type AuthUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
  phone_number: string;
  profile_photo: string | null;
};

export type VerifyOtpResponse = {
  success: boolean;
  message: string;
  token_details: {
    roles: string[];
    refresh: string;
    access: string;
    access_token_expiry: string;
  };
  user: AuthUser;
};

export const sendOtp = {
  key: ["auth", "send-otp"] as const,
  fn: async (payload: SendOtpPayload) => {
    try {
      const url = "/authentication/send-otp/";
      const { data } = await apiClient.post(url, payload);
      return data;
    } catch (error) {
      throwError(error);
    }
  },
};

export const verifyOtp = {
  key: ["auth", "verify-otp"] as const,
  fn: async (payload: VerifyOtpPayload) => {
    try {
      const url = "/authentication/verify-otp/";
      const { data } = await apiClient.post<VerifyOtpResponse>(url, payload);
      return data;
    } catch (error) {
      throwError(error);
    }
  },
};

export type AdminLoginPayload = {
  email: string;
  password: string;
};

export const adminLogin = {
  key: ["auth", "admin-login"] as const,
  fn: async (payload: AdminLoginPayload) => {
    try {
      const url = "/authentication/admin-login/";
      const { data } = await apiClient.post<VerifyOtpResponse>(url, payload);
      if (!data.token_details?.access) {
        throw new Error("adminLogin failed");
      }

      return data;
    } catch (error) {
      throwError(error);
    }
  },
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type ArtisanResult = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_photo: string | null;
  is_active: boolean;
  is_disabled: boolean;
  created_at: string;
  business_count: number;
  professions: string;
};

export const listArtisans = {
  key: ["artisans", "list"] as const,
  fn: async () => {
    try {
      const url = "/dashboard/artisans/";
      const { data } =
        await apiClient.get<PaginatedResponse<ArtisanResult>>(url);
      return data;
    } catch (error) {
      throwError(error);
    }
  },
};
