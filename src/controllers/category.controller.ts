import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import { categories } from "../data/mock.data.js";
import { AppError } from "../middlewares/error.middleware.js";

// GET /category - Listagem com Paginação Segura
export const getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page = 1, size = 10 } = req.query as any;

        const startIndex = (page - 1) * size;
        const endIndex = page * size;

        const paginatedCategories = categories.slice(startIndex, endIndex);

        res.json({
            data: paginatedCategories,
            page,
            size,
            total: categories.length
        });
    } catch (error) {
        next(error);
    }
};

// GET /category/:id - Consulta Específica de Categoria
export const getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const category = categories.find((c) => c.id === id);

        if (!category) {
            throw new AppError(404, "Category not found");
        }

        res.json(category);
    } catch (error) {
        next(error);
    }
};

// POST /category - Criação de Categoria
export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name } = req.body;

        const newCategory = {
            id: randomUUID(),
            title: name
        };

        categories.push(newCategory);

        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
};

// PUT /category/:id - Atualização de Categoria
export const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const categoryIndex = categories.findIndex((c) => c.id === id);

        if (categoryIndex === -1) {
            throw new AppError(404, "Category not found");
        }

        categories[categoryIndex]!.title = name;

        res.json(categories[categoryIndex]);
    } catch (error) {
        next(error);
    }
};

// DELETE /category/:id - Deleção Segura
export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const categoryIndex = categories.findIndex((c) => c.id === id);

        if (categoryIndex === -1) {
            throw new AppError(404, "Category not found");
        }

        categories.splice(categoryIndex, 1);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
