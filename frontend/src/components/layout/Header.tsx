import {
    NavigationMenu,
    NavigationMenuContent,
    //    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { HomeIcon, MoonIcon, SunIcon, User2Icon } from "lucide-react";
import lightLogo from "../../assets/FazCartLight.svg";
import darkLogo from "../../assets/FazCartDark.svg"
import { ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import type { JSX } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import SearchBar from "./SearchBar"


interface NavItem {
    label: string
    href: string
}

const Header = (): JSX.Element => {

    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

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

    const handleSearch = (query: string) => {

        if (query.length >= 5) {
            navigate(`/products?name=${encodeURIComponent(query)}`)
        }
    }

    return (
        <div className="m-0 w-full">
            <NavigationMenu viewport={false} className="mx-auto w-full"  >
                <NavigationMenuList id="navmenu" className="shadow-blue-200 dark:shadow-blue-500 shadow-sm p-5" >
                    <div className="flex flex-row justify-start content-center m-0 min-w-fit w-50 p-4 text-black font-light text-xl">
                        <img src={theme === "dark" ? lightLogo : darkLogo} alt="logo" className="size-15" />                        <span className="h-fit my-auto dark:text-white" id="logo">Faz<br></br>Cart</span>
                    </div>

                    <SearchBar onSearch={handleSearch} />

                    <div className="w-fit flex flex-row align-middle items-center ">
                        <NavigationMenuItem className="flex items-center flex-col hover:bg-background rounded-md p-1 ">
                            <Link to={"/"}
                                className="flex flex-row gap-x-2 justify-center items-center text-lg px-2 font-semibold content-center">
                                <HomeIcon size={20} />
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="flex items-center flex-col hover:bg-background rounded-md p-1 ">
                            <Link to={"/cart"}
                                className="flex flex-row gap-x-2 justify-center items-center text-lg px-2 font-semibold content-center">
                                <ShoppingCartIcon size={20} />
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>

                            <NavigationMenuTrigger className="flex items-center dark:hover:bg-background bg-transparent gap-2 z-100 text-lg">
                                <User2Icon size={20} />
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
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant={'ghost'} className="text-sm" onClick={toggleTheme}>
                                    {theme === "dark" ? <SunIcon></SunIcon> : <MoonIcon />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="m-2 p-2 z-70">
                                {theme === "dark" ? <span>Light mode</span> : <span>Dark mode</span>}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export { Header };