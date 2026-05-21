import type { Product, Category } from "../types/index.js";

export const categories: Category[] = [
    { id: "550e8400-e29b-41d4-a716-446655440000", title: "Eletrônicos" },
    { id: "7cd8b162-4c46-455b-80df-269ee4dc53d2", title: "Roupas" },
    { id: "3a4b9c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d", title: "Livros" }
];

export const products: Product[] = [
    {
        id: "e685f0ef-bb4b-4b1f-bc6a-208b0bc66c5d",
        name: "Smartphone",
        price: 1500,
        category: categories[0]!,
        imageUrl: "https://example.com/smartphone.jpg"
    },
    {
        id: "2c823055-6b58-452f-a9cb-b2f5b8a0717e",
        name: "Notebook",
        price: 3500,
        category: categories[0]!,
        imageUrl: "https://example.com/notebook.jpg"
    },
    {
        id: "07b539cf-727e-49b0-91a6-b51f04495e5b",
        name: "Camisa",
        price: 50,
        category: categories[1]!,
        imageUrl: "https://example.com/camisa.jpg"
    }
];

