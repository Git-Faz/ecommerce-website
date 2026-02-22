export interface OrderItem {
    id: number
    userId: number
    productName: string
    productImageUrl: string
    productPrice: number
    quantity: number
}

export interface OrderProp {
    id: number
    items: OrderItem[]
    totalAmount: number
    status: string
}