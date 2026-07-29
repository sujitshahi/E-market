'use client';

import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ShoppingBag, Send, Mail, ShieldCheck, Truck, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    toast.success('Thanks for subscribing!');
    setEmail('');
  };

  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800/80 transition-colors duration-500 selection:bg-indigo-500 selection:text-white">
      
      <div className="border-b border-slate-800/60 bg-slate-900/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Fast Delivery</p>
              <p className="text-[11px] text-slate-400">Reliable dispatch straight to you</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Secure Payment</p>
              <p className="text-[11px] text-slate-400">eSewa, Khalti & Encrypted checkout</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Easy Returns</p>
              <p className="text-[11px] text-slate-400">Hassle-free customer guarantee</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        <div className="md:col-span-4 space-y-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-lg font-extrabold tracking-tight bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Store Brand
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Discover premium clothing and style essentials curated for modern fashion. Quality materials delivered straight to your doorstep.
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 pt-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built for Speed & Security</span>
          </div>
        </div>
      
        <div className="md:col-span-2 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Customer Support</h3>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <Link href="/contact" className="hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-indigo-400" />
                <span>Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Stay Updated</h3>
          <p className="text-xs text-slate-400">
            Subscribe to our newsletter for exclusive drops, discounts, and latest catalog updates.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
            <label htmlFor="footer-email" className="sr-only">
              Subscribe to our newsletter
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-500 rounded-2xl pl-9 pr-24 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 py-1.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
              >
                <span>Join</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
            {subscribed && (
              <p className="text-[10px] text-emerald-400 font-semibold">You're on the VIP list!</p>
            )}
          </form>
        </div>

      </div>

      <div className="border-t border-slate-900 bg-slate-950/80 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Store Brand. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Return Policy</span>
          </div>
        </div>
      </div>

    </footer>
  );
}