import type { JSX } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function SearchBar({
  value,
  onChange,
  className,
}: SearchBarProps): JSX.Element {
  return (
    <div className={cn("flex flex-row w-lg min-w-xs max-w-lg m-2 p-2", className)}>
      <Input
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="bg-neutral-200 dark:bg-inherit border-black dark:border-blue-300 rounded-md rounded-r-none dark:outline-blue-300"
      />
      <Button
        size="icon"
        variant="default"
        className="border-blue-300 rounded-md rounded-l-none dark:outline-blue-300 dark:bg-blue-300"
      >
        <SearchIcon />
      </Button>
    </div>
  )
}
