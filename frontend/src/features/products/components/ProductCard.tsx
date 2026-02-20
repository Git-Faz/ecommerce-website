import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card"
import type { JSX } from "react";
import type { ProductCard } from "../types";
import { ShoppingCartIcon as Cart } from "lucide-react";


const ProductCard = ({ img, name, price, onClick, onBtnClick }: ProductCard): JSX.Element => {
    return (
        <Card id="productCard" className="p-0 dark:shadow-sm shadow-blue-300 dark:shadow-blue-400 flex flex-col max-w-60 w-55 min-w-46 min-h-fit h-100">
            <div onClick={onClick}>
                <img src={img.link} alt={img.alt} className="w-full max-w-60 min-h-54 h-full max-h-54 p-0 m-0 gap-0 border-b border-purple-200 rounded-t-lg"></img>
            </div>
            <CardHeader className="gap-0 px-3 text-center" onClick={onClick}>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent className="gap-0 text-center" >
                <p>₹{price}</p>
            </CardContent>
            <CardAction className="self-center">
                <button
                    onClick={onBtnClick}
                    className="flex justify-between p-2 min-w-fit w-30 my-1 mx-auto text-center bg-purple-300 text-neutral-800 hover:text-white text-sm rounded-md transition-all duration-200 ease-in hover:bg-purple-500 focus:bg-purple-500">
                    Add to cart <Cart size={"20px"}/>
                </button>
            </CardAction>
        </Card>
    )
}

export default ProductCard;