import { getCart } from "@/api/cartApi";
import { createOrder } from "@/api/orderApi";
import { useEffect, useMemo, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { type AxiosResponse, AxiosError } from "axios";
import CartItemCard from "@/components/cart/CartItemCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OrderItem {
    productId: number;
    productName: string;
    productPrice: number;
    productImageUrl: string;
    quantity: number;
    totalPrice: number;
}

const Checkout = (): JSX.Element => {

    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCart()
            .then((res: AxiosResponse<OrderItem[]>) => {
                setOrderItems(res.data);
                console.log(res.data);
            })
            .catch((e: AxiosError) => {
                console.error("Failed to fetch cart", e);
            });
    }, []);


    const total = useMemo(
        () => orderItems.reduce((sum, item) => sum + item.totalPrice, 0),
        [orderItems]
    );

    const handleSubmission = async () => {
        try {
            const res = await createOrder();

            alert(res.data.message);
            navigate("/orders");
        } catch (err) {
            console.error("Order creation failed", err);
            alert("Failed to place order");
        }
    };
    console.log(total);

    const deliveryFee = orderItems.length > 0 ? 49 : 0;

    return (
        <div className="m-5 p-5">
            <h1 id="title" className="mb-4">Checkout</h1>

            <div className="grid gap-6 md:grid-cols-2 align-top gap-x-24">
                <div className="flex flex-col space-y-4 align-top shadow-md rounded-lg shadow-blue-300">
                    {orderItems.map((item: OrderItem, i) => (
                        <CartItemCard
                            key={i}
                            name={item.productName}
                            imageUrl={item.productImageUrl}
                            price={item.productPrice}
                            quantity={item.quantity}
                            total={item.totalPrice}
                            classname="w-full mt-0 mb-1 shadow-2xs shadow-accent"

                        />
                    ))}
                </div>

                <Card className="h-fit shadow-mdshadow-blue-300">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="space-y-1 text-sm">
                            {orderItems.map((item: OrderItem, i) => (
                                <div key={i} className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        {item.productName} <span className="text-xs">(x{item.quantity})</span>
                                    </span>
                                    <span>₹{item.totalPrice.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Delivery fee</span>
                            <span>₹{deliveryFee.toFixed(2)}</span>
                        </div>

                        <div className="h-px bg-border" />

                        <div className="flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>₹{(total + deliveryFee).toFixed(2)}</span>
                        </div>

                        <div className="pt-4 space-y-2">
                            <h2 className="text-lg font-semibold">Choose a payment method</h2>
                            <div className="flex flex-col gap-2">
                                <Button
                                    onClick={handleSubmission}
                                    className="bg-green-300 text-black hover:bg-green-400"
                                >
                                    Pay from fazWallet
                                </Button>
                                <Button
                                    onClick={handleSubmission}
                                    className="bg-blue-300 text-black hover:bg-blue-400"
                                >
                                    NetBanking
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Checkout;