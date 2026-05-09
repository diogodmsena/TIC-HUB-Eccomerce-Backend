import type { Product, Category } from "../types/index.js";

export const categories: Category[] = [
    { id: 1, title: "Eletrônicos" },
    { id: 2, title: "Roupas" },
    { id: 3, title: "Livros" }
];

export const products: Product[] = [
    {
        id: 1,
        name: "Smartphone",
        price: 1500,
        category: categories[0]!,
        imageUrl: "https://example.com/smartphone.jpg"
    },
    {
        id: 2,
        name: "Notebook",
        price: 3500,
        category: categories[0]!,
        imageUrl: "https://example.com/notebook.jpg"
    },
    {
        id: 3,
        name: "Camisa",
        price: 50,
        category: categories[1]!,
        imageUrl: "https://example.com/camisa.jpg"
    }
];
