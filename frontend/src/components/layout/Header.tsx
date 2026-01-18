import {
    NavigationMenu,
    NavigationMenuContent,
//    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
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
        <NavigationMenu viewport={false} >
            <NavigationMenuList className="z-100 p-1 bg-blue-300 w-screen">
            {
                navItems.map((item, index) => (
                    <NavigationMenuItem key={index} className="z-100">
                            <NavigationMenuLink asChild className="text-xl text-blue-950 hover:text-black font-semibold hover:font-semibold hover:underline">
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