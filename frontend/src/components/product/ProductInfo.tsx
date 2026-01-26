import { useState, type JSX } from "react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button";

export interface ProductInfoProps {
    name: string;
    description: string;
    categories: string[];
    price: number;
    stock: number;
    quantity: number;
    imageUrl: string;
    onQuantityChange: (q: number) => void;
    onButtonClick: () => void;
}

interface QuantityCounterProps {
    max: number;
    value: number;
    onChange: (qty: number) => void;
}

const QuantityCounter = ({ max, value, onChange, }: QuantityCounterProps): JSX.Element => (
    <Select
        value={value.toString()}
        onValueChange={(v) => onChange(Number(v))}
    >
        <SelectTrigger className="w-20">
            <SelectValue />
        </SelectTrigger>

        <SelectContent>
            {Array.from({ length: max }, (_, i) => i + 1).map((qty) => (
                <SelectItem key={qty} value={qty.toString()}>
                    {qty}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

const ProductInfo = ({
    name,
    description,
    categories,
    price,
    imageUrl,
    stock,
    quantity,
    onQuantityChange,
    onButtonClick,
}: ProductInfoProps): JSX.Element => {

    return (
        <Card className="flex flex-row w-full align-middle justify-start content-center shadow-lg shadow-blue-200 ">
            <div className="w-xl flex align-top justify-start content-start">
                <img src={imageUrl} alt="product image" className="object-contain min-w-50 w-xl max-w-3xl " />
            </div>

            <CardContent className="w-1/2 align-middle justify-center content-center space-y-8 h-full  ">
                <CardTitle className="text-3xl">{name}</CardTitle>
                <div><span className="text-2xl">₹{price}</span></div>

                <div>
                    <h4 className="text-xl">Description:</h4>
                    <p className="text-md">{description}</p>
                </div>

                <div>
                    <h4 className="text-xl">Categories:</h4><span className="text-md">{categories.join(", ")}</span>
                </div>

                <div className="space-x-2 flex flex-row align-middle content-center justify-center w-fit">
                    <span className=" text-center align-middle p-1">Quantity:</span> 
                    <QuantityCounter
                        max={stock}
                        value={quantity}
                        onChange={onQuantityChange}

                    />
                    <Button onClick={onButtonClick} className="bg-blue-500 px-2 font-semibold min-w-fit hover:bg-blue-700">
                        Add to Cart
                    </Button>
                </div>

            </CardContent>
        </Card>
    );
};

export default ProductInfo;