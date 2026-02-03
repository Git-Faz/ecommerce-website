import { getAllOrders } from "@/api/orderApi";
import type { JSX } from "react";
import { useState, useEffect } from "react";
import OrderCard from "@/components/user/OrderCard";
import Loading from "@/components/ui/Loading";

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

const Order = (): JSX.Element => {

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    //const navigate = useNavigate();

    useEffect(() => {
        getAllOrders()
            .then(res => {
                setOrders(res.data.data)
                console.log(res.data)
            })
            .catch(e => console.error(e))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <Loading message="Loading your Orders... Please wait"/>
        )
    }

    if (orders.length === 0) {
        return (
            <h2>No orders yet!</h2>
        )
    }

    return (
        <div className="m-5 p-3">
            <h1 id="title">Your Orders</h1>
            <div className="flex flex-col">
            {orders.map((order,index) => (
                <OrderCard
                    key={index}
                    id={order.id}
                    items={order.items}
                    totalAmount={order.totalAmount}
                    status={order.status}
                />
            ))}
            </div>

        </div>
    )
}

export default Order;