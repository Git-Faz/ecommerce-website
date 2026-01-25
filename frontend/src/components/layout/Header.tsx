import {
    NavigationMenu,
    NavigationMenuContent,
    //    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { User2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import type { JSX } from "react";

interface NavItem {
    label: string
    href: string
}

const Header = (): JSX.Element => {

    let navItems: NavItem[] = [
        {
            label: "Home",
            href: "/"
        },
        {
            label: "Cart",
            href: "/cart"
        },
    ];

    return (
        <div className="m-0">
        <NavigationMenu viewport={false} className="mx-auto border border-b border-neutral-400 shadow-neutral-500 shadow-md "  >
            <NavigationMenuList id="navmenu"  >
                <div className="flex flex-row m-2">
                    {
                        navItems.map((item, index) => (

                            <NavigationMenuItem key={index} className="z-100">
                                <NavigationMenuLink asChild className="text-xl text-black font-semibold hover:font-semibold">
                                    <Link to={item.href}>{item.label}</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))
                    }
                </div>
                <div>
                    <NavigationMenuItem className="">
                        <NavigationMenuTrigger className="flex items-center gap-2 bg-transparent z-100 text-lg">
                            <User2Icon size={20} />
                            <span className="font-semibold">My Account</span>
                        </NavigationMenuTrigger>

                        <NavigationMenuContent className="p-3 flex flex-col gap-2">
                            <NavigationMenuLink asChild>
                                <Link to="/account" className="font-semibold hover:underline">
                                    My account
                                </Link>
                            </NavigationMenuLink>

                            <NavigationMenuLink asChild>
                                <Link to="/cart" className="font-semibold hover:underline">
                                    Cart
                                </Link>
                            </NavigationMenuLink>

                            <NavigationMenuLink asChild>
                                <Link to="/orders" className="font-semibold hover:underline">
                                    Orders
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                </div>
            </NavigationMenuList>
        </NavigationMenu>
        </div>
    )
}

export { Header };