import { routeAction$, zod$, z } from "@builder.io/qwik-city";
import { createCheckoutSession } from "~/lib/api";

// PRIVATE SCHEMAS (Server-Only)
const shippingSchema = z.object({
  step: z.literal("shipping"),
  email: z.string().email("Please enter a valid email address"),
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  address: z.string().min(5, "Please provide a complete address"),
  city: z.string().min(2, "City name is too short"),
  zip: z.string().min(5, "Valid ZIP code required"),
});

const paymentSchema = z.object({
  step: z.literal("payment"),
  cardName: z.string().min(3, "Cardholder name is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
});

const reviewSchema = z.object({
  step: z.literal("review"),
});

const checkoutSchema = z.discriminatedUnion("step", [
  shippingSchema,
  paymentSchema,
  reviewSchema,
]);

// eslint-disable-next-line qwik/loader-location
export const useCheckoutAction = routeAction$(async (data, { redirect, cookie, fail }) => {
  const sessionId = cookie.get('sf_session')?.value;
  if (!sessionId) return fail(401, { message: "Session expired" });

  if (data.step === "shipping") {
    throw redirect(303, "/checkout?step=payment");
  }
  if (data.step === "payment") {
    throw redirect(303, "/checkout?step=review");
  }

  if (data.step === "review") {
    try {
      const result = await createCheckoutSession({
        session_id: sessionId,
        email: "customer@example.com", 
        shipping: {
          address: "123 Main St", 
          city: "San Francisco",
          postal_code: "94105",
          country: "US"
        },
        payment: {
          method: "card",
          card_token: "tok_visa",
          card_last_four: "4242"
        }
      });
      
      cookie.delete('sf_cart', { path: '/' });
      
      return { 
        success: true, 
        orderId: result.order_id,
        total: result.total
      };
    } catch (e: any) {
      return fail(400, { message: e.message });
    }
  }
}, zod$(checkoutSchema));
