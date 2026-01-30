import { ThemeContext, type Theme } from "./ThemeContext";
import { useState } from "react";

export function ThemeProvider({children}: {children: React.ReactNode}){

    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        setTheme( prev => prev === "light" ? "dark" : "light");
    }

    return(
        <ThemeContext.Provider value = {{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}