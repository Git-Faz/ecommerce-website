export interface CartItem {
    serialNo?:number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    total: number;
    onDelete?: () => void;
    classname?: string;
    disabled?: boolean;
}

export interface CartItemResponse {
  id: number;
  productName: string;
  productPrice: number;
  quantity: number;
  productImageUrl: string;
  totalPrice: number;
}

export interface AddToCartInput {
  productId: number;
  quantity: number;
}