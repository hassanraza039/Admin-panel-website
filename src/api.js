const BASE = import.meta.env.PROD
  ? "https://e-commerce-website-backend-6h21.vercel.app/api"
  : import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const TOKEN_KEY = "admin_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export async function api(path, { body, ...options } = {}) {
  const token = getToken();

  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  });

  // token kharab ya expire ho gaya to wapas login par bhej do
  if (res.status === 401 && path !== "/auth/login") {
    clearToken();
    window.dispatchEvent(new Event("auth-expired"));
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}