import { getAllOrders } from "@/features/orders/api";
import type { JSX } from "react";
import type { OrderProp } from "@/features/orders/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";
import OrderCard from "@/features/orders/components/OrderCard";
import Loading from "@/shared/components/ui/Loading";
import Body from "@/shared/components/layout/Body";

const Order = (): JSX.Element => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<OrderProp[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);


    if (orders.length === 0) return <h3 className="text-xl font-bold">No orders</h3>;

    return (
        <Body>
            <div className="m-5 p-3">
                <h1 id="title">Your Orders</h1>
                <div className="flex flex-col">
                    {orders.map((order: OrderProp, index: number) => (
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