/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { paymentItemSchema } from "./paymentItemSchema";
import { z } from "zod";

export const paymentHistoryResponseSchema = z.object({
  items: z.array(z.lazy(() => paymentItemSchema)).nullable(),
});
