export interface OrderItem {
    id: number
    userId: number
    productName: string
    productImageUrl: string
    productPrice: number
    quantity: number
}

export interface Order {
    id: number
    items: OrderItem[]
    totalAmount: number
    status: string
}