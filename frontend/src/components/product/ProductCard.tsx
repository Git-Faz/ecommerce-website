import {
    Card,
    CardAction,
    CardDescription,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { JSX } from "react";

interface ProductCard {
    img: {
        link: string,
        alt: string
    },
    name: string,
    price: number;
    onClick: () => void
}

const ProductCard = ({ img, name, price, onClick }: ProductCard): JSX.Element => {
    return (
        <Card onClick={onClick}
        className="m-2 px-0 w-56 pt-0 pb-2 gap-3 min-h-56 flex flex-col bg-neutral-800 border-0 rounded-lg cursor-pointer text-white"
        >
            <div className="">
                <img src={img.link} alt={img.alt} className="w-full max-w-56 h-fit p-0 m-0 gap-0 border rounded-t-lg border-neutral-800"></img>
            </div>
            <CardHeader className="gap-0 px-3 text-center">
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent className="gap-0 text-center" >
                <p>₹{price}</p>
            </CardContent>
        </Card>
    )
}

export default ProductCard;