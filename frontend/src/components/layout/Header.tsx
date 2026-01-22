import {
    NavigationMenu,
//    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
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
            href:"/"
        },
        {
            label:"Cart",
            href:"/cart"
        },
        {
            label:"Orders",
            href:"/orders"
        },
        {
            label:"Login",
            href: "/auth"
        }
    ];


    return (
        <NavigationMenu viewport={false} className="mx-auto border border-b border-neutral-400 shadow-neutral-500 shadow-md "  >
            <NavigationMenuList id="navmenu"  >
            {
                navItems.map((item, index) => (
                    <NavigationMenuItem key={index} className="z-100">
                            <NavigationMenuLink asChild className="text-xl text-black font-semibold hover:font-semibold hover:underline active:underline">
                                <Link to={item.href}>{item.label}</Link>
                            </NavigationMenuLink>
                    </NavigationMenuItem>
                ))
            }
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export { Header };