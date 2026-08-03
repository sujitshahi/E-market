'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import * as yup from "yup";
import { CheckCircle2, ArrowLeft, ShieldCheck, ShoppingBag, User, Mail, Phone, MapPin, CreditCard, Truck, Sparkles, Sun, Moon } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
}

interface BuyNowItem {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
  total: number;
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

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
  address: yup.string().required("Delivery address is required"),
  paymentMethod: yup.string().required("Please select a payment method"),
});

export default function Page() {
  const router = useRouter();  
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [buyNowItem, setBuyNowItem] = useState<BuyNowItem | null>(null);
  
  const total = buyNowItem 
    ? buyNowItem.total 
    : cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
    
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
  });

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }

    const savedBuyNowItem = localStorage.getItem("checkoutItem");
    if (savedBuyNowItem) {
      try {
        setBuyNowItem(JSON.parse(savedBuyNowItem));
        localStorage.removeItem("checkoutItem");
      } catch (err) {
        console.log("Error loading buy now item:", err);
      }
    }

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.log("Error loading cart:", err);
      }
    }

    const savedOrders = localStorage.getItem("orderHistory");
    if (savedOrders) {
      try {
        setOrderHistory(JSON.parse(savedOrders));
      } catch (err) {
        console.log("Error loading order history:", err);
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    if (formData.email.trim() === "") {
      setErrors((prev) => ({ ...prev, email: "" }));
      return;
    }

    try {
      schema.validateSyncAt("email", { email: formData.email });
      setErrors((prev) => ({ ...prev, email: "" }));
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, email: err.message }));
    }
  }, [formData.email]);

  const handlePlaceOrder = async () => {
    try {    
      await schema.validate(formData, { abortEarly: false });
      let orderItems: CartItem[] = [];
      
      if (buyNowItem) {    
        orderItems = [{
          id: buyNowItem.id,
          title: buyNowItem.title,
          price: buyNowItem.price,
          image: buyNowItem.image,
          qty: buyNowItem.qty
        }];
      } else {      
        orderItems = [...cart];
      }

      const order: OrderHistory = {
        id: `ORD-${Date.now()}`,
        date: new Date().toLocaleString(),
        items: orderItems,
        total: total,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
      };

      const updatedHistory = [order, ...orderHistory];
      setOrderHistory(updatedHistory);
      localStorage.setItem("orderHistory", JSON.stringify(updatedHistory));

      if (buyNowItem) {
        setBuyNowItem(null);
      } else {
        localStorage.removeItem("cart");
        setCart([]);
      }

      toast.success("Order placed successfully!");
      setShowOrderHistory(true);

    } catch (err: any) {
      const collected: Record<string, string> = {};
      if (err.inner) {
        err.inner.forEach((e: any) => {
          collected[e.path] = e.message;
        });
      }
      setErrors(collected);
      toast.error("Please complete all required fields.");
    }
  };

  if (!mounted) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="flex justify-between items-center">
          {!showOrderHistory ? (
            <button
              type="button"
              onClick={() => router.push("/cart")}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-semibold transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Cart</span>
            </button>
          ) : <div />}

          <button
            type="button"
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

        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest backdrop-blur-md ${
            isDark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-200 text-indigo-600'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Secure Checkout</span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${
            isDark 
              ? 'bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent'
              : 'text-slate-900'
          }`}>
            Finalize Your Order
          </h1>
          <p className={`text-sm sm:text-base font-normal leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Complete your information to place order with instant confirmation.
          </p>
        </header>

        {showOrderHistory ? (
          <div className="max-w-3xl mx-auto">
            <div className={`backdrop-blur-xl border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 ${
              isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/50 border-emerald-200'
            }`}>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-black text-emerald-500">
                  Order Confirmed!
                </h2>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  We've received your order and started processing it right away.
                </p>
              </div>

              {orderHistory.length > 0 && orderHistory[0] && (
                <div className="space-y-6">
                  <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl border text-xs ${
                    isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <div>
                      <span className="text-slate-400 block">Order ID</span>
                      <span className="font-mono font-bold">{orderHistory[0].id}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Customer</span>
                      <span className="font-semibold">{orderHistory[0].firstName} {orderHistory[0].lastName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Payment</span>
                      <span className="font-bold uppercase text-indigo-400">{orderHistory[0].paymentMethod}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Total Paid</span>
                      <span className="font-bold">${orderHistory[0].total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-indigo-400" />
                      Items Purchased
                    </h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {orderHistory[0].items.map((item) => (
                        <div key={item.id} className={`flex items-center justify-between p-3 rounded-2xl border ${
                          isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200/80'
                        }`}>
                          <div className="flex items-center gap-3">
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={48}
                              height={48}
                              className="w-12 h-12 object-cover rounded-xl border border-slate-800"
                            />
                            <div>
                              <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                              <p className="text-xs text-slate-400">Qty: {item.qty}</p>
                            </div>
                          </div>
                          <p className="font-bold text-sm">${(item.price * item.qty).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => router.push("/order-summary")}
                  className="flex-1 py-3 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
                >
                  View Order History
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowOrderHistory(false);
                    router.push("/");
                  }}
                  className={`flex-1 py-3 px-5 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                    isDark 
                      ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' 
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className={`backdrop-blur-xl border rounded-3xl p-6 shadow-2xl space-y-5 ${
                isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white/80 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 border-b pb-4 border-slate-800/50">
                  <User className="w-4 h-4 text-indigo-400" />
                  <h2 className="font-bold text-base">Customer Details</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-400 block">First Name
                      <input
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        className={`w-full border rounded-2xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all ${
                          isDark ? 'bg-slate-950/80 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                        } ${errors.firstName ? 'border-red-500/80' : ''}`}
                      />
                      </label>
                      {errors.firstName && <p className="text-red-400 text-[10px] font-medium">{errors.firstName}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-400 block">Last Name
                      <input
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        className={`w-full border rounded-2xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all ${
                          isDark ? 'bg-slate-950/80 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                        } ${errors.lastName ? 'border-red-500/80' : ''}`}
                      />
                      </label>
                      {errors.lastName && <p className="text-red-400 text-[10px] font-medium">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" /> Email Address
                    
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full border rounded-2xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all ${
                        isDark ? 'bg-slate-950/80 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      } ${errors.email ? 'border-red-500/80' : ''}`}
                    />
                    </label>
                    {errors.email && <p className="text-red-400 text-[10px] font-medium">{errors.email}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" /> Phone Number                  
                  
                    <input
                      type="text"
                      placeholder="98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className={`w-full border rounded-2xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all ${
                        isDark ? 'bg-slate-950/80 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      } ${errors.phone ? 'border-red-500/80' : ''}`}
                    />
                      </label>
                    {errors.phone && <p className="text-red-400 text-[10px] font-medium">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" /> Delivery Address
                  
                    <input
                      type="text"
                      placeholder="Street, City, Location"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      className={`w-full border rounded-2xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all ${
                        isDark ? 'bg-slate-950/80 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      } ${errors.address ? 'border-red-500/80' : ''}`}
                    />
                      </label>
                    {errors.address && <p className="text-red-400 text-[10px] font-medium">{errors.address}</p>}
                  </div>
                </div>
              </div>

              <div className={`backdrop-blur-xl border rounded-3xl p-6 shadow-2xl space-y-4 ${
                isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white/80 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 border-b pb-4 border-slate-800/50">
                  <CreditCard className="w-4 h-4 text-indigo-400" />
                  <h2 className="font-bold text-base">Payment Method</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, paymentMethod: 'e-sewa' }))}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all text-left w-full ${
                      formData.paymentMethod === 'e-sewa'
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                        : isDark
                          ? 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800/50'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        formData.paymentMethod === 'e-sewa' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-600'
                      }`}>
                        {formData.paymentMethod === 'e-sewa' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className="font-bold text-xs">eSewa</p>
                        <p className="text-[10px] opacity-70">Digital Wallet</p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, paymentMethod: 'khalti' }))}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all text-left w-full ${
                      formData.paymentMethod === 'khalti'
                        ? 'bg-purple-500/10 border-purple-500 text-purple-400'
                        : isDark
                          ? 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800/50'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        formData.paymentMethod === 'khalti' ? 'border-purple-500 bg-purple-500' : 'border-slate-600'
                      }`}>
                        {formData.paymentMethod === 'khalti' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className="font-bold text-xs">Khalti</p>
                        <p className="text-[10px] opacity-70">Digital Wallet</p>
                      </div>
                    </div>
                  </button>
                </div>
                {errors.paymentMethod && <p className="text-red-400 text-[10px] font-medium">{errors.paymentMethod}</p>}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className={`backdrop-blur-xl border rounded-3xl p-6 shadow-2xl space-y-6 ${
                isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white/80 border-slate-200'
              }`}>
                <h2 className="font-bold text-base border-b pb-4 border-slate-800/50">Order Summary</h2>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {buyNowItem ? (
                    <div className={`flex items-center justify-between gap-3 p-3 rounded-2xl border ${
                      isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center gap-3">
                        <Image
                          src={buyNowItem.image}
                          alt={buyNowItem.title}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-cover rounded-xl border border-slate-800"
                        />
                        <div>
                          <p className="font-medium text-xs line-clamp-1">{buyNowItem.title}</p>
                          <p className="text-[10px] text-slate-400">Qty: {buyNowItem.qty}</p>
                        </div>
                      </div>
                      <p className="font-bold text-xs">${buyNowItem.total.toFixed(2)}</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className={`flex items-center justify-between gap-3 p-3 rounded-2xl border ${
                        isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="flex items-center gap-3">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-cover rounded-xl border border-slate-800"
                          />
                          <div>
                            <p className="font-medium text-xs line-clamp-1">{item.title}</p>
                            <p className="text-[10px] text-slate-400">Qty: {item.qty}</p>
                          </div>
                        </div>
                        <p className="font-bold text-xs">${(item.price * item.qty).toFixed(2)}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800/60 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-emerald-400" /> Delivery
                    </span>
                    <span className="font-bold text-emerald-400">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold pt-2 border-t border-slate-800/60">
                    <span>Total Amount</span>
                    <span className="text-indigo-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handlePlaceOrder}
                  disabled={buyNowItem ? false : cart.length === 0}
                  className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-indigo-600/30 active:scale-98"
                >
                  Confirm & Pay
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Safe & Encrypted Checkout</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}