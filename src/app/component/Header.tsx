"use client";

import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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

  return (
    <header className="bg-blue-400">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-white text-3xl">        
            <i className="fa-solid fa-bars cursor-pointer" onClick={() => setOpen(!open)}></i>
          </button>

          <div className="flex items-center gap-2 text-3xl">
            <i className="fa-solid fa-bag-shopping text-red-400"></i>
            <h1 className="font-bold">SHOP</h1>
          </div>
        </div>

        <div className="hidden md:flex gap-2">
          <Input className="w-[350px] border-2" type="search" placeholder="Search Here" />
          <Button className="border-2 border-black">Search</Button>
        </div>

        <div className="flex items-center gap-5">
          <Tooltip>
            <TooltipTrigger>
              <i onClick={() => router.push("/cart")}  className="fa-solid fa-cart-arrow-down text-2xl cursor-pointer" ></i>
            </TooltipTrigger>
            <TooltipContent>
              <h1 className="text-2xl font-bold">Cart</h1>
            </TooltipContent>
          </Tooltip>

          <ThemeToggle />
        </div>
      </div>


      {open &&(
        <div className="md:hidden bg-blue-300 px-4 py-4 space-y-3 text-lg">

          <div className="flex gap-2 mb-3">
            <Input className="w-full border-2" type="search" placeholder="Search Here"  />
            <Button className="border-2">Search</Button>
          </div>

          <details className="w-full">
            <summary className="cursor-pointer py-2 font-semibold">Men</summary>
            <ul className="pl-4 space-y-1">
              <li><a href="">Shirt</a></li>
              <li><a href="">Pants</a></li>
              <li><a href="">Watch</a></li>
              <li><a href="">Shoes</a></li>
            </ul>
          </details>

          <details className="w-full">
            <summary className="cursor-pointer py-2 font-semibold">Women</summary>
            <ul className="pl-4 space-y-1">
              <li><a href="">Shirt</a></li>
              <li><a href="">Pants</a></li>
              <li><a href="">Watch</a></li>
              <li><a href="">Shoes</a></li>
              <li><a href="">Bag</a></li>
              <li><a href="">Jewellery</a></li>
            </ul>
          </details>      

          <details className="w-full">
            <summary className="cursor-pointer py-2 font-semibold">Electronics</summary>
            <ul className="pl-4 space-y-1">
              <li><a href="">Mobile</a></li>
              <li><a href="">Headphone</a></li>
            </ul>
          </details>

        </div>
      )}

      
      <div className="hidden md:flex justify-center py-3">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-8 text-xl">
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-xl">Men</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black text-white p-4">
                <ul className="grid gap-y-2 w-[300px]">
                  <a href="">Shirt</a>
                  <a href="">Pants</a>
                  <a href="">Watch</a>
                  <a href="">Shoes</a>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>


            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-xl">Women</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black text-white p-4">
                <ul className="grid w-[300px] gap-y-2">
                  <a href="">Shirt</a>
                  <a href="">Pants</a>
                  <a href="">Watch</a>
                  <a href="">Shoes</a>
                  <a href="">Bag</a>
                  <a href="">Jewellery</a>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-xl">Electronics</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black text-white p-4">
                <ul className="grid gap-y-2 w-[300px]">
                  <a href="">Mobile</a>
                  <a href="">Headphone</a>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
