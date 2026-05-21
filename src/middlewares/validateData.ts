import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

export const validateData = (schema: ZodSchema, source: "body" | "query" | "params" = "body") => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req[source]);
        
        if (!result.success) {
            res.status(400).json({
                message: "Validation failed",
                errors: result.error.errors.map((err) => ({
                    field: err.path.join("."),
                    message: err.message
                }))
            });
            return;
        }

        // Assign parsed & transformed data back to the request object
        if (source === "body") {
            req.body = result.data;
        } else if (source === "query") {
            // Delete original raw keys so they are replaced by the parsed/typed values
            for (const key in req.query) {
                delete req.query[key];
            }
            Object.assign(req.query, result.data);
        } else if (source === "params") {
            for (const key in req.params) {
                delete req.params[key];
            }
            Object.assign(req.params, result.data);
        }

        next();
    };
};
