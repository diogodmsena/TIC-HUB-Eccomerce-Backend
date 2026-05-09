import { Router, type Request, type Response } from "express";
import { validateBodyNotEmpty } from "../middlewares/validation.middleware.js";

const orderRouter = Router();

// POST /orders - Criação de Pedido
orderRouter.post("/", validateBodyNotEmpty, (req: Request, res: Response) => {
    const orderData = req.body;
    
    // Simulação de criação (apenas retorna o que recebeu + um ID fictício)
    const newOrder = {
        id: Math.floor(Math.random() * 1000),
        ...orderData,
        status: "pendente"
    };

    res.status(201).json(newOrder);
});

// PATCH /orders/:id - Atualização de Status
orderRouter.patch("/:id", validateBodyNotEmpty, (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    res.json({
        message: `Order ${id} status updated to ${status}`,
        orderId: id,
        newStatus: status
    });
});

// DELETE /orders/:id - Cancelamento
orderRouter.delete("/:id", (req: Request, res: Response) => {
    // Apenas confirmação de exclusão
    res.status(204).send();
});

export default orderRouter;
