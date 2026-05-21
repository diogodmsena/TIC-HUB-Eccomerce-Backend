import { Router } from "express";
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller.js";
import { validateData } from "../middlewares/validateData.js";
import {
    categoryQueryPaginationSchema,
    categoryParamsSchema,
    createCategorySchema
} from "../schemas/category.schema.js";

const categoryRouter = Router();

// GET /category - Listagem com Paginação Segura
categoryRouter.get(
    "/",
    validateData(categoryQueryPaginationSchema, "query"),
    getCategories
);

// GET /category/:id - Consulta Específica de Categoria com Validação de ID UUID
categoryRouter.get(
    "/:id",
    validateData(categoryParamsSchema, "params"),
    getCategoryById
);

// POST /category - Criação Estrita de Categoria
categoryRouter.post(
    "/",
    validateData(createCategorySchema, "body"),
    createCategory
);

// PUT /category/:id - Atualização de Categoria com Validação Completa (ID e Body)
categoryRouter.put(
    "/:id",
    validateData(categoryParamsSchema, "params"),
    validateData(createCategorySchema, "body"),
    updateCategory
);

// DELETE /category/:id - Deleção Segura
categoryRouter.delete(
    "/:id",
    validateData(categoryParamsSchema, "params"),
    deleteCategory
);

export default categoryRouter;
