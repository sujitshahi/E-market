'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
  stock: number;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('query') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!query.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch('https://dummyjson.com/products?limit=0');
        const data = await response.json();
        const allItems: Product[] = data.products || [];

        const searchWords = query.trim().toLowerCase().split(' ').filter(Boolean);

        const filtered = allItems.filter((item) => {
          const combined = `${item.title} ${item.description || ''} ${item.category || ''} ${item.brand || ''}`.toLowerCase();
          return searchWords.every((word) => combined.includes(word));
        });

        setProducts(filtered);
      } catch (error) {
        console.error("Search page error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
        <div className="text-center">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-indigo-500 mb-4"></i>
          <p className="text-slate-400 text-sm">Searching catalog for "{query}"...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        

        <div className="mb-8 border-b border-slate-800 pb-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Search Results for <span className="text-indigo-400">"{query}"</span>
          </h1>
          <span className="text-xs text-slate-400 font-medium">
            Found {products.length} {products.length === 1 ? 'item' : 'items'}
          </span>
        </div>


        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => router.push(`/features/product/${product.id}`)}
                className="group border border-slate-800 rounded-2xl p-4 bg-slate-900/60 backdrop-blur-md hover:border-indigo-500/50 hover:bg-slate-900 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-48 rounded-xl overflow-hidden bg-slate-800/50 mb-4 flex items-center justify-center p-2">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-3">
                    {product.category}
                  </span>

                  <h3 className="font-bold text-slate-100 text-base mb-1 group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {product.title}
                  </h3>

                  <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Price</span>
                    <span className="text-sm font-bold text-white">${product.price}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {product.stock} in stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl bg-slate-900/30">
            <i className="fa-solid fa-box-open text-4xl text-slate-600 mb-3"></i>
            <h2 className="text-lg font-semibold text-slate-300">No products match your search</h2>
            <p className="text-xs text-slate-500 mt-1">Try checking for spelling errors or using simpler keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 p-8 text-center text-slate-400">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}