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

export type AuthUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
  phone_number: string;
  profile_photo: string | null;
};

export type AdminLoginResponse = {
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

export type AdminLoginPayload = {
  email: string;
  password: string;
};

export const adminLogin = {
  key: ["auth", "admin-login"] as const,
  fn: async (payload: AdminLoginPayload) => {
    try {
      const url = "/authentication/admin-login/";
      const { data } = await apiClient.post<AdminLoginResponse>(url, payload);
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
  phone_number: string | null;
  profile_photo: string | null;
  is_active: boolean;
  is_disabled: boolean;
  created_at: string;
  business_count: number;
  professions: string[];
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

export type ArtisanBusiness = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
};

export type ArtisanDetail = ArtisanResult & {
  businesses: ArtisanBusiness[];
};

export const getArtisan = {
  key: (id: string) => ["artisans", "detail", id] as const,
  fn: async (id: string) => {
    try {
      const url = `/dashboard/artisans/${id}/`;
      const { data } = await apiClient.get<{
        success: boolean;
        message: string;
        data: ArtisanDetail;
      }>(url);
      return data.data;
    } catch (error) {
      throwError(error);
    }
  },
};

export type ArtisanStatusAction = "activate" | "deactivate";

export const setArtisanStatus = {
  key: ["artisans", "set-status"] as const,
  fn: async ({
    id,
    action,
  }: {
    id: string;
    action: ArtisanStatusAction;
  }) => {
    try {
      const url = `/dashboard/artisans/${id}/${action}/`;
      const { data } = await apiClient.post(url);
      return data;
    } catch (error) {
      throwError(error);
    }
  },
};

export const deleteArtisan = {
  key: ["artisans", "delete"] as const,
  fn: async (id: string) => {
    try {
      const url = `/dashboard/artisans/${id}/delete/`;
      const { data } = await apiClient.delete(url);
      return data;
    } catch (error) {
      throwError(error);
    }
  },
};

export type UpdateArtisanPayload = Partial<{
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  profile_photo: string;
}>;

export const updateArtisan = {
  key: ["artisans", "update"] as const,
  fn: async ({
    id,
    payload,
  }: {
    id: string;
    payload: UpdateArtisanPayload;
  }) => {
    try {
      const url = `/dashboard/artisans/${id}/`;
      const { data } = await apiClient.patch(url, payload);
      return data;
    } catch (error) {
      throwError(error);
    }
  },
};
