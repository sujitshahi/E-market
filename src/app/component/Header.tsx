"use client"
import { useRouter } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input" 
import { Button } from "@/components/ui/button"


export function Header() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-4 bg-blue-400">
      <div className="flex items-center gap-2 text-4xl">
          <i className="fa-solid fa-bag-shopping text-red-400"></i>
          <h1 className="font-bold">SHOP</h1>
      </div>

      <div className="flex gap-2">
          <Input className="w-[300px] border-2" type="search" placeholder="Search Here" />
          
          <Button className="border-2">Search</Button>
      </div>

      <div>
        <NavigationMenu >
          <NavigationMenuList className="flex-wrap">
            <NavigationMenuItem>
            
              <Button className="text-xl">Home</Button>
              
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-xl">Men</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black text-white">

                <ul className="grid gap-y-2 w-[300px]">

                  <h1>Shirt</h1>
                  <p>Lorem at eius repellendus id velit! Ipsum autem provident error quam excepturi!</p>
                  <h1>Pants</h1>
                  <p>Lorem at eius repellendus id velit! Ipsum autem provident error quam excepturi!</p>
                  <h1>Watched</h1>
                  <p>Lorem at eius repellendus id velit! Ipsum autem provident error quam excepturi!</p>
                  <h1>Shoes</h1>
                  <p>Lorem at eius repellendus id velit! Ipsum autem provident error quam excepturi!</p>
                
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger className="text-xl">Women</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black text-white">
                
                <ul className="grid w-[300px] gap-y-2">  

                  <h1>Shirt</h1>
                  <p>Lorem at eius repellendus id velit! Ipsum autem provident error quam excepturi!</p>
                  <h1>Pants</h1>
                  <p>Lorem at eius repellendus id velit! Ipsum autem provident error quam excepturi!</p>
                  <h1>Watched</h1>
                  <p>Lorem at eius repellendus id velit! Ipsum autem provident error quam excepturi!</p>
                  <h1>Shoes</h1>
                  <p>Lorem at eius repellendus id velit! Ipsum autem provident error quam excepturi!</p>
                  
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger className="text-xl">Electronics</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black text-white">
                <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>Mobile Phone</li>
                  <li>Kitchen Appliances</li>
                  <li>Headphones</li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>


            <NavigationMenuItem onClick={() => router.push(`/features/cart`)}>
              <i className="fa-solid fa-cart-arrow-down fa-xl"></i>
            </NavigationMenuItem>

            
          </NavigationMenuList>
        </NavigationMenu>
      </div>
        
    </div>
  )
}
