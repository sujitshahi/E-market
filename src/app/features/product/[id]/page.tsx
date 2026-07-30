import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductClientView from './ProductClientView';
import Link from 'next/link';

export interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  thumbnail: string;
  category: string;
}

export interface SimilarProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
  thumbnail: string;
}

async function getProductDetails(id: number): Promise<Product | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();

    return {
      id: data.id,
      title: data.title,
      brand: data.brand || 'Generic',
      price: data.price,
      description: data.description,
      image: data.thumbnail,
      thumbnail: data.thumbnail,
      category: data.category,
    };
  } catch (err) {
    console.error('Error fetching product details:', err);
    return null;
  }
}

async function getSimilarProducts(category: string, currentId: number): Promise<SimilarProduct[]> {
  try {
    const catRes = await fetch(`https://dummyjson.com/products/category/${category}`, {
      next: { revalidate: 3600 },
    });
    if (!catRes.ok) return [];
    const catData = await catRes.json();

    return (catData.products || [])
      .filter((p: any) => p.id !== currentId)
      .slice(0, 4)
      .map((p: any) => ({
        id: p.id,
        title: p.title,
        brand: p.brand || 'Generic',
        price: p.price,
        thumbnail: p.thumbnail,
      }));
  } catch (err) {
    console.error('Error fetching similar items:', err);
    return [];
  }
}

type PageProps = {
  params: Promise<{ id: string }>;
};

// Generates dynamic Metadata for SEO / Search Previews
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  if (!id || isNaN(id)) {
    return {
      title: 'Product Not Found',
    };
  }

  const product = await getProductDetails(id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.title} | ${product.brand}`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  if (!id || isNaN(id)) {
    notFound();
  }

  const product = await getProductDetails(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center py-12">
        <p className="text-red-400 font-semibold mb-4">Product not found.</p>
        <Link
          href="/"
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-500 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const similarProducts = await getSimilarProducts(product.category, product.id);

  return <ProductClientView product={product} similarProducts={similarProducts} />;
}