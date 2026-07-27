'use client';

import { ShoppingBag, ArrowRight, Sparkles, ShieldCheck, Truck, Flame, TrendingUp, Star } from 'lucide-react';
import Page from "../features/product/page";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">

      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-10 w-[300px] h-[250px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          <div className="lg:col-span-8 relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/40 p-8 sm:p-12 flex flex-col justify-between backdrop-blur-xl group">

            <div className="absolute inset-0 z-0">
              <img
                className="h-full w-full object-cover object-center scale-105 filter brightness-50 group-hover:scale-100 transition-transform duration-1000 ease-out"
                src="https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=1400&auto=format&fit=crop"
                alt="All Essentials Collection"
              />
              <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 flex items-center justify-between mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/15 text-indigo-300 text-xs font-semibold backdrop-blur-md uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>All-in-One Store</span>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-950/60 px-3 py-1.5 rounded-full border border-slate-800 backdrop-blur-md">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Trending Deals</span>
              </div>
            </div>

            <div className="relative z-10 space-y-6 max-w-xl">  
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Everything You Need, <br />
                <span className="bg-linear-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                  All in One Place.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Discover top-tier cosmetics, modern tech gadgets, stylish apparel, and everyday essentials delivered straight to your door.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#catalog"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wide shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop All Products</span>
                </a>

                <a
                  href="#catalog"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-xs tracking-wide backdrop-blur-md transition-all hover:border-slate-500"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="relative z-10 pt-10 mt-8 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-indigo-400" />
                <span>Fast Express Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Quality Products</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">

            <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 flex flex-col justify-between backdrop-blur-md hover:border-indigo-500/40 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                  Featured Category
                </span>
                <TrendingUp className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  Beauty & Essentials
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Premium skincare, perfumes, and daily essentials designed to upgrade your lifestyle.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>4.9 (500+ reviews)</span>
                </div>
                <span className="text-xs font-bold text-slate-200">Starting $9.99</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-linear-to-br from-indigo-950/40 via-slate-900/60 to-purple-950/40 p-6 flex flex-col justify-between backdrop-blur-md">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-lg">
                  ⚡
                </div>
                <h4 className="text-lg font-bold text-white">Instant Shipping</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  All items are in stock and ready to ship immediately with end-to-end tracking.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/80 text-center">
                <div className="p-2 rounded-2xl bg-slate-950/50 border border-slate-800">
                  <p className="text-lg font-black text-white">100%</p>
                  <p className="text-[10px] text-slate-400 font-medium">Authentic</p>
                </div>
                <div className="p-2 rounded-2xl bg-slate-950/50 border border-slate-800">
                  <p className="text-lg font-black text-indigo-400">30 Days</p>
                  <p className="text-[10px] text-slate-400 font-medium">Easy Returns</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <section id="catalog" className="relative z-10">
        <Page />
      </section>

    </div>
  );
}