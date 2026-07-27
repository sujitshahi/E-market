'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowLeft, Calendar, User, Phone, MapPin, CreditCard, ChevronDown, ChevronUp, PackageCheck, Sun, Moon} from 'lucide-react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
}

interface OrderHistory {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
}

export default function OrderSummaryPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }

    const savedOrders = localStorage.getItem("orderHistory");
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);
        setOrders(parsed);
        if (parsed.length > 0) {
          setExpandedOrder(parsed[0].id); // Expand the newest order by default
        }
      } catch (err) {
        console.error("Error loading order history:", err);
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const nextTheme = !prev;
      localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
      return nextTheme;
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  if (!mounted) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.push("/")}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-semibold transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>

          <button
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-semibold transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        <header className="text-center space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest backdrop-blur-md ${
            isDark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-200 text-indigo-600'
          }`}>
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Purchase History</span>
          </div>
          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
            isDark 
              ? 'bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent'
              : 'text-slate-900'
          }`}>
            Order Summary
          </h1>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Review your placed orders and tracking details.
          </p>
        </header>

        {orders.length === 0 ? (
          <div className={`backdrop-blur-xl border rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto ${
            isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="w-16 h-16 bg-slate-800/50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto border border-slate-700/50">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold">No Orders Found</h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              You haven't placed any orders yet. Once you complete checkout, your order history will appear here.
            </p>
            <button
              onClick={() => router.push("/")}
              className="py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const isExpanded = expandedOrder === order.id;

              return (
                <div
                  key={order.id}
                  className={`backdrop-blur-xl border rounded-3xl overflow-hidden transition-all duration-300 ${
                    isDark 
                      ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' 
                      : 'bg-white/80 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  
                  <div
                    onClick={() => toggleExpand(order.id)}
                    className="p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-400">{order.id}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                          Confirmed
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {order.date}
                        </span>
                        <span>•</span>
                        <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">Total Paid</p>
                        <p className="text-base font-extrabold text-indigo-400">${order.total.toFixed(2)}</p>
                      </div>

                      <div className={`p-2 rounded-xl border ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className={`p-5 sm:p-6 border-t space-y-6 ${
                      isDark ? 'border-slate-800/80 bg-slate-950/40' : 'border-slate-200/80 bg-slate-50/50'
                    }`}>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                          <p className="text-slate-400 font-medium mb-1 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-indigo-400" /> Customer
                          </p>
                          <p className="font-bold">{order.firstName} {order.lastName}</p>
                          <p className="text-[11px] text-slate-400 truncate">{order.email}</p>
                        </div>

                        <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                          <p className="text-slate-400 font-medium mb-1 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Delivery
                          </p>
                          <p className="font-bold truncate">{order.address}</p>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" /> {order.phone}
                          </p>
                        </div>

                        <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                          <p className="text-slate-400 font-medium mb-1 flex items-center gap-1.5">
                            <CreditCard className="w-3.5 h-3.5 text-indigo-400" /> Payment
                          </p>
                          <p className="font-bold uppercase text-emerald-400">{order.paymentMethod}</p>
                          <p className="text-[11px] text-slate-400">Payment Status: Paid</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Items Ordered</h3>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className={`flex items-center justify-between gap-4 p-3 rounded-2xl border ${
                                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-12 h-12 object-cover rounded-xl border border-slate-800"
                                />
                                <div>
                                  <p className="font-bold text-xs line-clamp-1">{item.title}</p>
                                  <p className="text-[11px] text-slate-400">Qty: {item.qty} × ${item.price.toFixed(2)}</p>
                                </div>
                              </div>
                              <p className="font-extrabold text-xs">${(item.price * item.qty).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}