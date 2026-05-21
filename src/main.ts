import express from "express";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
import categoryRouter from "./routes/category.routes.js";

const app = express();
const port = 3010;

app.use(express.json());
app.use(loggerMiddleware);

app.get("/", (req, res) => {
    res.json({ message: "E-commerce Backend API is running" });
});

app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/category", categoryRouter);

app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});