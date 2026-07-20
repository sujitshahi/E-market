// 'use client';

// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { useState, useRef, useEffect } from "react";

// export function Header() {
//   const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [liveResults, setLiveResults] = useState<any[]>([]);


//   const mobileRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const desktopRefs = useRef<(HTMLDivElement | null)[]>([]);

 
//   useEffect(() => {
//     mobileRefs.current = mobileRefs.current.slice(0, liveResults.length);
//     desktopRefs.current = desktopRefs.current.slice(0, liveResults.length);
//   }, [liveResults]);

//   const handleSearch = (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
    
//     if (searchQuery.trim()) {
//       router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//       setOpen(false);
//       setLiveResults([]); 
//     }
//   };

//   const handleLiveSearch = async (value: string) => {
//     setSearchQuery(value);

//     if (!value.trim()) {
//       setLiveResults([]);
//       return;
//     }

//     try {
//       const res = await fetch(`https://dummyjson.com/products/search?q=${value}`);
//       const data = await res.json();
//       setLiveResults(data.products || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

  
//   const handleDropdownKeyDown = (
//     e: React.KeyboardEvent,
//     index: number,
//     item: any,
//     refArray: React.MutableRefObject<(HTMLDivElement | null)[]>
//   ) => {
//     if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       if (index + 1 < liveResults.length) {
//         refArray.current[index + 1]?.focus();
//       }
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       if (index - 1 >= 0) {
//         refArray.current[index - 1]?.focus();
//       }
//     } else if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       router.push(`/features/product/${item.id}`); // Fixed path mismatch
//       setLiveResults([]);
//       setSearchQuery("");
//     }
//   };

 
//   const handleInputKeyDown = (e: React.KeyboardEvent, refArray: React.MutableRefObject<(HTMLDivElement | null)[]>) => {
//     if (e.key === 'ArrowDown' && liveResults.length > 0) {
//       e.preventDefault();
//       refArray.current[0]?.focus(); // Jump to first search recommendation item
//     }
//   };

//   return (
//     <header className="bg-gray-900 shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">

//         <div className="flex items-center justify-between gap-5">
//           <div className="flex items-center gap-2 text-3xl">
//             <i className="fa-solid fa-bag-shopping text-red-400"></i>
//             <h1 className="font-bold text-white">SHOP</h1>
//           </div>

//           <div className="text-white border-white">
//              <Button className="font-bold text-xl border-2 cursor-pointer" onClick={() => router.push("/")}>Home</Button>
//           </div>
//         </div>


//         <div className="md:hidden flex-1 mx-4 relative">
//           <form onSubmit={handleSearch} className="flex gap-2">
//             <Input
//               className="w-full border-2 border-white text-white focus:ring-2 focus:ring-blue-400"
//               type="search"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => handleLiveSearch(e.target.value)}
//               onKeyDown={(e) => handleInputKeyDown(e, mobileRefs)} // Listens for downward jump trigger
//             />
//             <Button type="submit" className="border-2 border-white text-white">
//               <i className="fa-solid fa-search"></i>
//             </Button>
//           </form>

//           {liveResults.length > 0 && (
//             <div className="absolute bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 shadow-lg mt-1 w-full max-h-60 overflow-y-auto border border-gray-200 dark:border-zinc-700 rounded z-50">
//               {liveResults.map((item: any, idx: number) => (
//                 <div
//                   key={item.id}
//                   ref={(el) => { mobileRefs.current[idx] = el; }} // Connect element node
//                   tabIndex={0} // Makes element keyboard accessible
//                   role="button"
//                   className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 focus:bg-gray-200 dark:focus:bg-zinc-800 outline-none cursor-pointer transition-colors"
//                   onClick={() => {
//                     router.push(`/features/product/${item.id}`); // Fixed path mismatch
//                     setLiveResults([]);
//                     setSearchQuery("");
//                   }}
//                   onKeyDown={(e) => handleDropdownKeyDown(e, idx, item, mobileRefs)}
//                 >
//                   {item.title}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

   
//         <div className="hidden md:flex gap-2 flex-1 mx-8 relative">
//           <form onSubmit={handleSearch} className="flex w-full gap-2">
//             <Input
//               className="w-full border-2 border-white text-white focus:ring-2 focus:ring-blue-400"
//               type="search"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => handleLiveSearch(e.target.value)} 
//               onKeyDown={(e) => handleInputKeyDown(e, desktopRefs)} // Listens for downward jump trigger
//             />
//             <Button type="submit" className="border-2 cursor-pointer font-bold border-white text-white">
//               Search
//             </Button>
//           </form>

//           {liveResults.length > 0 && (
//             <div className="absolute bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 shadow-lg mt-10 w-full border border-gray-200 dark:border-zinc-700 rounded z-50 max-h-60 overflow-y-auto">
//               {liveResults.map((item: any, idx: number) => (
//                 <div
//                   key={item.id}
//                   ref={(el) => { desktopRefs.current[idx] = el; }} // Connect element node
//                   tabIndex={0} // Makes element keyboard accessible
//                   role="button"
//                   className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 focus:bg-gray-200 dark:focus:bg-zinc-700 outline-none cursor-pointer transition-colors"
//                   onClick={() => {
//                     router.push(`/features/product/${item.id}`); // Fixed path mismatch
//                     setLiveResults([]);
//                     setSearchQuery("");
//                   }}
//                   onKeyDown={(e) => handleDropdownKeyDown(e, idx, item, desktopRefs)}
//                 >
//                   {item.title}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="flex items-center gap-5">
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <i
//                 onClick={() => router.push("/cart")}
//                 className="fa-solid fa-cart-arrow-down text-2xl cursor-pointer text-white"
//               ></i>
//             </TooltipTrigger>
//             <TooltipContent>
//               <span className="font-bold text-lg">Cart</span>
//             </TooltipContent>
//           </Tooltip>

      
//         </div>
//       </div>
//     </header>
//   );
// }








// 'use client';

// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { useState, useRef, useEffect } from "react";

// export function Header() {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [liveResults, setLiveResults] = useState<any[]>([]);
//   const [isDark, setIsDark] = useState(true);

//   const mobileRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const desktopRefs = useRef<(HTMLDivElement | null)[]>([]);

//   // Load saved theme preference on mount
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//       setIsDark(savedTheme === 'dark');
//     }
//   }, []);

//   // Sync theme with page body/HTML if needed, or trigger custom theme event
//   const toggleTheme = () => {
//     setIsDark((prev) => {
//       const nextTheme = !prev;
//       localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
//       // Dispatch event so other components listening on same page can react instantly
//       window.dispatchEvent(new Event('storage'));
//       return nextTheme;
//     });
//   };

//   useEffect(() => {
//     mobileRefs.current = mobileRefs.current.slice(0, liveResults.length);
//     desktopRefs.current = desktopRefs.current.slice(0, liveResults.length);
//   }, [liveResults]);

//   const handleSearch = (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
    
//     if (searchQuery.trim()) {
//       router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//       setLiveResults([]); 
//     }
//   };

//   const handleLiveSearch = async (value: string) => {
//     setSearchQuery(value);

//     if (!value.trim()) {
//       setLiveResults([]);
//       return;
//     }

//     try {
//       const res = await fetch(`https://dummyjson.com/products/search?q=${value}`);
//       const data = await res.json();
//       setLiveResults(data.products || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDropdownKeyDown = (
//     e: React.KeyboardEvent,
//     index: number,
//     item: any,
//     refArray: React.MutableRefObject<(HTMLDivElement | null)[]>
//   ) => {
//     if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       if (index + 1 < liveResults.length) {
//         refArray.current[index + 1]?.focus();
//       }
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       if (index - 1 >= 0) {
//         refArray.current[index - 1]?.focus();
//       }
//     } else if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       router.push(`/features/product/${item.id}`);
//       setLiveResults([]);
//       setSearchQuery("");
//     }
//   };

//   const handleInputKeyDown = (e: React.KeyboardEvent, refArray: React.MutableRefObject<(HTMLDivElement | null)[]>) => {
//     if (e.key === 'ArrowDown' && liveResults.length > 0) {
//       e.preventDefault();
//       refArray.current[0]?.focus();
//     }
//   };

//   return (
//     <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${
//       isDark ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-white/80 border-slate-200 text-slate-900'
//     }`}>
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 relative">

//         {/* Brand & Home */}
//         <div className="flex items-center gap-4">
//           <div 
//             className="flex items-center gap-2 text-2xl font-black tracking-tight cursor-pointer group"
//             onClick={() => router.push("/")}
//           >
//             <i className="fa-solid fa-bag-shopping text-indigo-500 group-hover:scale-110 transition-transform"></i>
//             <span className={isDark ? "bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent" : "text-slate-900"}>
//               SHOP
//             </span>
//           </div>

//           <Button 
//             variant="ghost" 
//             onClick={() => router.push("/")}
//             className={`hidden sm:flex text-xs font-semibold rounded-2xl transition-all ${
//               isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
//             }`}
//           >
//             Home
//           </Button>
//         </div>

//         {/* Mobile Search Input */}
//         <div className="md:hidden flex-1 relative">
//           <form onSubmit={handleSearch} className="flex gap-2">
//             <Input
//               className={`w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 ${
//                 isDark 
//                   ? 'bg-slate-900/80 border-slate-800 text-slate-200 placeholder-slate-500' 
//                   : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
//               }`}
//               type="search"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => handleLiveSearch(e.target.value)}
//               onKeyDown={(e) => handleInputKeyDown(e, mobileRefs)}
//             />
//             <Button type="submit" size="icon" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0">
//               <i className="fa-solid fa-search text-xs"></i>
//             </Button>
//           </form>

//           {liveResults.length > 0 && (
//             <div className={`absolute left-0 right-0 shadow-2xl mt-2 max-h-60 overflow-y-auto border rounded-2xl z-50 backdrop-blur-xl ${
//               isDark ? 'bg-slate-900/95 border-slate-800 text-slate-200' : 'bg-white/95 border-slate-200 text-slate-800'
//             }`}>
//               {liveResults.map((item: any, idx: number) => (
//                 <div
//                   key={item.id}
//                   ref={(el) => { mobileRefs.current[idx] = el; }}
//                   tabIndex={0}
//                   role="button"
//                   className={`p-3 text-xs font-medium cursor-pointer transition-colors ${
//                     isDark 
//                       ? 'hover:bg-indigo-600/20 focus:bg-indigo-600/30 text-slate-200' 
//                       : 'hover:bg-indigo-50 focus:bg-indigo-100 text-slate-800'
//                   }`}
//                   onClick={() => {
//                     router.push(`/features/product/${item.id}`);
//                     setLiveResults([]);
//                     setSearchQuery("");
//                   }}
//                   onKeyDown={(e) => handleDropdownKeyDown(e, idx, item, mobileRefs)}
//                 >
//                   {item.title}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Desktop Search Input */}
//         <div className="hidden md:flex gap-2 flex-1 max-w-md mx-4 relative">
//           <form onSubmit={handleSearch} className="flex w-full gap-2">
//             <Input
//               className={`w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 ${
//                 isDark 
//                   ? 'bg-slate-900/80 border-slate-800 text-slate-200 placeholder-slate-500' 
//                   : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
//               }`}
//               type="search"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => handleLiveSearch(e.target.value)} 
//               onKeyDown={(e) => handleInputKeyDown(e, desktopRefs)}
//             />
//             <Button type="submit" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-5">
//               Search
//             </Button>
//           </form>

//           {liveResults.length > 0 && (
//             <div className={`absolute top-full left-0 right-0 shadow-2xl mt-2 border rounded-2xl z-50 max-h-60 overflow-y-auto backdrop-blur-xl ${
//               isDark ? 'bg-slate-900/95 border-slate-800 text-slate-200' : 'bg-white/95 border-slate-200 text-slate-800'
//             }`}>
//               {liveResults.map((item: any, idx: number) => (
//                 <div
//                   key={item.id}
//                   ref={(el) => { desktopRefs.current[idx] = el; }}
//                   tabIndex={0}
//                   role="button"
//                   className={`p-3 text-xs font-medium cursor-pointer transition-colors ${
//                     isDark 
//                       ? 'hover:bg-indigo-600/20 focus:bg-indigo-600/30 text-slate-200' 
//                       : 'hover:bg-indigo-50 focus:bg-indigo-100 text-slate-800'
//                   }`}
//                   onClick={() => {
//                     router.push(`/features/product/${item.id}`);
//                     setLiveResults([]);
//                     setSearchQuery("");
//                   }}
//                   onKeyDown={(e) => handleDropdownKeyDown(e, idx, item, desktopRefs)}
//                 >
//                   {item.title}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Actions Section: Theme Toggle & Cart */}
//         <div className="flex items-center gap-3">
          
         

//           {/* Cart Tooltip */}
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <button
//                 onClick={() => router.push("/cart")}
//                 className={`p-2 rounded-2xl border transition-all hover:scale-105 active:scale-95 cursor-pointer ${
//                   isDark 
//                     ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800' 
//                     : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
//                 }`}
//               >
//                 <i className="fa-solid fa-cart-arrow-down text-lg"></i>
//               </button>
//             </TooltipTrigger>
//             <TooltipContent>
//               <span className="font-semibold text-xs">View Cart</span>
//             </TooltipContent>
//           </Tooltip>

//         </div>
//       </div>
//     </header>
//   );
// }






'use client';

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useRef, useEffect } from "react";

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [liveResults, setLiveResults] = useState<any[]>([]);
  const [isDark, setIsDark] = useState(true);

  const mobileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const nextTheme = !prev;
      localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
      window.dispatchEvent(new Event('storage'));
      return nextTheme;
    });
  };

  useEffect(() => {
    mobileRefs.current = mobileRefs.current.slice(0, liveResults.length);
    desktopRefs.current = desktopRefs.current.slice(0, liveResults.length);
  }, [liveResults]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
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

  const handleDropdownKeyDown = (
    e: React.KeyboardEvent,
    index: number,
    item: any,
    refArray: React.MutableRefObject<(HTMLDivElement | null)[]>
  ) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (index + 1 < liveResults.length) {
        refArray.current[index + 1]?.focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index - 1 >= 0) {
        refArray.current[index - 1]?.focus();
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      router.push(`/features/product/${item.id}`);
      setLiveResults([]);
      setSearchQuery("");
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent, refArray: React.MutableRefObject<(HTMLDivElement | null)[]>) => {
    if (e.key === 'ArrowDown' && liveResults.length > 0) {
      e.preventDefault();
      refArray.current[0]?.focus();
    }
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${
      isDark ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-white/80 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 relative">

        {/* Brand & Home */}
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-2 text-2xl font-black tracking-tight cursor-pointer group"
            onClick={() => router.push("/")}
          >
            <i className="fa-solid fa-bag-shopping text-indigo-500 group-hover:scale-110 transition-transform"></i>
            <span className={isDark ? "bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent" : "text-slate-900"}>
              SHOP
            </span>
          </div>

          <Button 
            variant="ghost" 
            onClick={() => router.push("/")}
            className={`hidden sm:flex text-xs font-semibold rounded-2xl transition-all ${
              isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            Home
          </Button>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden flex-1 relative">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              className={`w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 ${
                isDark 
                  ? 'bg-slate-900/80 border-slate-800 text-slate-200 placeholder-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
              }`}
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleLiveSearch(e.target.value)}
              onKeyDown={(e) => handleInputKeyDown(e, mobileRefs)}
            />
            <Button type="submit" size="icon" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0">
              <i className="fa-solid fa-search text-xs"></i>
            </Button>
          </form>

          {liveResults.length > 0 && (
            <div className={`absolute left-0 right-0 shadow-2xl mt-2 max-h-60 overflow-y-auto border rounded-2xl z-50 backdrop-blur-xl ${
              isDark ? 'bg-slate-900/95 border-slate-800 text-slate-200' : 'bg-white/95 border-slate-200 text-slate-800'
            }`}>
              {liveResults.map((item: any, idx: number) => (
                <div
                  key={item.id}
                  ref={(el) => { mobileRefs.current[idx] = el; }}
                  tabIndex={0}
                  role="button"
                  className={`p-3 text-xs font-medium cursor-pointer transition-colors ${
                    isDark 
                      ? 'hover:bg-indigo-600/20 focus:bg-indigo-600/30 text-slate-200' 
                      : 'hover:bg-indigo-50 focus:bg-indigo-100 text-slate-800'
                  }`}
                  onClick={() => {
                    router.push(`/features/product/${item.id}`);
                    setLiveResults([]);
                    setSearchQuery("");
                  }}
                  onKeyDown={(e) => handleDropdownKeyDown(e, idx, item, mobileRefs)}
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Search Input */}
        <div className="hidden md:flex gap-2 flex-1 max-w-md mx-4 relative">
          <form onSubmit={handleSearch} className="flex w-full gap-2">
            <Input
              className={`w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 ${
                isDark 
                  ? 'bg-slate-900/80 border-slate-800 text-slate-200 placeholder-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
              }`}
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleLiveSearch(e.target.value)} 
              onKeyDown={(e) => handleInputKeyDown(e, desktopRefs)}
            />
            <Button type="submit" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-5">
              Search
            </Button>
          </form>

          {liveResults.length > 0 && (
            <div className={`absolute top-full left-0 right-0 shadow-2xl mt-2 border rounded-2xl z-50 max-h-60 overflow-y-auto backdrop-blur-xl ${
              isDark ? 'bg-slate-900/95 border-slate-800 text-slate-200' : 'bg-white/95 border-slate-200 text-slate-800'
            }`}>
              {liveResults.map((item: any, idx: number) => (
                <div
                  key={item.id}
                  ref={(el) => { desktopRefs.current[idx] = el; }}
                  tabIndex={0}
                  role="button"
                  className={`p-3 text-xs font-medium cursor-pointer transition-colors ${
                    isDark 
                      ? 'hover:bg-indigo-600/20 focus:bg-indigo-600/30 text-slate-200' 
                      : 'hover:bg-indigo-50 focus:bg-indigo-100 text-slate-800'
                  }`}
                  onClick={() => {
                    router.push(`/features/product/${item.id}`);
                    setLiveResults([]);
                    setSearchQuery("");
                  }}
                  onKeyDown={(e) => handleDropdownKeyDown(e, idx, item, desktopRefs)}
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions Section: Theme Toggle & Cart */}
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => router.push("/cart")}
                className={`p-2 rounded-2xl border transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <i className="fa-solid fa-cart-arrow-down text-lg"></i>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-semibold text-xs">View Cart</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}