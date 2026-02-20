export interface ProductCard {
    img: {
        link: string,
        alt: string
    },
    name: string,
    price: number;
    onClick: () => void,
    onBtnClick: () => void
}

export interface ProductInfoProps {
    name: string;
    description: string;
    categories: string[];
    price: number;
    stock: number;
    quantity: number;
    imageUrl: string;
    onQuantityChange: (q: number) => void;
    onButtonClick: () => void;
}

export interface QuantityCounterProps {
    max: number;
    value: number;
    onChange: (qty: number) => void;
}