import { getAllOrders } from "@/api/orderApi";
import type { JSX } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import OrderCard from "@/components/user/OrderCard";
import Loading from "@/components/ui/Loading";
import Body from "@/components/layout/Body";

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
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/auth", { replace: true });
            return;
        }

        getAllOrders()
            .then(res => {
                setOrders(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch orders", err);
                setLoading(false);
            });
    }, [isLoggedIn, navigate]);

    if (loading) return <Loading message="Loading Orders..." />;

    if (orders.length === 0) return <h3 className="text-xl font-bold">No orders</h3>;

    return (
        <Body>
            <div className="m-5 p-3">
                <h1 id="title">Your Orders</h1>
                <div className="flex flex-col">
                    {orders.map((order: Order, index: number) => (
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
        </Body>
    );
}

export default Order;