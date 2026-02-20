export interface CartItem {
    serialNo?:number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    total: number;
    onDelete?: () => void;
    classname?: string
}