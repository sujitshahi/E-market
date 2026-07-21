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

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//       setIsDark(savedTheme === 'dark');
//     }
//   }, []);

//   const toggleTheme = () => {
//     setIsDark((prev) => {
//       const nextTheme = !prev;
//       localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
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
//   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

//   const searchItemRefs = useRef<(HTMLDivElement | null)[]>([]);




//   useEffect(() => {
//     searchItemRefs.current = searchItemRefs.current.slice(0, liveResults.length);
//   }, [liveResults]);

//   const handleSearch = (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
    
//     if (searchQuery.trim()) {
//       router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//       setLiveResults([]); 
//       setIsMobileSearchOpen(false);
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
//     item: any
//   ) => {
//     if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       if (index + 1 < liveResults.length) {
//         searchItemRefs.current[index + 1]?.focus();
//       }
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       if (index - 1 >= 0) {
//         searchItemRefs.current[index - 1]?.focus();
//       }
//     } else if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       router.push(`/features/product/${item.id}`);
//       setLiveResults([]);
//       setSearchQuery("");
//       setIsMobileSearchOpen(false);
//     }
//   };

//   const handleInputKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'ArrowDown' && liveResults.length > 0) {
//       e.preventDefault();
//       searchItemRefs.current[0]?.focus();
//     }
//   };

//   return (
//     <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${
//       isDark ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-white/80 border-slate-200 text-slate-900'
//     }`}>
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 sm:gap-4 relative">

        
//         <div className="flex items-center gap-2 sm:gap-4 shrink-0">
//           <div 
//             className="flex items-center gap-2 text-xl sm:text-2xl font-black tracking-tight cursor-pointer group"
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
//             className={`hidden sm:flex text-xs font-semibold cursor-pointer rounded-2xl transition-all ${
//               isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
//             }`}
//           >
//             Home
//           </Button>
//         </div>


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
//               onKeyDown={handleInputKeyDown}
//             />
//             <Button type="submit" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-5 cursor-pointer">
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
//                   ref={(el) => { searchItemRefs.current[idx] = el; }}
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
//                   onKeyDown={(e) => handleDropdownKeyDown(e, idx, item)}
//                 >
//                   {item.title}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

        
//         <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
        
//           <button
//             onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
//             className={`md:hidden p-2 rounded-2xl border transition-all cursor-pointer ${
//               isDark 
//                 ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800' 
//                 : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
//             }`}
//             aria-label="Toggle search bar"
//           >
//             <i className={`fa-solid ${isMobileSearchOpen ? 'fa-xmark' : 'fa-magnifying-glass'} text-sm`}></i>
//           </button>

          
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
//                 <i className="fa-solid fa-cart-arrow-down text-sm sm:text-base"></i>
//               </button>
//             </TooltipTrigger>
//             <TooltipContent>
//               <span className="font-semibold text-xs">View Cart</span>
//             </TooltipContent>
//           </Tooltip>
//         </div>
//       </div>

      
//       {isMobileSearchOpen && (
//         <div className="md:hidden px-4 pb-3 border-t border-slate-800/20 pt-3 relative">
//           <form onSubmit={handleSearch} className="flex gap-2">
//             <Input
//               className={`w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 ${
//                 isDark 
//                   ? 'bg-slate-900/80 border-slate-800 text-slate-200 placeholder-slate-500' 
//                   : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
//               }`}
//               type="search"
//               placeholder="Search products..."
//               value={searchQuery}
//               autoFocus
//               onChange={(e) => handleLiveSearch(e.target.value)}
//               onKeyDown={handleInputKeyDown}
//             />
//             <Button type="submit" size="icon" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0">
//               <i className="fa-solid fa-search text-xs"></i>
//             </Button>
//           </form>

          
//           {liveResults.length > 0 && (
//             <div className={`absolute left-4 right-4 shadow-2xl mt-2 max-h-60 overflow-y-auto border rounded-2xl z-50 backdrop-blur-xl ${
//               isDark ? 'bg-slate-900/95 border-slate-800 text-slate-200' : 'bg-white/95 border-slate-200 text-slate-800'
//             }`}>
//               {liveResults.map((item: any, idx: number) => (
//                 <div
//                   key={item.id}
//                   ref={(el) => { searchItemRefs.current[idx] = el; }}
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
//                     setIsMobileSearchOpen(false);
//                   }}
//                   onKeyDown={(e) => handleDropdownKeyDown(e, idx, item)}
//                 >
//                   {item.title}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
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
//   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

//   const searchItemRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     searchItemRefs.current = searchItemRefs.current.slice(0, liveResults.length);
//   }, [liveResults]);

//   const handleSearch = (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
    
//     if (searchQuery.trim()) {
//       router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//       setLiveResults([]); 
//       setIsMobileSearchOpen(false);
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
//     item: any
//   ) => {
//     if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       if (index + 1 < liveResults.length) {
//         searchItemRefs.current[index + 1]?.focus();
//       }
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       if (index - 1 >= 0) {
//         searchItemRefs.current[index - 1]?.focus();
//       }
//     } else if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       router.push(`/features/product/${item.id}`);
//       setLiveResults([]);
//       setSearchQuery("");
//       setIsMobileSearchOpen(false);
//     }
//   };

//   const handleInputKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'ArrowDown' && liveResults.length > 0) {
//       e.preventDefault();
//       searchItemRefs.current[0]?.focus();
//     }
//   };

//   return (
//     <header className="sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 bg-slate-900 border-slate-200">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 sm:gap-4 relative">
//         <div className="flex items-center gap-2 sm:gap-4 shrink-0">
//           <div 
//             className="flex items-center gap-2 text-xl sm:text-2xl font-black tracking-tight group"
//           >
//             <i className="fa-solid fa-bag-shopping text-indigo-500 transition-transform"></i>
//             <span className="text-white">
//               SHOP
//             </span>
//           </div>

//           <Button 
//             onClick={() => router.push("/")}
//             className="hidden sm:flex text-xs font-semibold cursor-pointer rounded-2xl transition-all hover:bg-slate-100 text-white hover:text-slate-700"
//           >
//             Home
//           </Button>
//         </div>

//         <div className="hidden md:flex gap-2 flex-1 max-w-md mx-4 relative">
//           <form onSubmit={handleSearch} className="flex w-full gap-2">
//             <Input
//               className="w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
//               type="search"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => handleLiveSearch(e.target.value)} 
//               onKeyDown={handleInputKeyDown}
//             />
//             <Button type="submit" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-5 cursor-pointer">
//               Search
//             </Button>
//           </form>

//           {liveResults.length > 0 && (
//             <div className="absolute top-full left-0 right-0 shadow-2xl mt-2 border rounded-2xl z-50 max-h-60 overflow-y-auto backdrop-blur-xl bg-white/95 border-slate-200 text-slate-800">
//               {liveResults.map((item: any, idx: number) => (
//                 <div
//                   key={item.id}
//                   ref={(el) => { searchItemRefs.current[idx] = el; }}
//                   tabIndex={0}
//                   role="button"
//                   className="p-3 text-xs font-medium cursor-pointer transition-colors hover:bg-indigo-50 focus:bg-indigo-100 text-slate-800"
//                   onClick={() => {
//                     router.push(`/features/product/${item.id}`);
//                     setLiveResults([]);
//                     setSearchQuery("");
//                   }}
//                   onKeyDown={(e) => handleDropdownKeyDown(e, idx, item)}
//                 >
//                   {item.title}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="flex items-center gap-2 sm:gap-3 shrink-0">
//           <button
//             onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
//             className="md:hidden p-2 rounded-2xl border transition-all cursor-pointer bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
//             aria-label="Toggle search bar"
//           >
//             <i className={`fa-solid ${isMobileSearchOpen ? 'fa-xmark' : 'fa-magnifying-glass'} text-sm`}></i>
//           </button>

//           <Tooltip>
//             <TooltipTrigger asChild>
//               <button
//                 onClick={() => router.push("/cart")}
//                 className="p-2 rounded-2xl border transition-all hover:scale-105 active:scale-95 cursor-pointer bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
//               >
//                 <i className="fa-solid fa-cart-arrow-down text-sm sm:text-base"></i>
//               </button>
//             </TooltipTrigger>
//             <TooltipContent>
//               <span className="font-semibold text-xs">View Cart</span>
//             </TooltipContent>
//           </Tooltip>
//         </div>
//       </div>

//       {isMobileSearchOpen && (
//         <div className="md:hidden px-4 pb-3 border-t border-slate-200/60 pt-3 relative">
//           <form onSubmit={handleSearch} className="flex gap-2">
//             <Input
//               className="w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
//               type="search"
//               placeholder="Search products..."
//               value={searchQuery}
//               autoFocus
//               onChange={(e) => handleLiveSearch(e.target.value)}
//               onKeyDown={handleInputKeyDown}
//             />
//             <Button type="submit" size="icon" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0">
//               <i className="fa-solid fa-search text-xs"></i>
//             </Button>
//           </form>

//           {liveResults.length > 0 && (
//             <div className="absolute left-4 right-4 shadow-2xl mt-2 max-h-60 overflow-y-auto border rounded-2xl z-50 backdrop-blur-xl bg-white/95 border-slate-200 text-slate-800">
//               {liveResults.map((item: any, idx: number) => (
//                 <div
//                   key={item.id}
//                   ref={(el) => { searchItemRefs.current[idx] = el; }}
//                   tabIndex={0}
//                   role="button"
//                   className="p-3 text-xs font-medium cursor-pointer transition-colors hover:bg-indigo-50 focus:bg-indigo-100 text-slate-800"
//                   onClick={() => {
//                     router.push(`/features/product/${item.id}`);
//                     setLiveResults([]);
//                     setSearchQuery("");
//                     setIsMobileSearchOpen(false);
//                   }}
//                   onKeyDown={(e) => handleDropdownKeyDown(e, idx, item)}
//                 >
//                   {item.title}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
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
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { useState, useRef, useEffect } from "react";

// // Define a proper interface for Search Products
// interface Product {
//   id: number;
//   title: string;
// }

// export function Header() {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [liveResults, setLiveResults] = useState<Product[]>([]);
//   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

//   const searchItemRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const desktopSearchRef = useRef<HTMLDivElement>(null);
//   const mobileSearchRef = useRef<HTMLDivElement>(null);

//   // Keep refs synchronized with live results
//   useEffect(() => {
//     searchItemRefs.current = searchItemRefs.current.slice(0, liveResults.length);
//   }, [liveResults]);

//   // 1. Debounced Search API call (Fires 300ms after user stops typing)
//   useEffect(() => {
//     const trimmedQuery = searchQuery.trim();

//     if (!trimmedQuery) {
//       setLiveResults([]);
//       return;
//     }

//     const timer = setTimeout(async () => {
//       try {
//         const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(trimmedQuery)}`);
//         const data = await res.json();
//         setLiveResults(data.products || []);
//       } catch (err) {
//         console.error("Search failed:", err);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   // 2. Click Outside Handler to dismiss dropdown results
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as Node;
//       const clickedDesktop = desktopSearchRef.current?.contains(target);
//       const clickedMobile = mobileSearchRef.current?.contains(target);

//       if (!clickedDesktop && !clickedMobile) {
//         setLiveResults([]);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSearch = (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
    
//     if (searchQuery.trim()) {
//       router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//       setLiveResults([]); 
//       setIsMobileSearchOpen(false);
//     }
//   };

//   const handleDropdownKeyDown = (
//     e: React.KeyboardEvent,
//     index: number,
//     item: Product
//   ) => {
//     if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       if (index + 1 < liveResults.length) {
//         searchItemRefs.current[index + 1]?.focus();
//       }
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       if (index - 1 >= 0) {
//         searchItemRefs.current[index - 1]?.focus();
//       }
//     } else if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       router.push(`/features/product/${item.id}`);
//       setLiveResults([]);
//       setSearchQuery("");
//       setIsMobileSearchOpen(false);
//     }
//   };

//   const handleInputKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'ArrowDown' && liveResults.length > 0) {
//       e.preventDefault();
//       searchItemRefs.current[0]?.focus();
//     }
//   };

//   return (
//     <header className="sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 bg-slate-900 border-slate-200">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 sm:gap-4 relative">
        
//         {/* Brand / Logo & Navigation */}
//         <div className="flex items-center gap-2 sm:gap-4 shrink-0">
//           <div className="flex items-center gap-2 text-xl sm:text-2xl font-black tracking-tight group cursor-pointer" onClick={() => router.push("/")}>
//             <i className="fa-solid fa-bag-shopping text-indigo-500 transition-transform"></i>
//             <span className="text-white">SHOP</span>
//           </div>

//           <Button 
//             onClick={() => router.push("/")}
//             className="hidden sm:flex text-xs font-semibold cursor-pointer rounded-2xl transition-all hover:bg-slate-100 text-white hover:text-slate-700"
//           >
//             Home
//           </Button>
//         </div>

//         {/* Desktop Search Section */}
//         <div ref={desktopSearchRef} className="hidden md:flex gap-2 flex-1 max-w-md mx-4 relative">
//           <form onSubmit={handleSearch} className="flex w-full gap-2">
//             <Input
//               className="w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
//               type="search"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)} 
//               onKeyDown={handleInputKeyDown}
//             />
//             <Button type="submit" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-5 cursor-pointer">
//               Search
//             </Button>
//           </form>

//           {liveResults.length > 0 && (
//             <div className="absolute top-full left-0 right-0 shadow-2xl mt-2 border rounded-2xl z-50 max-h-60 overflow-y-auto backdrop-blur-xl bg-white/95 border-slate-200 text-slate-800">
//               {liveResults.map((item, idx) => (
//                 <div
//                   key={item.id}
//                   ref={(el) => { searchItemRefs.current[idx] = el; }}
//                   tabIndex={0}
//                   role="button"
//                   className="p-3 text-xs font-medium cursor-pointer transition-colors hover:bg-indigo-50 focus:bg-indigo-100 text-slate-800"
//                   onClick={() => {
//                     router.push(`/features/product/${item.id}`);
//                     setLiveResults([]);
//                     setSearchQuery("");
//                   }}
//                   onKeyDown={(e) => handleDropdownKeyDown(e, idx, item)}
//                 >
//                   {item.title}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Action Controls & Mobile Toggle */}
//         <div className="flex items-center gap-2 sm:gap-3 shrink-0">
//           <button
//             onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
//             className="md:hidden p-2 rounded-2xl border transition-all cursor-pointer bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
//             aria-label="Toggle search bar"
//           >
//             <i className={`fa-solid ${isMobileSearchOpen ? 'fa-xmark' : 'fa-magnifying-glass'} text-sm`}></i>
//           </button>

//           {/* Cart Tooltip wrapped in TooltipProvider */}
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <button
//                   onClick={() => router.push("/cart")}
//                   className="p-2 rounded-2xl border transition-all hover:scale-105 active:scale-95 cursor-pointer bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
//                 >
//                   <i className="fa-solid fa-cart-arrow-down text-sm sm:text-base"></i>
//                 </button>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <span className="font-semibold text-xs">View Cart</span>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       </div>

//       {/* Mobile Search Overlay */}
//       {isMobileSearchOpen && (
//         <div ref={mobileSearchRef} className="md:hidden px-4 pb-3 border-t border-slate-200/60 pt-3 relative">
//           <form onSubmit={handleSearch} className="flex gap-2">
//             <Input
//               className="w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
//               type="search"
//               placeholder="Search products..."
//               value={searchQuery}
//               autoFocus
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleInputKeyDown}
//             />
//             <Button type="submit" size="icon" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0">
//               <i className="fa-solid fa-search text-xs"></i>
//             </Button>
//           </form>

//           {liveResults.length > 0 && (
//             <div className="absolute left-4 right-4 shadow-2xl mt-2 max-h-60 overflow-y-auto border rounded-2xl z-50 backdrop-blur-xl bg-white/95 border-slate-200 text-slate-800">
//               {liveResults.map((item, idx) => (
//                 <div
//                   key={item.id}
//                   ref={(el) => { searchItemRefs.current[idx] = el; }}
//                   tabIndex={0}
//                   role="button"
//                   className="p-3 text-xs font-medium cursor-pointer transition-colors hover:bg-indigo-50 focus:bg-indigo-100 text-slate-800"
//                   onClick={() => {
//                     router.push(`/features/product/${item.id}`);
//                     setLiveResults([]);
//                     setSearchQuery("");
//                     setIsMobileSearchOpen(false);
//                   }}
//                   onKeyDown={(e) => handleDropdownKeyDown(e, idx, item)}
//                 >
//                   {item.title}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </header>
//   );
// }










// 'use client';

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { useState, useRef, useEffect } from "react";

// interface Product {
//   id: number;
//   title: string;
// }

// export function Header() {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [liveResults, setLiveResults] = useState<Product[]>([]);
//   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

//   const searchItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
//   const desktopSearchRef = useRef<HTMLDivElement>(null);
//   const mobileSearchRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     searchItemRefs.current = searchItemRefs.current.slice(0, liveResults.length);
//   }, [liveResults]);

//   // Debounced Search
//   useEffect(() => {
//     const trimmedQuery = searchQuery.trim();

//     if (!trimmedQuery) {
//       setLiveResults([]);
//       return;
//     }

//     const timer = setTimeout(async () => {
//       try {
//         const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(trimmedQuery)}`);
//         const data = await res.json();
//         setLiveResults(data.products || []);
//       } catch (err) {
//         console.error("Search failed:", err);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   // Dismiss on click outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as Node;
//       const clickedDesktop = desktopSearchRef.current?.contains(target);
//       const clickedMobile = mobileSearchRef.current?.contains(target);

//       if (!clickedDesktop && !clickedMobile) {
//         setLiveResults([]);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Programmatic navigation on form submit (Keep router.push here)
//   const handleSearch = (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
    
//     if (searchQuery.trim()) {
//       router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//       setLiveResults([]); 
//       setIsMobileSearchOpen(false);
//     }
//   };

//   const handleDropdownKeyDown = (
//     e: React.KeyboardEvent,
//     index: number,
//     item: Product
//   ) => {
//     if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       if (index + 1 < liveResults.length) {
//         searchItemRefs.current[index + 1]?.focus();
//       }
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       if (index - 1 >= 0) {
//         searchItemRefs.current[index - 1]?.focus();
//       }
//     } else if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       router.push(`/features/product/${item.id}`);
//       setLiveResults([]);
//       setSearchQuery("");
//       setIsMobileSearchOpen(false);
//     }
//   };

//   const handleInputKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'ArrowDown' && liveResults.length > 0) {
//       e.preventDefault();
//       searchItemRefs.current[0]?.focus();
//     }
//   };

//   return (
//     <header className="sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 bg-slate-900 border-slate-200">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 sm:gap-4 relative">
        
//         {/* Brand / Logo & Navigation */}
//         <div className="flex items-center gap-2 sm:gap-4 shrink-0">
//           <Link 
//             href="/" 
//             className="flex items-center gap-2 text-xl sm:text-2xl font-black tracking-tight group cursor-pointer"
//           >
//             <i className="fa-solid fa-bag-shopping text-indigo-500 transition-transform"></i>
//             <span className="text-white">SHOP</span>
//           </Link>

//           <Button 
//             asChild
//             className="hidden sm:flex text-xs font-semibold cursor-pointer rounded-2xl transition-all hover:bg-slate-100 text-white hover:text-slate-700"
//           >
//             <Link href="/">Home</Link>
//           </Button>
//         </div>

//         {/* Desktop Search Section */}
//         <div ref={desktopSearchRef} className="hidden md:flex gap-2 flex-1 max-w-md mx-4 relative">
//           <form onSubmit={handleSearch} className="flex w-full gap-2">
//             <Input
//               className="w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
//               type="search"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)} 
//               onKeyDown={handleInputKeyDown}
//             />
//             <Button type="submit" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-5 cursor-pointer">
//               Search
//             </Button>
//           </form>

//           {liveResults.length > 0 && (
//             <div className="absolute top-full left-0 right-0 shadow-2xl mt-2 border rounded-2xl z-50 max-h-60 overflow-y-auto backdrop-blur-xl bg-white/95 border-slate-200 text-slate-800">
//               {liveResults.map((item, idx) => (
//                 <Link
//                   key={item.id}
//                   href={`/features/product/${item.id}`}
//                   ref={(el) => { searchItemRefs.current[idx] = el; }}
//                   tabIndex={0}
//                   className="block p-3 text-xs font-medium cursor-pointer transition-colors hover:bg-indigo-50 focus:bg-indigo-100 text-slate-800"
//                   onClick={() => {
//                     setLiveResults([]);
//                     setSearchQuery("");
//                   }}
//                   onKeyDown={(e) => handleDropdownKeyDown(e, idx, item)}
//                 >
//                   {item.title}
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Action Controls & Mobile Toggle */}
//         <div className="flex items-center gap-2 sm:gap-3 shrink-0">
//           <button
//             onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
//             className="md:hidden p-2 rounded-2xl border transition-all cursor-pointer bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
//             aria-label="Toggle search bar"
//           >
//             <i className={`fa-solid ${isMobileSearchOpen ? 'fa-xmark' : 'fa-magnifying-glass'} text-sm`}></i>
//           </button>

//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Link
//                   href="/cart"
//                   className="p-2 rounded-2xl border transition-all hover:scale-105 active:scale-95 cursor-pointer bg-white border-slate-200 text-slate-700 hover:bg-slate-100 inline-flex items-center justify-center"
//                 >
//                   <i className="fa-solid fa-cart-arrow-down text-sm sm:text-base"></i>
//                 </Link>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <span className="font-semibold text-xs">View Cart</span>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       </div>

//       {/* Mobile Search Overlay */}
//       {isMobileSearchOpen && (
//         <div ref={mobileSearchRef} className="md:hidden px-4 pb-3 border-t border-slate-200/60 pt-3 relative">
//           <form onSubmit={handleSearch} className="flex gap-2">
//             <Input
//               className="w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
//               type="search"
//               placeholder="Search products..."
//               value={searchQuery}
//               autoFocus
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleInputKeyDown}
//             />
//             <Button type="submit" size="icon" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0">
//               <i className="fa-solid fa-search text-xs"></i>
//             </Button>
//           </form>

//           {liveResults.length > 0 && (
//             <div className="absolute left-4 right-4 shadow-2xl mt-2 max-h-60 overflow-y-auto border rounded-2xl z-50 backdrop-blur-xl bg-white/95 border-slate-200 text-slate-800">
//               {liveResults.map((item, idx) => (
//                 <Link
//                   key={item.id}
//                   href={`/features/product/${item.id}`}
//                   ref={(el) => { searchItemRefs.current[idx] = el; }}
//                   tabIndex={0}
//                   className="block p-3 text-xs font-medium cursor-pointer transition-colors hover:bg-indigo-50 focus:bg-indigo-100 text-slate-800"
//                   onClick={() => {
//                     setLiveResults([]);
//                     setSearchQuery("");
//                     setIsMobileSearchOpen(false);
//                   }}
//                   onKeyDown={(e) => handleDropdownKeyDown(e, idx, item)}
//                 >
//                   {item.title}
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </header>
//   );
// }














// 'use client';

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { useState, useRef, useEffect } from "react";

// interface Product {
//   id: number;
//   title: string;
// }

// // Helper to highlight matching text in search results
// function HighlightText({ text, query }: { text: string; query: string }) {
//   if (!query.trim()) return <>{text}</>;

//   const parts = text.split(new RegExp(`(${query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi'));

//   return (
//     <>
//       {parts.map((part, i) =>
//         part.toLowerCase() === query.toLowerCase() ? (
//           <mark key={i} className="bg-indigo-100 text-indigo-900 font-bold rounded px-0.5">
//             {part}
//           </mark>
//         ) : (
//           part
//         )
//       )}
//     </>
//   );
// }

// export function Header() {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [liveResults, setLiveResults] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

//   const searchItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
//   const desktopSearchRef = useRef<HTMLDivElement>(null);
//   const mobileSearchRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     searchItemRefs.current = searchItemRefs.current.slice(0, liveResults.length);
//   }, [liveResults]);

//   // Debounced Search with AbortController, Loading State, and Limited Results
//   useEffect(() => {
//     const trimmedQuery = searchQuery.trim();

//     if (!trimmedQuery) {
//       setLiveResults([]);
//       setIsLoading(false);
//       return;
//     }

//     setIsLoading(true);
//     const controller = new AbortController();

//     const timer = setTimeout(async () => {
//       try {
//         const res = await fetch(
//           `https://dummyjson.com/products/search?q=${encodeURIComponent(trimmedQuery)}`,
//           { signal: controller.signal }
//         );
//         const data = await res.json();
        
//         // Limit results to top 6 items
//         const limitedResults = (data.products || []).slice(0, 6);
//         setLiveResults(limitedResults);
//       } catch (err: any) {
//         if (err.name !== "AbortError") {
//           console.error("Search failed:", err);
//         }
//       } finally {
//         if (!controller.signal.aborted) {
//           setIsLoading(false);
//         }
//       }
//     }, 300);

//     return () => {
//       clearTimeout(timer);
//       controller.abort();
//     };
//   }, [searchQuery]);

//   // Handle Escape key & Click Outside to close dropdown
//   useEffect(() => {
//     const handleClickOutsideOrEscape = (event: MouseEvent | KeyboardEvent) => {
//       if (event instanceof KeyboardEvent && event.key === "Escape") {
//         setLiveResults([]);
//         return;
//       }

//       if (event instanceof MouseEvent) {
//         const target = event.target as Node;
//         const clickedDesktop = desktopSearchRef.current?.contains(target);
//         const clickedMobile = mobileSearchRef.current?.contains(target);

//         if (!clickedDesktop && !clickedMobile) {
//           setLiveResults([]);
//         }
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutsideOrEscape);
//     document.addEventListener("keydown", handleClickOutsideOrEscape);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutsideOrEscape);
//       document.removeEventListener("keydown", handleClickOutsideOrEscape);
//     };
//   }, []);

//   const closeDropdown = () => {
//     setLiveResults([]);
//     setSearchQuery("");
//     setIsMobileSearchOpen(false);
//   };

//   const handleSearch = (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
    
//     if (searchQuery.trim()) {
//       router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//       closeDropdown();
//     }
//   };

//   const handleDropdownKeyDown = (
//     e: React.KeyboardEvent<HTMLAnchorElement>,
//     index: number,
//     item: Product
//   ) => {
//     if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       if (index + 1 < liveResults.length) {
//         searchItemRefs.current[index + 1]?.focus();
//       }
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       if (index - 1 >= 0) {
//         searchItemRefs.current[index - 1]?.focus();
//       }
//     } else if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       router.push(`/features/product/${item.id}`);
//       closeDropdown();
//     }
//   };

//   const handleInputKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'ArrowDown' && liveResults.length > 0) {
//       e.preventDefault();
//       searchItemRefs.current[0]?.focus();
//     }
//   };

//   const showDropdown = searchQuery.trim().length > 0;

//   return (
//     <header className="sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 bg-slate-900 border-slate-200">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 sm:gap-4 relative">
        
//         {/* Brand / Logo */}
//         <div className="flex items-center gap-2 sm:gap-4 shrink-0">
//           <Link 
//             href="/" 
//             className="flex items-center gap-2 text-xl sm:text-2xl font-black tracking-tight group cursor-pointer"
//           >
//             <i className="fa-solid fa-bag-shopping text-indigo-500 transition-transform"></i>
//             <span className="text-white">SHOP</span>
//           </Link>

//           <Button 
//             asChild
//             className="hidden sm:flex text-xs font-semibold cursor-pointer rounded-2xl transition-all hover:bg-slate-100 text-white hover:text-slate-700"
//           >
//             <Link href="/">Home</Link>
//           </Button>
//         </div>

//         {/* Desktop Search Section */}
//         <div ref={desktopSearchRef} className="hidden md:flex gap-2 flex-1 max-w-md mx-4 relative">
//           <form onSubmit={handleSearch} className="flex w-full gap-2">
//             <Input
//               className="w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
//               type="search"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)} 
//               onKeyDown={handleInputKeyDown}
//             />
//             <Button type="submit" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-5 cursor-pointer">
//               Search
//             </Button>
//           </form>

//           {/* Search Dropdown Overlay */}
//           {showDropdown && (
//             <div className="absolute top-full left-0 right-0 shadow-2xl mt-2 border rounded-2xl z-50 max-h-60 overflow-y-auto backdrop-blur-xl bg-white/95 border-slate-200 text-slate-800">
//               {isLoading ? (
//                 <div className="p-4 text-xs text-slate-500 text-center flex items-center justify-center gap-2">
//                   <i className="fa-solid fa-circle-notch animate-spin text-indigo-600"></i>
//                   Searching...
//                 </div>
//               ) : liveResults.length > 0 ? (
//                 liveResults.map((item, idx) => (
//                   <Link
//                     key={item.id}
//                     href={`/features/product/${item.id}`}
//                     ref={(el) => { searchItemRefs.current[idx] = el; }}
//                     tabIndex={0}
//                     className="block p-3 text-xs font-medium cursor-pointer transition-colors hover:bg-indigo-50 focus:bg-indigo-100 text-slate-800"
//                     onClick={closeDropdown}
//                     onKeyDown={(e) => handleDropdownKeyDown(e, idx, item)}
//                   >
//                     <HighlightText text={item.title} query={searchQuery} />
//                   </Link>
//                 ))
//               ) : (
//                 <div className="p-4 text-xs text-slate-400 text-center">
//                   No products found for "<span className="font-semibold">{searchQuery}</span>"
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Actions & Mobile Toggle */}
//         <div className="flex items-center gap-2 sm:gap-3 shrink-0">
//           <button
//             onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
//             className="md:hidden p-2 rounded-2xl border transition-all cursor-pointer bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
//             aria-label="Toggle search bar"
//           >
//             <i className={`fa-solid ${isMobileSearchOpen ? 'fa-xmark' : 'fa-magnifying-glass'} text-sm`}></i>
//           </button>

//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Link
//                   href="/cart"
//                   className="p-2 rounded-2xl border transition-all hover:scale-105 active:scale-95 cursor-pointer bg-white border-slate-200 text-slate-700 hover:bg-slate-100 inline-flex items-center justify-center"
//                 >
//                   <i className="fa-solid fa-cart-arrow-down text-sm sm:text-base"></i>
//                 </Link>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <span className="font-semibold text-xs">View Cart</span>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       </div>

//       {/* Mobile Search Overlay */}
//       {isMobileSearchOpen && (
//         <div ref={mobileSearchRef} className="md:hidden px-4 pb-3 border-t border-slate-200/60 pt-3 relative">
//           <form onSubmit={handleSearch} className="flex gap-2">
//             <Input
//               className="w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
//               type="search"
//               placeholder="Search products..."
//               value={searchQuery}
//               autoFocus
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleInputKeyDown}
//             />
//             <Button type="submit" size="icon" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0">
//               <i className="fa-solid fa-search text-xs"></i>
//             </Button>
//           </form>

//           {showDropdown && (
//             <div className="absolute left-4 right-4 shadow-2xl mt-2 max-h-60 overflow-y-auto border rounded-2xl z-50 backdrop-blur-xl bg-white/95 border-slate-200 text-slate-800">
//               {isLoading ? (
//                 <div className="p-4 text-xs text-slate-500 text-center flex items-center justify-center gap-2">
//                   <i className="fa-solid fa-circle-notch animate-spin text-indigo-600"></i>
//                   Searching...
//                 </div>
//               ) : liveResults.length > 0 ? (
//                 liveResults.map((item, idx) => (
//                   <Link
//                     key={item.id}
//                     href={`/features/product/${item.id}`}
//                     ref={(el) => { searchItemRefs.current[idx] = el; }}
//                     tabIndex={0}
//                     className="block p-3 text-xs font-medium cursor-pointer transition-colors hover:bg-indigo-50 focus:bg-indigo-100 text-slate-800"
//                     onClick={closeDropdown}
//                     onKeyDown={(e) => handleDropdownKeyDown(e, idx, item)}
//                   >
//                     <HighlightText text={item.title} query={searchQuery} />
//                   </Link>
//                 ))
//               ) : (
//                 <div className="p-4 text-xs text-slate-400 text-center">
//                   No products found for "<span className="font-semibold">{searchQuery}</span>"
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </header>
//   );
// }













// 'use client';

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { useState, useRef, useEffect, memo } from "react";

// interface Product {
//   id: number;
//   title: string;
// }

// // 1. Memoized Highlight component to prevent unnecessary regex re-compiles
// const HighlightText = memo(function HighlightText({ text, query }: { text: string; query: string }) {
//   if (!query.trim()) return <>{text}</>;

//   const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
//   const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));

//   return (
//     <>
//       {parts.map((part, i) =>
//         part.toLowerCase() === query.toLowerCase() ? (
//           <mark key={i} className="bg-indigo-100 text-indigo-900 font-bold rounded px-0.5">
//             {part}
//           </mark>
//         ) : (
//           part
//         )
//       )}
//     </>
//   );
// });

// // 2. Reusable Dropdown Component to keep JSX DRY
// function SearchDropdown({
//   isLoading,
//   results,
//   query,
//   searchItemRefs,
//   onClose,
//   onKeyDown,
// }: {
//   isLoading: boolean;
//   results: Product[];
//   query: string;
//   searchItemRefs: React.MutableRefObject<(HTMLAnchorElement | null)[]>;
//   onClose: () => void;
//   onKeyDown: (e: React.KeyboardEvent<HTMLAnchorElement>, idx: number, item: Product) => void;
// }) {
//   return (
//     <div className="absolute top-full left-0 right-0 shadow-2xl mt-2 border rounded-2xl z-50 max-h-60 overflow-y-auto backdrop-blur-xl bg-white/95 border-slate-200 text-slate-800">
//       {isLoading ? (
//         <div className="p-4 text-xs text-slate-500 text-center flex items-center justify-center gap-2">
//           <i className="fa-solid fa-circle-notch animate-spin text-indigo-600"></i>
//           Searching...
//         </div>
//       ) : results.length > 0 ? (
//         results.map((item, idx) => (
//           <Link
//             key={item.id}
//             href={`/features/product/${item.id}`}
//             ref={(el) => { searchItemRefs.current[idx] = el; }}
//             tabIndex={0}
//             className="block p-3 text-xs font-medium cursor-pointer transition-colors hover:bg-indigo-50 focus:bg-indigo-100 text-slate-800"
//             onClick={onClose}
//             onKeyDown={(e) => onKeyDown(e, idx, item)}
//           >
//             <HighlightText text={item.title} query={query} />
//           </Link>
//         ))
//       ) : (
//         <div className="p-4 text-xs text-slate-400 text-center">
//           No products found for "<span className="font-semibold">{query}</span>"
//         </div>
//       )}
//     </div>
//   );
// }

// export function Header() {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [liveResults, setLiveResults] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

//   const searchItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
//   const desktopSearchRef = useRef<HTMLDivElement>(null);
//   const mobileSearchRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     searchItemRefs.current = searchItemRefs.current.slice(0, liveResults.length);
//   }, [liveResults]);

//   // Fetch logic with AbortController
//   useEffect(() => {
//     const trimmedQuery = searchQuery.trim();

//     if (!trimmedQuery) {
//       setLiveResults([]);
//       setIsLoading(false);
//       return;
//     }

//     setIsLoading(true);
//     const controller = new AbortController();

//     const timer = setTimeout(async () => {
//       try {
//         const res = await fetch(
//           `https://dummyjson.com/products/search?q=${encodeURIComponent(trimmedQuery)}`,
//           { signal: controller.signal }
//         );
//         const data = await res.json();
//         setLiveResults((data.products || []).slice(0, 6));
//       } catch (err: any) {
//         if (err.name !== "AbortError") console.error("Search failed:", err);
//       } finally {
//         if (!controller.signal.aborted) setIsLoading(false);
//       }
//     }, 300);

//     return () => {
//       clearTimeout(timer);
//       controller.abort();
//     };
//   }, [searchQuery]);

//   // Click outside & Escape listeners
//   useEffect(() => {
//     const handleClickOutsideOrEscape = (event: MouseEvent | KeyboardEvent) => {
//       if (event instanceof KeyboardEvent && event.key === "Escape") {
//         setLiveResults([]);
//         return;
//       }

//       if (event instanceof MouseEvent) {
//         const target = event.target as Node;
//         const clickedDesktop = desktopSearchRef.current?.contains(target);
//         const clickedMobile = mobileSearchRef.current?.contains(target);

//         if (!clickedDesktop && !clickedMobile) setLiveResults([]);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutsideOrEscape);
//     document.addEventListener("keydown", handleClickOutsideOrEscape);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutsideOrEscape);
//       document.removeEventListener("keydown", handleClickOutsideOrEscape);
//     };
//   }, []);

//   const closeDropdown = () => {
//     setLiveResults([]);
//     setSearchQuery("");
//     setIsMobileSearchOpen(false);
//   };

//   const handleSearch = (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//       closeDropdown();
//     }
//   };

//   const handleDropdownKeyDown = (
//     e: React.KeyboardEvent<HTMLAnchorElement>,
//     index: number,
//     item: Product
//   ) => {
//     if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       searchItemRefs.current[index + 1]?.focus();
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       searchItemRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleInputKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'ArrowDown' && liveResults.length > 0) {
//       e.preventDefault();
//       searchItemRefs.current[0]?.focus();
//     }
//   };

//   const showDropdown = searchQuery.trim().length > 0;

//   return (
//     <header className="sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 bg-slate-900 border-slate-200">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 sm:gap-4 relative">
        
//         {/* Brand / Logo */}
//         <div className="flex items-center gap-2 sm:gap-4 shrink-0">
//           <Link 
//             href="/" 
//             className="flex items-center gap-2 text-xl sm:text-2xl font-black tracking-tight group cursor-pointer"
//           >
//             <i className="fa-solid fa-bag-shopping text-indigo-500 transition-transform"></i>
//             <span className="text-white">SHOP</span>
//           </Link>

//           <Button 
//             asChild
//             className="hidden sm:flex text-xs font-semibold cursor-pointer rounded-2xl transition-all hover:bg-slate-100 text-white hover:text-slate-700"
//           >
//             <Link href="/">Home</Link>
//           </Button>
//         </div>

//         {/* Desktop Search Section */}
//         <div ref={desktopSearchRef} className="hidden md:flex gap-2 flex-1 max-w-md mx-4 relative">
//           <form onSubmit={handleSearch} className="flex w-full gap-2">
//             <Input
//               className="w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
//               type="search"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)} 
//               onKeyDown={handleInputKeyDown}
//             />
//             <Button type="submit" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-5 cursor-pointer">
//               Search
//             </Button>
//           </form>

//           {showDropdown && (
//             <SearchDropdown
//               isLoading={isLoading}
//               results={liveResults}
//               query={searchQuery}
//               searchItemRefs={searchItemRefs}
//               onClose={closeDropdown}
//               onKeyDown={handleDropdownKeyDown}
//             />
//           )}
//         </div>

//         {/* Actions & Mobile Toggle */}
//         <div className="flex items-center gap-2 sm:gap-3 shrink-0">
//           <button
//             onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
//             className="md:hidden p-2 rounded-2xl border transition-all cursor-pointer bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
//             aria-label="Toggle search bar"
//           >
//             <i className={`fa-solid ${isMobileSearchOpen ? 'fa-xmark' : 'fa-magnifying-glass'} text-sm`}></i>
//           </button>

//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Link
//                   href="/cart"
//                   className="p-2 rounded-2xl border transition-all hover:scale-105 active:scale-95 cursor-pointer bg-white border-slate-200 text-slate-700 hover:bg-slate-100 inline-flex items-center justify-center"
//                 >
//                   <i className="fa-solid fa-cart-arrow-down text-sm sm:text-base"></i>
//                 </Link>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <span className="font-semibold text-xs">View Cart</span>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       </div>

//       {/* Mobile Search Overlay */}
//       {isMobileSearchOpen && (
//         <div ref={mobileSearchRef} className="md:hidden px-4 pb-3 border-t border-slate-200/60 pt-3 relative">
//           <form onSubmit={handleSearch} className="flex gap-2">
//             <Input
//               className="w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
//               type="search"
//               placeholder="Search products..."
//               value={searchQuery}
//               autoFocus
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleInputKeyDown}
//             />
//             <Button type="submit" size="icon" className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0">
//               <i className="fa-solid fa-search text-xs"></i>
//             </Button>
//           </form>

//           {showDropdown && (
//             <SearchDropdown
//               isLoading={isLoading}
//               results={liveResults}
//               query={searchQuery}
//               searchItemRefs={searchItemRefs}
//               onClose={closeDropdown}
//               onKeyDown={handleDropdownKeyDown}
//             />
//           )}
//         </div>
//       )}
//     </header>
//   );
// }











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
import { useState, useRef, useEffect, memo, useCallback } from "react";

interface Product {
  id: number;
  title: string;
}

// 1. Highlight Component
const HighlightText = memo(function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-indigo-100 text-indigo-900 font-bold rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
});

// 2. Reusable Dropdown Component
const SearchDropdown = memo(function SearchDropdown({
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
});

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [liveResults, setLiveResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    searchItemRefs.current = searchItemRefs.current.slice(0, liveResults.length);
  }, [liveResults]);

  // Fetch logic with Debounce & AbortController
  useEffect(() => {
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      setLiveResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setLiveResults((data.products || []).slice(0, 6));
      } catch (err: any) {
        if (err.name !== "AbortError") console.error("Search failed:", err);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery]);

  // Click outside & Escape listeners
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

  const closeDropdown = useCallback(() => {
    setLiveResults([]);
    setIsMobileSearchOpen(false);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      closeDropdown();
    }
  };

  const setItemRef = useCallback((el: HTMLAnchorElement | null, idx: number) => {
    searchItemRefs.current[idx] = el;
  }, []);

  const handleDropdownKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = (index + 1) % liveResults.length;
        searchItemRefs.current[nextIdx]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = (index - 1 + liveResults.length) % liveResults.length;
        searchItemRefs.current[prevIdx]?.focus();
      }
    },
    [liveResults.length]
  );

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
        
        {/* Brand / Logo */}
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

        {/* Desktop Search Section */}
        <div ref={desktopSearchRef} className="hidden md:flex gap-2 flex-1 max-w-md mx-4 relative">
          <form onSubmit={handleSearch} className="flex w-full gap-2">
            <Input
              className="w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
              type="search"
              role="combobox"
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

        {/* Actions & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
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

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div ref={mobileSearchRef} className="md:hidden px-4 pb-3 border-t border-slate-200/60 pt-3 relative">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              className="w-full text-xs rounded-2xl border transition-all focus:ring-1 focus:ring-indigo-500 bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
              type="search"
              role="combobox"
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