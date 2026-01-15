import { getAllOrders } from "@/api/orderApi";
import type { JSX } from "react";
import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";

interface OrderItem {
    id: number
    userId: number
    productName: string
    productImageUrl: string
    productPrice: number
    quantity: number
    totalPrice: number
}

interface Order {
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
            <h2>Loading</h2>
        )
    }

    if (orders.length === 0) {
        return (
            <h2>No orders yet!</h2>
        )
    }

    return (
        <>
            <h1 id="title">Your Orders</h1>
            {orders.map((order,index) => (
                <div key={order.id} className=" m-2 p-2 border-b-2 border-gray-600">
                    <h2> {index+1} <br /> Order No.{order.id}</h2>
                    <h3>Items:</h3>
                    <ul>
                        {order.items.map(item => (
                            <li key={item.id}>
                                <strong>{item.productName}</strong> × {item.quantity} <br />
                                ₹{item.totalPrice}
                            </li>
                        ))}
                    </ul>

                    <h6>Total: ₹{order.totalAmount}</h6>
                    <p>Status: {order.status}</p>
                </div>
            ))}

        </>
    )
}

export default Order;