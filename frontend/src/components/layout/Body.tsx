import type { JSX, ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";
import { themeClasses } from "@/context/ThemeContext";

interface BodyProps {
  children: ReactNode;
  classname?: string
}

export default function Body({ children, classname = "mx-auto max-w-8xl px-4" }: BodyProps,): JSX.Element {

  const {theme} = useTheme();

  return (
    <main className={`flex-1 w-full ${themeClasses[theme]} `}>
      <div className = {classname}>
        {children}
      </div>
    </main>
  );
}

