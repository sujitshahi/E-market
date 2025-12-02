'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
  rating: number;
  stock: number;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('query') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(query);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      performSearch(query);
    } else {
      setLoading(false);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setProducts([]);
      setTotalResults(0);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);
    
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      setProducts(data.products);
      setTotalResults(data.total);
    } catch (error) {
      console.error("Search error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-500 mb-4"></i>
              <p className="text-gray-600">Searching for products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4">
        {hasSearched ? (
          products.length > 0 ? (
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => router.push(`/features/product/${product.id}`)}
                  >
                    <div>
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {product.category}
                        </div>
                       
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      <p>Price: ${product.price}</p>
                      <p>Stock: {product.stock}pc Left</p>
                      
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <i className="fa-solid fa-magnifying-glass text-5xl text-gray-300 mb-4"></i>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">No Results Found</h2>
              <p className="text-gray-600">Try a different search term or category.</p>
            </div>
          )
        ) : (
          <div> </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Suspense fallback={
        <div className="min-h-screen">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-500 mb-4"></i>
                <p className="text-gray-600">Loading search...</p>
              </div>
            </div>
          </div>
        </div>
      }>
        <SearchContent />
      </Suspense>
      
    </>
  );
}