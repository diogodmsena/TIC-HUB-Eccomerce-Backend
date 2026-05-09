import { Router, type Request, type Response } from "express";
import { products } from "../data/mock.data.js";
import { AppError } from "../middlewares/error.middleware.js";

const productRouter = Router();

// GET /products - Listagem Geral com filtro por categoria
productRouter.get("/", (req: Request, res: Response) => {
    const { category } = req.query;

    if (category) {
        const filteredProducts = products.filter(p => 
            p.category.title.toLowerCase() === (category as string).toLowerCase()
        );
        res.json(filteredProducts);
        return;
    }

    res.json(products);
});

// GET /products/:id - Consulta Específica
productRouter.get("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (id < 0) {
        throw new AppError(400, "ID must be a non-negative number");
    }

    const product = products.find(p => p.id === id);

    if (!product) {
        throw new AppError(404, "Product not found");
    }

    res.json(product);
});

export default productRouter;
