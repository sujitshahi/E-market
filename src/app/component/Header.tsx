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
  const [liveResults, setLiveResults] = useState<any[]>([]); 

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setOpen(false);
      setLiveResults([]); 
    }
  };

  const handleLiveSearch = async (value: string) => {
    setSearchQuery(value);

    if (!value.trim()) {
      setLiveResults([]);
      return;
    }

    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${value}`);
      const data = await res.json();
      setLiveResults(data.products || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-blue-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">

     
        <div className="flex items-center justify-between gap-5">
          <div
            className="flex items-center gap-2 text-3xl"
           
          >
            <i className="fa-solid fa-bag-shopping text-red-400"></i>
            <h1 className="font-bold text-white">SHOP</h1>
           
          </div>

          <div>
             <Button className="font-bold text-xl border-2 cursor-pointer" onClick={() => router.push("/")}>Home</Button>
          </div>
        </div>

      
        <div className="md:hidden flex-1 mx-4 relative">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              className="w-full border-2"
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleLiveSearch(e.target.value)}
            />
            <Button type="submit" className="border-2">
              <i className="fa-solid fa-search"></i>
            </Button>
          </form>

         
          {liveResults.length > 0 && (
            <div className="absolute bg-white shadow-lg mt-1 w-full max-h-60 overflow-y-auto border rounded z-50">
              {liveResults.map((item: any) => (
                <div
                  key={item.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    router.push(`/products/${item.id}`);
                    setLiveResults([]);
                    setSearchQuery("");
                  }}
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>

      
        <div className="hidden md:flex gap-2 flex-1 mx-8 relative">
          <form onSubmit={handleSearch} className="flex w-full gap-2">
            <Input
              className="w-full border-2"
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleLiveSearch(e.target.value)} 
            />
            <Button type="submit" className="border-2 font-bold">
              Search
            </Button>
          </form>

                   {liveResults.length > 0 && (
            <div className="absolute bg-white shadow-lg mt-10 w-full border rounded">
              {liveResults.map((item: any) => (
                <div
                  key={item.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    router.push(`/products/${item.id}`);
                  setLiveResults([]);
                    setSearchQuery("");
                  }}
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>

     
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
