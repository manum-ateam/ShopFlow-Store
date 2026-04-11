import { routeAction$, zod$, z } from "@builder.io/qwik-city";
import { addToCartApi, getProductById } from "~/lib/api";

export const useAddToCartAction = routeAction$(async (data, { fail, cookie }) => {
  const sessionId = cookie.get('sf_session')?.value;
  if (!sessionId) return fail(401, { message: "Session expired. Please refresh." });

  try {
    await addToCartApi({
      productId: data.productId,
      variantId: data.variantId,
      quantity: data.quantity,
      sessionId: sessionId
    });

    const product = await getProductById(data.productId);
    const variant = product.variants?.find((v: any) => v.id === data.variantId);

    return { 
      success: true, 
      variantName: variant?.name || "Selected option" 
    };
  } catch (e: any) {
    return fail(400, { message: e.message });
  }
}, zod$({
  productId: z.string(),
  variantId: z.string(),
  quantity: z.coerce.number().min(1).max(99),
}));
