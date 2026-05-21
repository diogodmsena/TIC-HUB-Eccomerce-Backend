import { z } from "zod";

export const productParamsSchema = z.object({
    id: z.string().uuid({ message: "ID must be a valid UUID" })
});

export const createProductSchema = z.object({
    name: z.string({
        required_error: "Product name is required"
    }).min(3, { message: "Product name must be at least 3 characters long" }),
    price: z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number"
    }).positive({ message: "Price must be a positive number" }),
    categoryId: z.string({
        required_error: "Category ID is required"
    }).uuid({ message: "Category ID must be a valid UUID" }),
    imageUrl: z.string().url({ message: "Image URL must be a valid URL" }).optional()
});

export const productQuerySchema = z.object({
    category: z.string().uuid({ message: "Category ID must be a valid UUID" }).optional()
});
