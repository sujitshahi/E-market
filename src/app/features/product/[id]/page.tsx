// 'use client';

// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { useParams, useRouter } from 'next/navigation';
// import toast from 'react-hot-toast'


// interface Product {
//   id: number;
//   title: string;
//   brand: string;
//   price: number;
//   description: string;
//   image: string;
//   thumbnail: string;
//   category?: string;
// }

// interface SimilarProduct {
//   id: number;
//   title: string;
//   brand: string;
//   price: number;
//   thumbnail: string;
// }

// export default function Page() {
//   const router = useRouter();
//   const params = useParams();
//   const id = Number(params.id);

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([]);
//   const [qty, setQty] = useState(0);

//   useEffect(() => {
//     if (id) {
//       fetch(`https://dummyjson.com/products/${id}`)
//         .then(res => res.json())
//         .then(data => {
//           setProduct({
//             id: data.id,
//             title: data.title,
//             brand: data.brand,
//             price: data.price,
//             description: data.description,
//             image: data.thumbnail,
//             thumbnail: data.thumbnail
//           });
//           setLoading(false);

          
//           fetch('https://dummyjson.com/products')
//             .then(res => res.json())
//             .then(allProducts => {
//               const currentProduct = allProducts.products.find((p: any) => p.id === data.id);
              
//               if (!currentProduct) {
//                 setSimilarProducts([]);
//                 return;
//               }
              
//               const similar = allProducts.products
//                 .filter((p: any) => 
//                   p.category === currentProduct.category && 
//                   p.id !== data.id
//                 )
//                 .slice(0, 4)
//                 .map((p: any) => ({
//                   id: p.id,
//                   title: p.title,
//                   brand: p.brand,
//                   price: p.price,
//                   thumbnail: p.thumbnail,
//                   category: p.category
//                 }));
              
//               setSimilarProducts(similar);
//             });
//         });
//     }
//   }, [id]);

//   const addToCart = () => {
//     if (!product) return;

//     try {
//       const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//       const existingItem = cart.find((item: any) => item.id === product.id);

//       if (existingItem) {
//         existingItem.qty += qty;
//       } else {
//         cart.push({
//           id: product.id,
//           title: product.title,
//           price: product.price,
//           image: product.image,
//           qty: qty,
//         });
//       }

//       localStorage.setItem("cart", JSON.stringify(cart));
//       toast.success("Product added to cart");
//       router.push("/");
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const buyNow = () => {
//     if (!product || qty === 0) return;

//     try {
     
//       const checkoutItem = {
//         id: product.id,
//         title: product.title,
//         price: product.price,
//         image: product.image,
//         qty: qty,
//         total: product.price * qty
//       };

//       localStorage.setItem("checkoutItem", JSON.stringify(checkoutItem));
      
//       router.push("/checkout");
//     } catch (error) {
//       console.error("Error preparing checkout:", error);
//       toast.error("Error preparing checkout");
//     }
//   };



//   if (!product) {
//     return (
//        <p className="p-4">Loading...</p>
       
//     );
//   }

//   return (
//     <>
//         <div className="mt-25 mx-auto">
//         <div className="max-w-4xl mx-auto bg-gray-500 shadow-md rounded-lg text-white mb-8">
//           <div className="md:flex">
//             <img src={product.image} alt={product.title} className="w-full md:w-1/2 object-cover" />
//             <div className="p-6 md:w-1/2">
//               <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
//               <p className="text-sm mb-2">Brand: {product.brand}</p>
//               <p className="text-xl font-semibold mb-4">${(product.price * qty).toFixed(2)}</p>
//               <p className="mb-6">{product.description}</p>

//               <div className="flex items-center gap-3 mb-4">
//                 <Button onClick={() => qty > 1 && setQty(qty - 1)} disabled={qty === 0}>
//                   -
//                 </Button>

//                 <div className="text-lg font-semibold">{qty}</div>

//                 <Button onClick={() => qty < 10 && setQty(qty + 1)} disabled={qty === 10}>
//                   +
//                 </Button>
//               </div>

//               <div className='space-x-3'>
//                 <Button className='cursor-pointer' variant="outline" onClick={addToCart} disabled={qty === 0}>
//                   Add to Cart
//                 </Button>

//                 <Button className='cursor-pointer' variant="outline" onClick={buyNow} disabled={qty === 0}>
//                   Buy
//                 </Button>
//               </div>

//             </div>
//           </div>
//         </div>

//         {similarProducts.length > 0 && (
//           <div className="max-w-4xl mx-auto mt-8">
//             <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Similar Items</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//               {similarProducts.map((similarProduct) => (
//                 <div
//                   key={similarProduct.id}
//                   className="rounded-lg p-4 hover:shadow-lg bg-gray-500 text-white cursor-pointer"
//                   onClick={() => router.push(`/features/product/${similarProduct.id}`)}
//                 >
//                   <img
//                     src={similarProduct.thumbnail}
//                     alt={similarProduct.title}
//                     className="w-full h-48 object-cover mb-2 rounded"
//                   />
//                   <h3 className="font-semibold text-lg">{similarProduct.title}</h3>
//                   <p className="text-gray-300 font-bold">Brand: {similarProduct.brand}</p>
//                   <p className="text-white font-bold">Price: ${similarProduct.price}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }



// 'use client';

// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { useParams, useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// interface Product {
//   id: number;
//   title: string;
//   brand: string;
//   price: number;
//   description: string;
//   image: string;
//   thumbnail: string;
//   category: string;
// }

// interface SimilarProduct {
//   id: number;
//   title: string;
//   brand: string;
//   price: number;
//   thumbnail: string;
// }

// export default function Page() {
//   const router = useRouter();
//   const params = useParams();
//   const id = Number(params.id);

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([]);
  
//   // FIX 1: Default quantity should start at 1
//   const [qty, setQty] = useState(1);

//   useEffect(() => {
//     if (!id) return;

//     setLoading(true);
//     setError(null);

//     // Fetch primary product
//     fetch(`https://dummyjson.com/products/${id}`)
//       .then(res => {
//         if (!res.ok) throw new Error('Product not found');
//         return res.json();
//       })
//       .then(data => {
//         const currentProduct: Product = {
//           id: data.id,
//           title: data.title,
//           brand: data.brand || 'Generic',
//           price: data.price,
//           description: data.description,
//           image: data.thumbnail,
//           thumbnail: data.thumbnail,
//           category: data.category
//         };

//         setProduct(currentProduct);
//         setLoading(false);

//         // FIX 4: Fetch similar products directly by category endpoint
//         if (data.category) {
//           fetch(`https://dummyjson.com/products/category/${data.category}`)
//             .then(res => res.json())
//             .then(catData => {
//               const similar = catData.products
//                 .filter((p: any) => p.id !== data.id)
//                 .slice(0, 4)
//                 .map((p: any) => ({
//                   id: p.id,
//                   title: p.title,
//                   brand: p.brand || 'Generic',
//                   price: p.price,
//                   thumbnail: p.thumbnail,
//                 }));
//               setSimilarProducts(similar);
//             })
//             .catch(err => console.error('Error fetching similar items:', err));
//         }
//       })
//       .catch(err => {
//         console.error(err);
//         setError('Failed to load product details.');
//         setLoading(false);
//       });
//   }, [id]);

//   const addToCart = () => {
//     if (!product) return;

//     try {
//       const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//       const existingItemIndex = cart.findIndex((item: any) => item.id === product.id);

//       if (existingItemIndex > -1) {
//         cart[existingItemIndex].qty += qty;
//       } else {
//         cart.push({
//           id: product.id,
//           title: product.title,
//           price: product.price,
//           image: product.image,
//           qty: qty,
//         });
//       }

//       localStorage.setItem("cart", JSON.stringify(cart));
//       toast.success("Product added to cart!");
//       router.push("/");
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       toast.error("Failed to add product to cart.");
//     }
//   };

//   const buyNow = () => {
//     if (!product || qty === 0) return;

//     try {
//       const checkoutItem = {
//         id: product.id,
//         title: product.title,
//         price: product.price,
//         image: product.image,
//         qty: qty,
//         total: product.price * qty
//       };

//       localStorage.setItem("checkoutItem", JSON.stringify(checkoutItem));
//       router.push("/checkout");
//     } catch (error) {
//       console.error("Error preparing checkout:", error);
//       toast.error("Error preparing checkout");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[50vh]">
//         <p className="text-gray-400 font-semibold animate-pulse">Loading product details...</p>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-red-400 font-semibold">{error || 'Product not found.'}</p>
//         <Button className="mt-4" onClick={() => router.push('/')}>
//           Return to Home
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-20 max-w-5xl mx-auto px-4 pb-12">
//       <div className="bg-slate-800 shadow-xl rounded-2xl overflow-hidden text-white mb-12 border border-slate-700">
//         <div className="md:flex">
//           <div className="md:w-1/2 bg-slate-900 p-6 flex items-center justify-center">
//             <img 
//               src={product.image} 
//               alt={product.title} 
//               className="w-full h-80 object-contain rounded-lg" 
//             />
//           </div>

//           <div className="p-8 md:w-1/2 flex flex-col justify-between">
//             <div>
//               <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
//               <p className="text-sm text-slate-400 mb-4 uppercase tracking-wider font-semibold">
//                 Brand: {product.brand}
//               </p>
              
//               {/* Display dynamic calculated total price */}
//               <p className="text-3xl font-extrabold text-indigo-400 mb-4">
//                 ${(product.price * qty).toFixed(2)}
//               </p>
              
//               <p className="text-slate-300 mb-6 leading-relaxed text-sm">
//                 {product.description}
//               </p>
//             </div>

//             <div className="space-y-6">
//               {/* Quantity Selector */}
//               <div className="flex items-center gap-4">
//                 <span className="text-sm font-semibold text-slate-400">Quantity:</span>
//                 <div className="flex items-center gap-3 bg-slate-900 p-1.5 rounded-xl border border-slate-700">
//                   {/* FIX 2: Correct disable condition for decrement button */}
//                   <Button 
//                     size="sm"
//                     variant="ghost"
//                     onClick={() => setQty(prev => Math.max(1, prev - 1))} 
//                     disabled={qty <= 1}
//                     className="h-8 w-8 text-white font-bold cursor-pointer disabled:opacity-30"
//                   >
//                     -
//                   </Button>

//                   <div className="text-base font-bold w-6 text-center">{qty}</div>

//                   <Button 
//                     size="sm"
//                     variant="ghost"
//                     onClick={() => setQty(prev => Math.min(10, prev + 1))} 
//                     disabled={qty >= 10}
//                     className="h-8 w-8 text-white font-bold cursor-pointer disabled:opacity-30"
//                   >
//                     +
//                   </Button>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-4">
//                 <Button 
//                   className="flex-1 cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-5 rounded-xl transition-all" 
//                   onClick={addToCart} 
//                   disabled={qty === 0}
//                 >
//                   Add to Cart
//                 </Button>

//                 <Button 
//                   className="flex-1 cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-5 rounded-xl transition-all" 
//                   onClick={buyNow} 
//                   disabled={qty === 0}
//                 >
//                   Buy Now
//                 </Button>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Similar Items Section */}
//       {similarProducts.length > 0 && (
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-6 text-slate-100">Similar Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {similarProducts.map((similarProduct) => (
//               <div
//                 key={similarProduct.id}
//                 className="group rounded-2xl p-4 bg-slate-800 border border-slate-700/60 hover:border-indigo-500/50 text-white cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
//                 onClick={() => router.push(`/features/product/${similarProduct.id}`)}
//               >
//                 <div className="aspect-square bg-slate-900 rounded-xl overflow-hidden mb-3">
//                   <img
//                     src={similarProduct.thumbnail}
//                     alt={similarProduct.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>
//                 <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-indigo-400 transition-colors">
//                   {similarProduct.title}
//                 </h3>
//                 <p className="text-slate-400 text-xs mt-1">Brand: {similarProduct.brand}</p>
//                 <p className="text-indigo-400 font-bold text-sm mt-2">${similarProduct.price}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }












// 'use client';

// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { useParams, useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// interface Product {
//   id: number;
//   title: string;
//   brand: string;
//   price: number;
//   description: string;
//   image: string;
//   thumbnail: string;
//   category: string;
// }

// interface SimilarProduct {
//   id: number;
//   title: string;
//   brand: string;
//   price: number;
//   thumbnail: string;
// }

// export default function Page() {
//   const router = useRouter();
//   const params = useParams();
//   const id = Number(params.id);

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([]);
//   const [isDark, setIsDark] = useState(true);
//   const [qty, setQty] = useState(1);

//   // Sync theme with Landing Page
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//       setIsDark(savedTheme === 'dark');
//     }
//   }, []);



//   useEffect(() => {
//     if (!id) return;

//     setLoading(true);
//     setError(null);

//     fetch(`https://dummyjson.com/products/${id}`)
//       .then(res => {
//         if (!res.ok) throw new Error('Product not found');
//         return res.json();
//       })
//       .then(data => {
//         const currentProduct: Product = {
//           id: data.id,
//           title: data.title,
//           brand: data.brand || 'Generic',
//           price: data.price,
//           description: data.description,
//           image: data.thumbnail,
//           thumbnail: data.thumbnail,
//           category: data.category
//         };

//         setProduct(currentProduct);
//         setLoading(false);

//         if (data.category) {
//           fetch(`https://dummyjson.com/products/category/${data.category}`)
//             .then(res => res.json())
//             .then(catData => {
//               const similar = catData.products
//                 .filter((p: any) => p.id !== data.id)
//                 .slice(0, 4)
//                 .map((p: any) => ({
//                   id: p.id,
//                   title: p.title,
//                   brand: p.brand || 'Generic',
//                   price: p.price,
//                   thumbnail: p.thumbnail,
//                 }));
//               setSimilarProducts(similar);
//             })
//             .catch(err => console.error('Error fetching similar items:', err));
//         }
//       })
//       .catch(err => {
//         console.error(err);
//         setError('Failed to load product details.');
//         setLoading(false);
//       });
//   }, [id]);

//   const addToCart = () => {
//     if (!product) return;

//     try {
//       const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//       const existingItemIndex = cart.findIndex((item: any) => item.id === product.id);

//       if (existingItemIndex > -1) {
//         cart[existingItemIndex].qty += qty;
//       } else {
//         cart.push({
//           id: product.id,
//           title: product.title,
//           price: product.price,
//           image: product.image,
//           qty: qty,
//         });
//       }

//       localStorage.setItem("cart", JSON.stringify(cart));
//       toast.success("Product added to cart!");
//       router.push("/");
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       toast.error("Failed to add product to cart.");
//     }
//   };

//   const buyNow = () => {
//     if (!product || qty === 0) return;

//     try {
//       const checkoutItem = {
//         id: product.id,
//         title: product.title,
//         price: product.price,
//         image: product.image,
//         qty: qty,
//         total: product.price * qty
//       };

//       localStorage.setItem("checkoutItem", JSON.stringify(checkoutItem));
//       router.push("/checkout");
//     } catch (error) {
//       console.error("Error preparing checkout:", error);
//       toast.error("Error preparing checkout");
//     }
//   };

//   return (
//     <div className={`min-h-screen transition-colors duration-500 py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white ${
//       isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
//     }`}>
//       <div className="max-w-7xl mx-auto space-y-10">
        
//         {/* Navigation & Theme Toggle */}
//         <div className="flex justify-between items-center">
//           <button
//             onClick={() => router.back()}
//             className={`px-4 py-2 rounded-2xl border text-xs font-semibold transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 ${
//               isDark 
//                 ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' 
//                 : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
//             }`}
//           >
//             ← Back
//           </button>

      
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex justify-center items-center min-h-[50vh]">
//             <p className="text-slate-400 font-semibold animate-pulse">Loading product details...</p>
//           </div>
//         )}

//         {/* Error State */}
//         {!loading && (error || !product) && (
//           <div className="text-center py-12">
//             <p className="text-red-400 font-semibold">{error || 'Product not found.'}</p>
//             <Button className="mt-4 cursor-pointer" onClick={() => router.push('/')}>
//               Return to Home
//             </Button>
//           </div>
//         )}

//         {/* Product Details Section */}
//         {!loading && product && (
//           <>
//             <div className={`border rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-500 ${
//               isDark 
//                 ? 'bg-slate-900/40 border-slate-800/80' 
//                 : 'bg-white border-slate-200/80'
//             }`}>
//               <div className="md:flex">
//                 {/* Product Image */}
//                 <div className={`md:w-1/2 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r ${
//                   isDark ? 'bg-slate-950/60 border-slate-800/50' : 'bg-slate-100/60 border-slate-200'
//                 }`}>
//                   <img 
//                     src={product.image} 
//                     alt={product.title} 
//                     className="w-full h-80 sm:h-96 object-contain rounded-2xl" 
//                   />
//                 </div>

//                 {/* Product Meta & Actions */}
//                 <div className="p-8 md:w-1/2 flex flex-col justify-between">
//                   <div>
//                     <h1 className="text-3xl font-extrabold tracking-tight mb-2">{product.title}</h1>
//                     <p className="text-xs text-indigo-500 uppercase tracking-widest font-bold mb-4">
//                       Brand: {product.brand}
//                     </p>
                    
//                     <p className={`text-3xl font-black mb-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
//                       ${(product.price * qty).toFixed(2)}
//                     </p>
                    
//                     <p className="text-slate-400 text-sm leading-relaxed mb-6">
//                       {product.description}
//                     </p>
//                   </div>

//                   <div className="space-y-6">
//                     {/* Quantity Control */}
//                     <div className="flex items-center gap-4">
//                       <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quantity:</span>
//                       <div className={`flex items-center gap-3 p-1.5 rounded-2xl border ${
//                         isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-100 border-slate-200'
//                       }`}>
//                         <Button 
//                           size="sm"
//                           variant="ghost"
//                           onClick={() => setQty(prev => Math.max(1, prev - 1))} 
//                           disabled={qty <= 1}
//                           className="h-8 w-8 font-bold cursor-pointer disabled:opacity-30"
//                         >
//                           -
//                         </Button>

//                         <div className="text-base font-bold w-6 text-center">{qty}</div>

//                         <Button 
//                           size="sm"
//                           variant="ghost"
//                           onClick={() => setQty(prev => Math.min(10, prev + 1))} 
//                           disabled={qty >= 10}
//                           className="h-8 w-8 font-bold cursor-pointer disabled:opacity-30"
//                         >
//                           +
//                         </Button>
//                       </div>
//                     </div>

//                     {/* Add & Buy Buttons */}
//                     <div className="flex gap-4">
//                       <Button 
//                         className="flex-1 cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-6 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all" 
//                         onClick={addToCart} 
//                         disabled={qty === 0}
//                       >
//                         Add to Cart
//                       </Button>

//                       <Button 
//                         className="flex-1 cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-6 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all" 
//                         onClick={buyNow} 
//                         disabled={qty === 0}
//                       >
//                         Buy Now
//                       </Button>
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             </div>

//             {/* Similar Products */}
//             {similarProducts.length > 0 && (
//               <div className="pt-8">
//                 <h2 className="text-2xl font-extrabold tracking-tight mb-6">Similar Products</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//                   {similarProducts.map((similarProduct) => (
//                     <div
//                       key={similarProduct.id}
//                       className={`group border rounded-3xl p-4 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer overflow-hidden backdrop-blur-md ${
//                         isDark 
//                           ? 'bg-slate-900/40 hover:bg-slate-900/80 border-slate-800/80 hover:border-indigo-500/50' 
//                           : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-indigo-300'
//                       }`}
//                       onClick={() => router.push(`/features/product/${similarProduct.id}`)}
//                     >
//                       <div className={`relative aspect-square w-full overflow-hidden rounded-2xl mb-4 border ${
//                         isDark ? 'bg-slate-950/60 border-slate-800/50' : 'bg-slate-100 border-slate-200'
//                       }`}>
//                         <img
//                           src={similarProduct.thumbnail}
//                           alt={similarProduct.title}
//                           className="h-full w-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
//                         />
//                       </div>
//                       <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-indigo-500 transition-colors">
//                         {similarProduct.title}
//                       </h3>
//                       <p className="text-xs text-slate-400 mt-1">Brand: {similarProduct.brand}</p>
//                       <p className={`font-extrabold text-sm mt-2 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
//                         ${similarProduct.price}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//       </div>
//     </div>
//   );
// }







'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  thumbnail: string;
  category: string;
}

interface SimilarProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
  thumbnail: string;
}

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([]);
  const [isDark, setIsDark] = useState(true);
  const [qty, setQty] = useState(1);

  // Sync theme with Landing Page
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  // Fetch product and similar items
  useEffect(() => {
    if (!id) return;

    // Scroll back to top when route/product changes
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setLoading(true);
    setError(null);
    setProduct(null);
    setSimilarProducts([]);
    setQty(1);

    // Fetch primary product first
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(async data => {
        const currentProduct: Product = {
          id: data.id,
          title: data.title,
          brand: data.brand || 'Generic',
          price: data.price,
          description: data.description,
          image: data.thumbnail,
          thumbnail: data.thumbnail,
          category: data.category
        };

        // Fetch similar products BEFORE stopping the loading state
        if (data.category) {
          try {
            const catRes = await fetch(`https://dummyjson.com/products/category/${data.category}`);
            const catData = await catRes.json();
            const similar = catData.products
              .filter((p: any) => p.id !== data.id)
              .slice(0, 4)
              .map((p: any) => ({
                id: p.id,
                title: p.title,
                brand: p.brand || 'Generic',
                price: p.price,
                thumbnail: p.thumbnail,
              }));
            setSimilarProducts(similar);
          } catch (err) {
            console.error('Error fetching similar items:', err);
          }
        }

        // Set main product and clear loading ONCE all data is ready
        setProduct(currentProduct);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load product details.');
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItemIndex = cart.findIndex((item: any) => item.id === product.id);

      if (existingItemIndex > -1) {
        cart[existingItemIndex].qty += qty;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty: qty,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Product added to cart!");
      router.push("/");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };

  const buyNow = () => {
    if (!product || qty === 0) return;

    try {
      const checkoutItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        qty: qty,
        total: product.price * qty
      };

      localStorage.setItem("checkoutItem", JSON.stringify(checkoutItem));
      router.push("/checkout");
    } catch (error) {
      console.error("Error preparing checkout:", error);
      toast.error("Error preparing checkout");
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className={`px-4 py-2 rounded-2xl border text-xs font-semibold transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            ← Back
          </button>
        </div>

        {/* Loading Skeleton Indicator */}
        {loading && (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-slate-400 font-semibold animate-pulse">Loading product details...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && (error || !product) && (
          <div className="text-center py-12">
            <p className="text-red-400 font-semibold">{error || 'Product not found.'}</p>
            <Button className="mt-4 cursor-pointer" onClick={() => router.push('/')}>
              Return to Home
            </Button>
          </div>
        )}

        {/* Main Content (Shown ONLY when loading is completely done) */}
        {!loading && product && (
          <div className="space-y-12">
            
            {/* 1. MAIN PRODUCT DETAILS CARD */}
            <div className={`border rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-500 ${
              isDark 
                ? 'bg-slate-900/40 border-slate-800/80' 
                : 'bg-white border-slate-200/80'
            }`}>
              <div className="md:flex">
                {/* Product Image */}
                <div className={`md:w-1/2 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r ${
                  isDark ? 'bg-slate-950/60 border-slate-800/50' : 'bg-slate-100/60 border-slate-200'
                }`}>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-80 sm:h-96 object-contain rounded-2xl" 
                  />
                </div>

                {/* Product Meta & Actions */}
                <div className="p-8 md:w-1/2 flex flex-col justify-between">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight mb-2">{product.title}</h1>
                    <p className="text-xs text-indigo-500 uppercase tracking-widest font-bold mb-4">
                      Brand: {product.brand}
                    </p>
                    
                    <p className={`text-3xl font-black mb-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                      ${(product.price * qty).toFixed(2)}
                    </p>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {product.description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Quantity Control */}
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quantity:</span>
                      <div className={`flex items-center gap-3 p-1.5 rounded-2xl border ${
                        isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-100 border-slate-200'
                      }`}>
                        <Button 
                          size="sm"
                          variant="ghost"
                          onClick={() => setQty(prev => Math.max(1, prev - 1))} 
                          disabled={qty <= 1}
                          className="h-8 w-8 font-bold cursor-pointer disabled:opacity-30"
                        >
                          -
                        </Button>

                        <div className="text-base font-bold w-6 text-center">{qty}</div>

                        <Button 
                          size="sm"
                          variant="ghost"
                          onClick={() => setQty(prev => Math.min(10, prev + 1))} 
                          disabled={qty >= 10}
                          className="h-8 w-8 font-bold cursor-pointer disabled:opacity-30"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Add & Buy Buttons */}
                    <div className="flex gap-4">
                      <Button 
                        className="flex-1 cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-6 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all" 
                        onClick={addToCart} 
                        disabled={qty === 0}
                      >
                        Add to Cart
                      </Button>

                      <Button 
                        className="flex-1 cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-6 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all" 
                        onClick={buyNow} 
                        disabled={qty === 0}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* 2. SIMILAR PRODUCTS SECTION (DISPLAYED BELOW) */}
            {similarProducts.length > 0 && (
              <div className="pt-4">
                <h2 className="text-2xl font-extrabold tracking-tight mb-6">Similar Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {similarProducts.map((similarProduct) => (
                    <div
                      key={similarProduct.id}
                      className={`group border rounded-3xl p-4 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer overflow-hidden backdrop-blur-md ${
                        isDark 
                          ? 'bg-slate-900/40 hover:bg-slate-900/80 border-slate-800/80 hover:border-indigo-500/50' 
                          : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-indigo-300'
                      }`}
                      onClick={() => router.push(`/features/product/${similarProduct.id}`)}
                    >
                      <div className={`relative aspect-square w-full overflow-hidden rounded-2xl mb-4 border ${
                        isDark ? 'bg-slate-950/60 border-slate-800/50' : 'bg-slate-100 border-slate-200'
                      }`}>
                        <img
                          src={similarProduct.thumbnail}
                          alt={similarProduct.title}
                          className="h-full w-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                      </div>
                      <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-indigo-500 transition-colors">
                        {similarProduct.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">Brand: {similarProduct.brand}</p>
                      <p className={`font-extrabold text-sm mt-2 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                        ${similarProduct.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}