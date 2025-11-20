"use client"

import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"
import { useRouter } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input" 
import { Button } from "@/components/ui/button"


const components: { title: string; href: string; description: string }[] = [
  {
    title: "Shirts",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Pants",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Watches",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Shoes",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  }
]

export function Header() {
  const router = useRouter();

  return (
    <div className="border-b-4 flex items-center justify-between p-4 bg-blue-400">
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
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-xl">Women</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-black text-white">
            <ul className="grid w-[300px] gap-4">
              
                {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
                ))}
                
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Jewelery</div>
                    <div className="text-muted-foreground">
                      Learn how to use the library.
                    </div>
                  </Link>
                </NavigationMenuLink>
              
              
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-xl">Electronics</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-black text-white">
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">Mobile Phone</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">Kitchen Appliances</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">Home Appliances</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-xl">New arrival</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-black text-white">
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleHelpIcon />
                    Backlog
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleIcon />
                    To Do
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleCheckIcon />
                    Done
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem onClick={() => router.push("/cart")}>
  <i className="fa-solid fa-cart-arrow-down fa-xl"></i>
</NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
        </div>
        
    </div>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
