
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
   const [products, setProducts] = useState<any[]>([]);
   const router = useRouter();
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);
  return (
    
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 flex justify-center">Welcome To The Shop</h1>

        <div className="grid grid-cols-3 gap-6" onClick={() => router.push(`/productdetail`)}>
          {products.map((product) => (
            <div
              key={product.id}
              className=" rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h2 className="font-semibold text-lg">{product.title}</h2>
              <p className="text-gray-600">Brand: {product.brand}</p>
              <p className="text-gray-800 font-bold">Rs. {product.price}</p>
              <p className="text-sm text-gray-500">Rating: {product.rating}</p>
            </div>
          ))}
      </div>
    </div>
  )
}
