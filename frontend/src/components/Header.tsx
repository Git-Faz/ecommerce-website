import {
    NavigationMenu,
    NavigationMenuContent,
//    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { JSX } from "react";


const Header = (): JSX.Element => {

    let navItems: string[] = [];

    for (let i : number = 0; i < 5; i++) {
        navItems.push(`Item ${i+1}`)
    }

    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList className="z-100">
            {
                navItems.map((item, index) => (
                    <NavigationMenuItem key={index} className="z-100">
                        <NavigationMenuTrigger>{item}</NavigationMenuTrigger>
                        <NavigationMenuContent className="z-100">   
                            <NavigationMenuLink>Link {index+1}</NavigationMenuLink>
                            <p>This is the description for item {index+1}</p>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))
            }
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export { Header };