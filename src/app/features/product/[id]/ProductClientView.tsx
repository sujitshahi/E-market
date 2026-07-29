'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import type { Product, SimilarProduct } from './page';

interface ProductClientViewProps {
  product: Product;
  similarProducts: SimilarProduct[];
}

export default function ProductClientView({ product, similarProducts }: ProductClientViewProps) {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const addToCart = () => {
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
    if (qty === 0) return;

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

        <div className="flex justify-between items-center">
          <button
            type="button"
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

        <div className="space-y-12">
          <div className={`border rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-500 ${
            isDark 
              ? 'bg-slate-900/40 border-slate-800/80' 
              : 'bg-white border-slate-200/80'
          }`}>
            <div className="md:flex">
              <div className={`md:w-1/2 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r ${
                isDark ? 'bg-slate-950/60 border-slate-800/50' : 'bg-slate-100/60 border-slate-200'
              }`}>
                <Image 
                  src={product.image} 
                  alt={product.title} 
                  width={600}
                  height={600}
                  priority
                  className="w-full h-80 sm:h-96 object-contain rounded-2xl" 
                />
              </div>

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

          {similarProducts.length > 0 && (
            <div className="pt-4">
              <h2 className="text-2xl font-extrabold tracking-tight mb-6">Similar Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {similarProducts.map((similarProduct) => (
                  <Link
                    key={similarProduct.id}
                    href={`/features/product/${similarProduct.id}`}
                    className={`group block border rounded-3xl p-4 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer overflow-hidden backdrop-blur-md ${
                      isDark 
                        ? 'bg-slate-900/40 hover:bg-slate-900/80 border-slate-800/80 hover:border-indigo-500/50' 
                        : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-indigo-300'
                    }`}
                  >
                    <div className={`relative aspect-square w-full overflow-hidden rounded-2xl mb-4 border ${
                      isDark ? 'bg-slate-950/60 border-slate-800/50' : 'bg-slate-100 border-slate-200'
                    }`}>
                      <Image
                        src={similarProduct.thumbnail}
                        alt={similarProduct.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-indigo-500 transition-colors">
                      {similarProduct.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Brand: {similarProduct.brand}</p>
                    <p className={`font-extrabold text-sm mt-2 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                      ${similarProduct.price}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}