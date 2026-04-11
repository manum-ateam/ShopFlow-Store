const BASE_URL = "https://devmetrics-mock-api-production-92ca.up.railway.app";

const handleResponse = async (r: Response) => {
  if (!r.ok) {
    const errorData = await r.json().catch(() => ({}));
    throw new Error(errorData.error || `API Error ${r.status}`);
  }
  
  const json = await r.json();
  // Unwrap the "data" property as per API Reference
  return json.data;
};

export const getProducts = async (query?: string) => {
  return fetch(`${BASE_URL}/api/products${query || ""}`).then(handleResponse);
};

export const getFeaturedProducts = async () => {
  return fetch(`${BASE_URL}/api/products/featured`).then(handleResponse);
};

export const getProductById = async (id: string) => {
  return fetch(`${BASE_URL}/api/products/${id}`).then(handleResponse);
};

export const getCategories = async () => {
  return fetch(`${BASE_URL}/api/categories`).then(handleResponse);
};

export const addToCart = async (data: any) => {
  return fetch(`${BASE_URL}/api/cart/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);
};