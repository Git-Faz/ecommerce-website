import type { JSX, ReactNode } from "react";

interface BodyProps {
  children: ReactNode;
}

export default function Body({ children }: BodyProps): JSX.Element {
  return (
    <main className="flex-1 w-full bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {children}
      </div>
    </main>
  );
}
