import { useEffect, useState, type JSX } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  value?: string
  onSearch: (query: string) => void
  className?: string
}

export default function SearchBar({ value="", onSearch, className }: SearchBarProps): JSX.Element {

  const [query, setQuery] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query.trim())
    }, 300);
  
    return () => {
      clearTimeout(handler)
    }
  }, [query,onSearch])
  

  return (
    <div className={cn("flex flex-row w-lg min-w-xs max-w-3xl flex-2 m-2 p-2", className)}>
      <Input
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="bg-neutral-200 dark:bg-inherit border-black dark:border-blue-500 rounded-md rounded-r-none dark:outline-blue-500"
      />
      <Button
        size="icon"
        variant="default"
        className="border-blue-300 rounded-md rounded-l-none dark:outline-blue-500 dark:bg-blue-500"
        onClick={() => onSearch(query.trim())} 
      >
        <SearchIcon />
      </Button>
    </div>
  )
}
