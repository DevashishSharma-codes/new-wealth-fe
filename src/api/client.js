import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "/api/v1";

export const API_KEY =
  import.meta.env.VITE_API_KEY ||
  "e2d0098d7ad7aaa3efd03548db794b2b9a7cc2d66b25d554f1a53e11c3ac27b1";

export const ADMIN_API_KEY =
  import.meta.env.VITE_ADMIN_API_KEY ||
  "1816ccd61807db177b050812d5ed59cb163956e8d5ec1244ca2b3c9da6fda545";

const maskApiKey = (key) => {
  if (!key) return "<missing>";
  if (key.length <= 12) return `${key.slice(0, 3)}...${key.slice(-3)}`;
  return `${key.slice(0, 8)}...${key.slice(-8)}`;
};

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  if (API_KEY && !config.headers["X-API-Key"]) {
    config.headers["X-API-Key"] = API_KEY;
  }

  console.log("[API DEBUG] Outgoing request", {
    method: config.method?.toUpperCase(),
    baseURL: config.baseURL,
    url: config.url,
    fullUrl: `${config.baseURL || ""}${config.url || ""}`,
    hasApiKey: Boolean(API_KEY),
    apiKeyLength: API_KEY?.length || 0,
    apiKeyPreview: maskApiKey(API_KEY),
    xApiKeyHeaderPreview: maskApiKey(config.headers["X-API-Key"]),
  });

  return config;
});

client.interceptors.response.use(
  (response) => {
    console.log("[API DEBUG] Response received", {
      status: response.status,
      url: response.config?.url,
      data: response.data,
    });
    return response.data;
  },
  (error) => {
    const status = error.response?.status;
    const backendMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.detail;
    const message =
      backendMessage ||
      (status ? `Request failed with status ${status}` : error.message || "Something went wrong");

    console.error("[API DEBUG] Request failed", {
      message,
      status,
      method: error.config?.method?.toUpperCase(),
      baseURL: error.config?.baseURL,
      url: error.config?.url,
      fullUrl: `${error.config?.baseURL || ""}${error.config?.url || ""}`,
      hasApiKey: Boolean(API_KEY),
      apiKeyLength: API_KEY?.length || 0,
      apiKeyPreview: maskApiKey(API_KEY),
      xApiKeyHeaderPreview: maskApiKey(error.config?.headers?.["X-API-Key"]),
      responseData: error.response?.data,
    });

    return Promise.reject(new Error(message));
  }
);

export default client;