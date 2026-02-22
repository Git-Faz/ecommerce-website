import { type JSX } from "react";
import ProductsList from "@/features/products/components/ProductsList";
import Body from "@/shared/components/layout/Body";

function Home(): JSX.Element {

    return (
        <Body classname="w-full h-full py-20 px-10">
            <ProductsList/>
        </Body>
    );
}

export default Home;
