import { useEffect, useState, type JSX } from "react"
import { useNavigate, useLocation, useSearchParams } from "react-router-dom"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { SearchIcon } from "lucide-react"
import { cn } from "@/shared/utils/utils"

interface SearchBarProps {
  onSearch?: (query: string) => void  // optional
  className?: string
}

export default function SearchBar({ onSearch, className }: SearchBarProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlQuery = searchParams.get("name") ?? ""
  const [query, setQuery] = useState(urlQuery)
  const navigate = useNavigate()
  const location = useLocation()

  const isOnProductsPage = location.pathname === "/products" || location.pathname === "/"

  const navigateOrSearch = (trimmed: string) => {
    if (isOnProductsPage) {
      // Already on products — just update the URL param, no navigation
      setSearchParams(trimmed ? { name: trimmed } : {}, { replace: true })
    } else if (trimmed) {
      // else navigate to products with query
      navigate(`/products?name=${encodeURIComponent(trimmed)}`)
    }
  }

  // Sync input if URL param changes externally (e.g. browser back/forward)
  useEffect(() => {
    setQuery(urlQuery)
  }, [urlQuery])

  // Debounced live search
  useEffect(() => {
    const handler = setTimeout(() => {
      const cleanQuery = query.trim().toLowerCase()

      if (cleanQuery.length > 0 && cleanQuery.length < 3) return
      navigateOrSearch(cleanQuery)
    }, 300)

    return () => clearTimeout(handler)
  }, [query])

  const handleExplicitSearch = () => {
    const cleanQuery = query.trim().toLowerCase();
    navigateOrSearch(cleanQuery)
    onSearch?.(cleanQuery)
  }

  return (
    <div className={cn("flex flex-row w-lg min-w-xs max-w-3xl flex-2 m-1 p-2", className)}>
      <Input
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={handleExplicitSearch}
        onKeyDown={e => e.key === "Enter" && handleExplicitSearch()}
        className="bg-neutral-200 dark:bg-inherit border-black dark:border-blue-500 rounded-md rounded-r-none dark:outline-blue-500"
      />
      <Button
        size="icon"
        variant="default"
        className="border-blue-300 rounded-md rounded-l-none dark:outline-blue-500 dark:bg-blue-500"
        onClick={handleExplicitSearch}
      >
        <SearchIcon />
      </Button>
    </div>
  )
}