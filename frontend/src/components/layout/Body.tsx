import type { JSX, ReactNode } from "react";

interface BodyProps {
  children: ReactNode;
  classname?: string
}

export default function Body({ children, classname = "mx-auto max-w-7xl px-4 " }: BodyProps,): JSX.Element {
  return (
    <main className="flex-1 w-full">
      <div className = {classname}>
        {children}
      </div>
    </main>
  );
}

