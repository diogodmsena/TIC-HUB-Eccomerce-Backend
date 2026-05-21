import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import { products, categories } from "../data/mock.data.js";
import { AppError } from "../middlewares/error.middleware.js";

// GET /products - Listagem com Filtros
export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { category } = req.query as any;

        if (category) {
            const filteredProducts = products.filter((p) => p.category.id === category);
            res.json(filteredProducts);
            return;
        }

        res.json(products);
    } catch (error) {
        next(error);
    }
};

// GET /products/:id - Consulta Específica de Produto
export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const product = products.find((p) => p.id === id);

        if (!product) {
            throw new AppError(404, "Product not found");
        }

        res.json(product);
    } catch (error) {
        next(error);
    }
};

// POST /products - Criação de Produto (com Associação de Categoria por UUID)
export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, price, categoryId, imageUrl } = req.body;

        // Verify if category exists
        const category = categories.find((c) => c.id === categoryId);
        if (!category) {
            throw new AppError(400, `Category with ID ${categoryId} does not exist`);
        }

        const newProduct = {
            id: randomUUID(),
            name,
            price,
            category,
            imageUrl: imageUrl || `https://example.com/${name.toLowerCase()}.jpg`
        };

        products.push(newProduct);

        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

// DELETE /products/:id - Deleção Segura
export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const productIndex = products.findIndex((p) => p.id === id);

        if (productIndex === -1) {
            throw new AppError(404, "Product not found");
        }

        products.splice(productIndex, 1);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
