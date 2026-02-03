import { getAllOrders } from "@/api/orderApi";
import type { JSX } from "react";
import {Suspense, use} from "react";
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

const ordersPromise = getAllOrders();

const OrderList = (): JSX.Element => {

    const {data: response} = use(ordersPromise);
    const orders = response.data;
    console.log(orders);

    if (orders.length === 0) return <h3 className="text-xl font-bold">No orders</h3>

    return (
        <div className="m-5 p-3">
            <h1 id="title">Your Orders</h1>
            <div className="flex flex-col">
            {orders.map((order:Order,index: number) => (
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

const Order = (): JSX.Element => {
    return (
        <Suspense fallback = {<Loading message= "Loading Orders..."/>}>
            <OrderList></OrderList>
        </Suspense>
    )
}

export default Order;