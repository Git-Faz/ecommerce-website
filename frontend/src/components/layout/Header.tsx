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
        <NavigationMenu viewport={false} className="mx-auto rounded-lg border border-[#1b1b1b] top-1 "  >
            <NavigationMenuList id="navmenu"  >
            {
                navItems.map((item, index) => (
                    <NavigationMenuItem key={index} className="z-100">
                            <NavigationMenuLink asChild className="text-xl text-neutral-200 hover:text-white font-semibold hover:font-semibold hover:underline">
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