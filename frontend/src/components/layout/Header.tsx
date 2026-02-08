import {
    NavigationMenu,
    NavigationMenuContent,
    //    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MoonIcon, SunIcon, User2Icon } from "lucide-react";
import { ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import type { JSX } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "../ui/button";
interface NavItem {
    label: string
    href: string
}

const Header = (): JSX.Element => {

    const {theme, toggleTheme} = useTheme();

    let navItems: NavItem[] = [
        {
            label: "Home",
            href: "/"
        },
    ];

    const navLinks: NavItem[] = [
        {
            label: "My Account", href: "/account"
        },
        {
            label: "Orders", href: "/orders"
        },
        {
            label: "Wishlist", href: "#"
        },
    ]

    return (
        <div className="m-0 w-full">
            <NavigationMenu viewport={false} className="mx-auto w-full"  >
                <NavigationMenuList id="navmenu" className="shadow-blue-200 dark:shadow-blue-500 shadow-sm " >
                    <div className="flex flex-row m-2">
                        {
                            navItems.map((item, index) => (

                                <NavigationMenuItem key={index} className="z-100 hover:bg-background focus:bg-background rounded-md">
                                    <NavigationMenuLink asChild className="text-xl font-semibold hover:font-semibold hover:bg-background rounded-md ">
                                        <Link to={item.href}>{item.label}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))
                        }
                    </div>
                    <div className="w-fit flex flex-row align-middle items-center ">
                        <Button variant={"outline"} onClick={toggleTheme}>{theme === "dark" ? <SunIcon /> : <MoonIcon/>}</Button>
                        <NavigationMenuItem className="flex items-center flex-col hover:bg-background rounded-md p-1 ">
                                <Link to={"/cart"} className="flex flex-row gap-x-2 justify-center items-center text-lg px-2 font-semibold content-center"><ShoppingCartIcon size={20}/>Cart</Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            
                            <NavigationMenuTrigger className="flex items-center dark:hover:bg-background bg-transparent gap-2 z-100 text-lg">
                                <User2Icon size={20} />
                                <span className="font-semibold">My Account</span>
                            </NavigationMenuTrigger>

                            <NavigationMenuContent className="p-3 flex flex-col gap-2">
                                {
                                    navLinks.map((link, i) => (
                                        <NavigationMenuLink asChild key={i}>
                                            <Link to={link.href} className="font-semibold hover:underline">
                                                {link.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    ))
                                }
                            </NavigationMenuContent>
                            
                        </NavigationMenuItem>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export { Header };