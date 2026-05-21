import { Router } from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct
} from "../controllers/product.controller.js";
import { validateData } from "../middlewares/validateData.js";
import {
    productQuerySchema,
    productParamsSchema,
    createProductSchema
} from "../schemas/product.schema.js";

const productRouter = Router();

// GET /products - Listagem Geral com filtro por categoria (UUID)
productRouter.get(
    "/",
    validateData(productQuerySchema, "query"),
    getProducts
);

// GET /products/:id - Consulta Específica (UUID)
productRouter.get(
    "/:id",
    validateData(productParamsSchema, "params"),
    getProductById
);

// POST /products - Criação de Produto (Zod validated)
productRouter.post(
    "/",
    validateData(createProductSchema, "body"),
    createProduct
);

// DELETE /products/:id - Deleção Segura (UUID)
productRouter.delete(
    "/:id",
    validateData(productParamsSchema, "params"),
    deleteProduct
);

export default productRouter;
