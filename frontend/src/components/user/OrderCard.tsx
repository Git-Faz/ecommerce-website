import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { JSX } from "react";
import { type Order } from "@/pages/Order";


const OrderCard = ({ id, items, totalAmount, status }: Order): JSX.Element => {
  return (
    <Item variant={"default"} 
    className="min-w-[50%] max-w-fit w-fit mx-10 mt-10 border-b-neutral-500 bg-neutral-100/30 shadow-md shadow-neutral-400 ">
      <ItemContent>
        <ItemTitle className="text-2xl text-neutral-800">Order #{id}</ItemTitle>
        <ItemDescription className="flex flex-col text-neutral-800">
          
            <span className="text-xl"> Items: </span>

              {items.map(item =>

                  <li key={item.id}>
                    <span className="text-[17px]"><strong>{item.productName}</strong> × {item.quantity}</span> <br />
                  </li>

              )}


            <span>Total: ₹{totalAmount}</span>
            <span> Status: {status}</span>
        
        </ItemDescription>
      </ItemContent>
      <ItemActions className="align-top text-sm flex-col">
        <button className="p-2 text-[14px] bg-blue-200 hover:bg-blue-400 rounded-md min-w-35 max-w-fit">Exchange / Refund</button>
        <button className="p-2 text-[14px] bg-blue-200 hover:bg-blue-400 rounded-md min-w-35 max-w-fit">View Details</button>
      </ItemActions>
    </Item>
  )
}

export default OrderCard