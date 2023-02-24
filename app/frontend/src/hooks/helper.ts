import { AxiosHeaders } from "axios";

type GetHeaderArgs = {
  accessToken?: string;
  contentType?: boolean;
};

export const getHeaders = (
  { accessToken = "", contentType = true }: GetHeaderArgs = { contentType: true}
) => {
  const headers: Partial<AxiosHeaders> = {};

  if (contentType) {
    headers["Content-Type"] = "application/json";
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return headers;
}

export const storage = {
  get: (name: string) => localStorage.getItem(name) ?? undefined,
  set: (name: string, newToken: string) => localStorage.setItem(name, newToken),
  remove: (name: string) => localStorage.setItem(name, ""),
};