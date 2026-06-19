'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast'


interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  thumbnail: string;
  category?: string;
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
  const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([]);
  const [qty, setQty] = useState(0);

  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct({
            id: data.id,
            title: data.title,
            brand: data.brand,
            price: data.price,
            description: data.description,
            image: data.thumbnail,
            thumbnail: data.thumbnail
          });
          setLoading(false);

          
          fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(allProducts => {
              const currentProduct = allProducts.products.find((p: any) => p.id === data.id);
              
              if (!currentProduct) {
                setSimilarProducts([]);
                return;
              }
              
              const similar = allProducts.products
                .filter((p: any) => 
                  p.category === currentProduct.category && 
                  p.id !== data.id
                )
                .slice(0, 4)
                .map((p: any) => ({
                  id: p.id,
                  title: p.title,
                  brand: p.brand,
                  price: p.price,
                  thumbnail: p.thumbnail,
                  category: p.category
                }));
              
              setSimilarProducts(similar);
            });
        });
    }
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cart.find((item: any) => item.id === product.id);

      if (existingItem) {
        existingItem.qty += qty;
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
      toast.success("Product added to cart");
      router.push("/");
    } catch (error) {
      console.error("Error adding to cart:", error);
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



  if (!product) {
    return (
       <p className="p-4">Loading...</p>
       
        
      
    );
  }

  return (
    <>
        <div className="mt-25 mx-auto">
        <div className="max-w-4xl mx-auto bg-gray-500 shadow-md rounded-lg text-white mb-8">
          <div className="md:flex">
            <img src={product.image} alt={product.title} className="w-full md:w-1/2 object-cover" />
            <div className="p-6 md:w-1/2">
              <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
              <p className="text-sm mb-2">Brand: {product.brand}</p>
              <p className="text-xl font-semibold mb-4">${(product.price * qty).toFixed(2)}</p>
              <p className="mb-6">{product.description}</p>

              <div className="flex items-center gap-3 mb-4">
                <Button onClick={() => qty > 1 && setQty(qty - 1)} disabled={qty === 0}>
                  -
                </Button>

                <div className="text-lg font-semibold">{qty}</div>

                <Button onClick={() => qty < 10 && setQty(qty + 1)} disabled={qty === 10}>
                  +
                </Button>
              </div>

              <div className='space-x-3'>
                <Button className='cursor-pointer' variant="outline" onClick={addToCart} disabled={qty === 0}>
                  Add to Cart
                </Button>

                <Button className='cursor-pointer' variant="outline" onClick={buyNow} disabled={qty === 0}>
                  Buy
                </Button>
              </div>

            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Similar Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {similarProducts.map((similarProduct) => (
                <div
                  key={similarProduct.id}
                  className="rounded-lg p-4 hover:shadow-lg bg-gray-500 text-white cursor-pointer"
                  onClick={() => router.push(`/features/product/${similarProduct.id}`)}
                >
                  <img
                    src={similarProduct.thumbnail}
                    alt={similarProduct.title}
                    className="w-full h-48 object-cover mb-2 rounded"
                  />
                  <h3 className="font-semibold text-lg">{similarProduct.title}</h3>
                  <p className="text-gray-300 font-bold">Brand: {similarProduct.brand}</p>
                  <p className="text-white font-bold">Price: ${similarProduct.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}



