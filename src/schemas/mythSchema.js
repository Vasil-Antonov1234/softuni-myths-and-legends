import * as z from "zod";

export const createMythSchema = z.object({
    name: z.string()
        .min(2, { error: "Name should be at least 2 characters long" }),
    origin: z.string()
        .min(3, { error: "Origin should be at least 3 characters long" }),
    role: z.string()
        .min(2, { error: "Role should be at least 2 characters long" }),
    symbol: z.string()
        .min(3, { error: "Symbol should be at least 3 characters long" })
        .max(40, { error: "Symbol should be at most 40 characters long" }),
    era: z.string()
        .min(5, { error: "Era should be at least 5 characters long" })
        .max(15, { error: "Era should be at most 15 characters long" }),
    description: z.string()
        .min(10, { error: "Description should be a minimum of 10 characters long" }),
    image: z.httpUrl({ error: "Invalid URL address" })
})