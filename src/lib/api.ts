const BASE_URL = "https://devmetrics-mock-api-production-92ca.up.railway.app";

const handleResponse = async (r: Response) => {
  if (!r.ok) {
    const errorData = await r.json().catch(() => ({}));
    throw new Error(errorData.error || `API Error ${r.status}`);
  }
  const json = await r.json();
  return json.data;
};

// 🏛️ Categories & Products
export const getCategories = () => fetch(`${BASE_URL}/api/categories`).then(handleResponse);
export const getProducts = (query?: string) => fetch(`${BASE_URL}/api/products${query || ""}`).then(handleResponse);
export const getProductById = (id: string) => fetch(`${BASE_URL}/api/products/${id}`).then(handleResponse);
export const getFeaturedProducts = () => fetch(`${BASE_URL}/api/products/featured`).then(handleResponse);
export const searchProducts = (q: string) => fetch(`${BASE_URL}/api/search?q=${encodeURIComponent(q)}`).then(handleResponse);

// 🛒 Remote Cart Management
export const getCart = (sessionId: string) => 
  fetch(`${BASE_URL}/api/cart?session_id=${sessionId}`).then(handleResponse);

export const addToCartApi = (data: { productId: string, variantId: string, quantity: number, sessionId: string }) => 
  fetch(`${BASE_URL}/api/cart/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);

export const updateCartItemApi = (itemId: string, sessionId: string, quantity: number) => 
  fetch(`${BASE_URL}/api/cart/items/${itemId}?session_id=${sessionId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  }).then(handleResponse);

export const removeCartItemApi = (itemId: string, sessionId: string) => 
  fetch(`${BASE_URL}/api/cart/items/${itemId}?session_id=${sessionId}`, {
    method: "DELETE",
  }).then(handleResponse);

// 💳 Real Checkout Fulfillment
export const createCheckoutSession = (data: any) => 
  fetch(`${BASE_URL}/api/checkout/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);