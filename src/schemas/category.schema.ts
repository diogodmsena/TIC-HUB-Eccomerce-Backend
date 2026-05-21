import { z } from "zod";

export const categoryQueryPaginationSchema = z.object({
    page: z.coerce.number({
        invalid_type_error: "Page must be a number"
    }).int().positive({ message: "Page must be greater than 0" }).default(1),
    size: z.coerce.number({
        invalid_type_error: "Size must be a number"
    }).int().positive({ message: "Size must be greater than 0" }).default(10)
});

export const categoryParamsSchema = z.object({
    id: z.string().uuid({ message: "ID must be a valid UUID" })
});

export const createCategorySchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }).min(3, { message: "Name must be at least 3 characters long" })
});
