export interface Category {
    id: number | string;
    title: string;
}

export interface Product {
    id: number | string;
    name: string;
    price: number;
    category: Category;
    imageUrl?: string;
}

export interface Order {
    id: number;
    customerName: string;
    productIds: (number | string)[];
    status: string;
}
