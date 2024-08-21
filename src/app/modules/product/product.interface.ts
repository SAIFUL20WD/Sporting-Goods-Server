export type TVariant = {
    type: string;
    value: string;
};

export type TInventory = {
    quantity: number;
    inStock: boolean;
};

export type TProduct = {
    name: string;
    description: string;
    image: string[];
    price: number;
    brand: string;
    category: string;
    rating: number;
    variants: TVariant[];
    inventory: TInventory;
};
