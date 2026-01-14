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
        }
    ];


    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList className="z-100">
            {
                navItems.map((item, index) => (
                    <NavigationMenuItem key={index} className="z-100">
                        <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-white border shadow-md">   
                            <NavigationMenuLink asChild>
                                <Link to={item.href}>{item.label}</Link>
                            </NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))
            }
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export { Header };