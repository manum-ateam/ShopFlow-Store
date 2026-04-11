import { routeAction$, zod$, z } from "@builder.io/qwik-city";
import { updateCartItemApi, removeCartItemApi } from "~/lib/api";

export const useCartAction = routeAction$(async (data, { cookie, fail }) => {
  const sessionId = cookie.get('sf_session')?.value;
  if (!sessionId) return fail(401, { message: "Session expired" });

  try {
    if (data.type === "remove") {
      await removeCartItemApi(data.id, sessionId);
    } else if (data.type === "update") {
      await updateCartItemApi(data.id, sessionId, data.quantity || 1);
    }
    return { success: true };
  } catch (e: any) {
    return fail(400, { message: e.message });
  }
}, zod$({
  type: z.enum(["update", "remove"]),
  id: z.string(),
  quantity: z.coerce.number().optional(),
}));
