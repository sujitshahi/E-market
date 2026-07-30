'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useRef, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  description?: string;
  category?: string;
  brand?: string;
}

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={`${part}-${i}`} className="bg-indigo-100 text-indigo-900 font-bold rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

function SearchDropdown({
  isLoading,
  results,
  query,
  setItemRef,
  onClose,
  onKeyDown,
}: {
  isLoading: boolean;
  results: Product[];
  query: string;
  setItemRef: (el: HTMLAnchorElement | null, idx: number) => void;
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLAnchorElement>, idx: number) => void;
}) {
  return (
    <div 
      role="listbox"
      className="absolute top-full left-0 right-0 shadow-2xl mt-2 border rounded-2xl z-50 max-h-60 overflow-y-auto backdrop-blur-xl bg-white/95 border-slate-200 text-slate-800"
    >
      {isLoading ? (
        <div className="p-4 text-xs text-slate-500 text-center flex items-center justify-center gap-2">
          <i className="fa-solid fa-circle-notch animate-spin text-indigo-600"></i>
          Searching...
        </div>
      ) : results.length > 0 ? (
        results.map((item, idx) => (
          <Link
            key={item.id}
            href={`/features/product/${item.id}`}
            ref={(el) => setItemRef(el, idx)}
            tabIndex={0}
            role="option"
            aria-selected={false}
            className="block p-3 text-xs font-medium cursor-pointer transition-colors hover:bg-indigo-50 focus:bg-indigo-100 text-slate-800"
            onClick={onClose}
            onKeyDown={(e) => onKeyDown(e, idx)}
          >
            <HighlightText text={item.title} query={query} />
          </Link>
        ))
      ) : (
        <div className="p-4 text-xs text-slate-400 text-center">
          No products found for "<span className="font-semibold">{query}</span>"
        </div>
      )}
    </div>
  );
}

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [liveResults, setLiveResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=0", {
          signal: controller.signal,
        });

        if (!res.ok) {
          console.error(`HTTP error! status: ${res.status}`);
          if (!controller.signal.aborted) {
            setIsLoading(false);
          }
          return;
        }

        const data = await res.json();
        
        if (!controller.signal.aborted) {
          setAllProducts(data.products || []);
          setIsLoading(false);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Failed to load products for search:", err);
        }

        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    searchItemRefs.current = searchItemRefs.current.slice(0, liveResults.length);
  }, [liveResults]);

  useEffect(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase().replace(/\s+/g, " ");

    if (!trimmedQuery) {
      setLiveResults([]);
      return;
    }

    const words = trimmedQuery.split(" ");

    const filtered = allProducts.filter((product) => {
      const combinedText = `${product.title} ${product.category || ""} ${product.brand || ""}`.toLowerCase();
      return words.every((word) => combinedText.includes(word));
    });

    setLiveResults(filtered.slice(0, 6));
  }, [searchQuery, allProducts]);

  useEffect(() => {
    const handleClickOutsideOrEscape = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key === "Escape") {
        setLiveResults([]);
        return;
      }

      if (event instanceof MouseEvent) {
        const target = event.target as Node;
        const clickedDesktop = desktopSearchRef.current?.contains(target);
        const clickedMobile = mobileSearchRef.current?.contains(target);

        if (!clickedDesktop && !clickedMobile) setLiveResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideOrEscape);
    document.addEventListener("keydown", handleClickOutsideOrEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideOrEscape);
      document.removeEventListener("keydown", handleClickOutsideOrEscape);
    };
  }, []);

  const closeDropdown = () => {
    setLiveResults([]);
    setIsMobileSearchOpen(false);
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      closeDropdown();
    }
  };

  const setItemRef = (el: HTMLAnchorElement | null, idx: number) => {
    searchItemRefs.current[idx] = el;
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (index + 1) % liveResults.length;
      searchItemRefs.current[nextIdx]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (index - 1 + liveResults.length) % liveResults.length;
      searchItemRefs.current[prevIdx]?.focus();
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' && liveResults.length > 0) {
      e.preventDefault();
      searchItemRefs.current[0]?.focus();
    }
  };

  const showDropdown = searchQuery.trim().length > 0;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 bg-slate-900 border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 sm:gap-4 relative">

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xl sm:text-2xl font-black tracking-tight group cursor-pointer"
          >
            <i className="fa-solid fa-bag-shopping text-indigo-500 transition-transform"></i>
            <span className="text-white">SHOP</span>
          </Link>

          <Button 
            asChild
            className="hidden sm:flex text-xs font-semibold cursor-pointer rounded-2xl transition-all hover:bg-slate-100 text-white hover:text-slate-700"
          >
            <Link href="/">Home</Link>
          </Button>
        </div>

        <div ref={desktopSearchRef} className="hidden md:flex gap-2 flex-1 max-w-md mx-4 relative">
          <form onSubmit={handleSearch} className="flex w-full gap-2">
            <Input
              className="w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
              type="search"
              role="combobox"
              aria-label="Search products"
              aria-expanded={showDropdown}
              aria-autocomplete="list"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
              onKeyDown={handleInputKeyDown}
            />
            <Button type="submit" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-5 cursor-pointer">
              Search
            </Button>
          </form>

          {showDropdown && (
            <SearchDropdown
              isLoading={isLoading}
              results={liveResults}
              query={searchQuery}
              setItemRef={setItemRef}
              onClose={closeDropdown}
              onKeyDown={handleDropdownKeyDown}
            />
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden p-2 rounded-2xl border transition-all cursor-pointer bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
            aria-label="Toggle search bar"
          >
            <i className={`fa-solid ${isMobileSearchOpen ? 'fa-xmark' : 'fa-magnifying-glass'} text-sm`}></i>
          </button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/cart"
                  className="p-2 rounded-2xl border transition-all hover:scale-105 active:scale-95 cursor-pointer bg-white border-slate-200 text-slate-700 hover:bg-slate-100 inline-flex items-center justify-center"
                >
                  <i className="fa-solid fa-cart-arrow-down text-sm sm:text-base"></i>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <span className="font-semibold text-xs">View Cart</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {isMobileSearchOpen && (
        <div ref={mobileSearchRef} className="md:hidden px-4 pb-3 border-t border-slate-200/60 pt-3 relative">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              className="w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
              type="search"
              role="combobox"
              aria-label="Search products mobile"
              aria-expanded={showDropdown}
              aria-autocomplete="list"
              placeholder="Search products..."
              value={searchQuery}
              autoFocus
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            <Button type="submit" size="icon" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0">
              <i className="fa-solid fa-search text-xs"></i>
            </Button>
          </form>

          {showDropdown && (
            <SearchDropdown
              isLoading={isLoading}
              results={liveResults}
              query={searchQuery}
              setItemRef={setItemRef}
              onClose={closeDropdown}
              onKeyDown={handleDropdownKeyDown}
            />
          )}
        </div>
      )}
    </header>
  );
}