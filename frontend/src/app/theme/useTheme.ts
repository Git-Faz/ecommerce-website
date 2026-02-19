import { useContext } from "react";
import { ThemeContext } from "@/app/theme/ThemeContext";

export function useTheme () {
    const ctx = useContext(ThemeContext);

    if(!ctx) {
        throw new Error ("useTheme must be used inside the ThemeProvider");
    }

    return ctx;
}