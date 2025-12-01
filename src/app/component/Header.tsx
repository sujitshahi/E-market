'use client';

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setOpen(false);
    }
  };

  return (
    <header className="bg-blue-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-3xl cursor-pointer" onClick={() => router.push("/")}>
            <i className="fa-solid fa-bag-shopping text-red-400"></i>
            <h1 className="font-bold text-white">SHOP</h1>
          </div>
        </div>

        
        <div className="md:hidden flex-1 mx-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input 
              className="w-full border-2" 
              type="search" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="border-2">
              <i className="fa-solid fa-search"></i>
            </Button>
          </form>
        </div>

        
        <form onSubmit={handleSearch} className="hidden md:flex gap-2 flex-1 mx-8">
          <Input 
            className="w-full border-2" 
            type="search" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" className="border-2">
            Search
          </Button>
        </form>
              
        <div className="flex items-center gap-5">
          <Tooltip>
            <TooltipTrigger>
              <i 
                onClick={() => router.push("/cart")}  
                className="fa-solid fa-cart-arrow-down text-2xl cursor-pointer text-white"
              ></i>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-bold text-lg">Cart</span>
            </TooltipContent>
          </Tooltip>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}