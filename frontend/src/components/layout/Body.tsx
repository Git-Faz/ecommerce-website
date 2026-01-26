import type { JSX, ReactNode } from "react";

interface BodyProps {
  children: ReactNode;
}

export default function Body({ children }: BodyProps): JSX.Element {
  return (
    <main className="flex-1 w-full">
      <div className="mx-auto max-w-7xl px-4">
        {children}
      </div>
    </main>
  );
}

