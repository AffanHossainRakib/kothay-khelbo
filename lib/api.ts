import type { ApiError, ApiSuccess } from "@/types/api";

// Calls the backend and returns only `data`; a { success: false } reply becomes
// a thrown Error with the backend's message. Server-only: API_URL is not public.
export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const baseUrl = process.env.API_URL;
  if (!baseUrl) {
    throw new Error("API_URL is not set");
  }

  const res = await fetch(`${baseUrl}${path}`, init);
  const body = (await res.json()) as ApiSuccess<T> | ApiError;

  if (!body.success) {
    throw new Error(body.message);
  }
  return body.data;
}
