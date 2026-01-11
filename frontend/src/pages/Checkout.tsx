import { getCart } from "@/api/cartApi";
import { createOrder } from "@/api/orderApi";
import { useEffect, useMemo, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";

interface OrderItem {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    totalPrice: number;
}

const Checkout = (): JSX.Element => {

    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [message, setMessage] = useState<string>("")
    const navigate = useNavigate();

    useEffect(() => {
        getCart()
            .then(res => {
                setOrderItems(res.data)
                console.log(res.data);

            })
            .catch(e => `error ${e}`)
    }, [])


    const total = useMemo(
        () => orderItems.reduce((sum, item) => sum + item.totalPrice, 0),
        [orderItems]
    );

    const handleSubmission = async () => {
        try {
            const res = await createOrder();

            alert(res.data.message); // or a toast
            navigate("/");
        } catch (err) {
            console.error("Order creation failed", err);
            alert("Failed to place order");
        }
    };


    console.log(total);

    return (
        <>
            <h1>Checkout Page</h1>

            {
                orderItems.map((item: any) => (
                    <div key={item.id} className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold">{item.productName}</h3>
                        <p className="text-lg font-bold mt-2">${item.productPrice}</p>
                        <p className="text-md mt-2">Quantity: {item.quantity}</p>
                        <p>Subtotal: ${item.totalPrice}</p>
                    </div>

                ))
            }
            <h4 className=" p-2 text-xl font-semibold text-yellow-600">Total:${total} </h4>

            <h2 className="m-2 text-2xl font-semibold ">Choose a payment method:</h2>
            <button onClick={handleSubmission} className="p-2 m-2 bg-blue-400 font-semibold text-xl ">Pay from fazWallet</button>
            <button onClick={handleSubmission} className="p-2 m-2 bg-blue-400 font-semibold text-xl ">NetBanking</button>
        </>

    )
}

export default Checkout;