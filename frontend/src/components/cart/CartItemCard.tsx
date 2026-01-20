import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import type { JSX } from "react"

const CartItemCard = (): JSX.Element => {
    return (

        <Item>
            <ItemMedia variant="image">
            </ItemMedia>
            <ItemContent>
                <ItemTitle>Title</ItemTitle>
                <ItemDescription>Description</ItemDescription>
            </ItemContent>
            <ItemActions>

            </ItemActions>
        </Item>
    )
}