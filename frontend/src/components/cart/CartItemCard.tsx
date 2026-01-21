import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import type { JSX } from "react"
import { TrashIcon } from "lucide-react";

interface CartItem {
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    total: number;
    onDelete: () => void
}



const CartItemCard = ({name, price, quantity, imageUrl, total, onDelete }: CartItem): JSX.Element => {

    return (

        <Item className="m-5 min-w-fit w-3xl align-middle justify-center shadow-md shadow-neutral-500">
            <ItemMedia variant="image" className="flex size-24 self-center" id="itemMedia">
                <img src={imageUrl} alt="product image" className="m-0 self-center" />
            </ItemMedia>
            <ItemContent>
                <ItemTitle className="text-2xl">{name}</ItemTitle>
                <ItemDescription className="flex flex-col">
                        <span className="text-xl">₹{price}</span>
                        <span className="text-md">Quantity: {quantity}</span>
                        <span className="text-md">Total: ₹{total}</span>
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                <button onClick={onDelete}>
                    <TrashIcon/>
                </button>
            </ItemActions>
        </Item>
    )
}

export default CartItemCard;