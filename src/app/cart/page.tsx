'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sun, Moon, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react'
import Image from 'next/image'

interface CartItem {
  id: number
  title: string
  price: number
  qty: number
  image: string
  size?: string
  color?: string
}

export default function CartPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [isDark, setIsDark] = useState(true)

  // Derived directly during render — no state or extra render cycle needed
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const nextTheme = !prev
      localStorage.setItem('theme', nextTheme ? 'dark' : 'light')
      return nextTheme
    })
  }

  useEffect(() => {
    const loadCart = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
        setCart(storedCart)
      } catch (e) {
        console.error('Failed to parse cart items:', e)
        setCart([])
      }
    }
    loadCart()
  }, [])

  const updateQty = (id: number, change: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, qty: Math.max(1, Math.min(item.qty + change, 10)) }
        : item
    )

    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const removeItem = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    toast.success('Item removed from cart')
  }

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 py-10 px-4 sm:px-6 lg:px-8 overflow-hidden selection:bg-indigo-500 selection:text-white ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto space-y-8">
        <nav className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => router.push('/')}
            className={`group inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer backdrop-blur-md ${
              isDark
                ? 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-700'
                : 'bg-white/80 border-slate-200/80 text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-xs'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Products
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer backdrop-blur-md ${
              isDark
                ? 'bg-slate-900/60 border-slate-800/80 text-amber-400 hover:bg-slate-800'
                : 'bg-white/80 border-slate-200/80 text-slate-700 hover:bg-slate-100 shadow-xs'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-700" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </nav>

        <header className="relative rounded-3xl overflow-hidden p-8 sm:p-10 border text-center space-y-3 backdrop-blur-md shadow-lg border-slate-800/50">
          <div
            className={`absolute inset-0 opacity-15 pointer-events-none ${
              isDark
                ? 'bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500'
                : 'bg-linear-to-r from-indigo-200 via-purple-200 to-pink-200'
            }`}
          />

          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-semibold uppercase tracking-wider ${
              isDark
                ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
                : 'bg-indigo-50 border-indigo-200 text-indigo-700'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Shopping Cart</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Your Cart{' '}
            <span
              className={
                isDark
                  ? 'bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'
                  : 'text-indigo-600'
              }
            >
              ({cart.length})
            </span>
          </h1>
          <p
            className={`text-xs sm:text-sm max-w-md mx-auto ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Review your selected items and seamlessly proceed to checkout.
          </p>
        </header>

        {cart.length === 0 ? (
          <div
            className={`border rounded-3xl p-12 text-center max-w-md mx-auto space-y-6 backdrop-blur-xl ${
              isDark
                ? 'bg-slate-900/40 border-slate-800/80 shadow-2xl'
                : 'bg-white/80 border-slate-200 shadow-xl'
            }`}
          >
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto border ${
                isDark
                  ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                  : 'bg-indigo-50 border-indigo-100 text-indigo-600'
              }`}
            >
              <ShoppingBag className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">
                Your cart feels light
              </h2>
              <p
                className={`text-xs sm:text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Looks like you haven't added anything to your cart yet. Explore our catalog to find items you love!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-indigo-600/25 active:scale-95"
              >
                Start Shopping
              </button>
              <button
                type="button"
                onClick={() => router.push('/order-summary')}
                className={`px-6 py-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer active:scale-95 ${
                  isDark
                    ? 'border-slate-800 hover:bg-slate-800 text-slate-300'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                View Orders
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className={`group border rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md ${
                    isDark
                      ? 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800/80 hover:border-indigo-500/40'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border shrink-0 ${
                        isDark
                          ? 'bg-slate-950 border-slate-800'
                          : 'bg-slate-100 border-slate-200'
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 80px, 96px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 space-y-1">
                      <h3
                        className={`font-semibold text-sm sm:text-base line-clamp-1 transition-colors ${
                          isDark
                            ? 'text-slate-100 group-hover:text-indigo-400'
                            : 'text-slate-900 group-hover:text-indigo-600'
                        }`}
                      >
                        {item.title}
                      </h3>

                      {(item.size || item.color) && (
                        <div className="flex items-center gap-2 pt-0.5">
                          {item.size && (
                            <span
                              className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                                isDark
                                  ? 'bg-slate-800 border-slate-700 text-slate-300'
                                  : 'bg-slate-100 border-slate-200 text-slate-600'
                              }`}
                            >
                              Size: {item.size}
                            </span>
                          )}
                          {item.color && (
                            <span
                              className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                                isDark
                                  ? 'bg-slate-800 border-slate-700 text-slate-300'
                                  : 'bg-slate-100 border-slate-200 text-slate-600'
                              }`}
                            >
                              Color: {item.color}
                            </span>
                          )}
                        </div>
                      )}

                      <p
                        className={`text-base font-extrabold pt-1 ${
                          isDark ? 'text-indigo-400' : 'text-indigo-600'
                        }`}
                      >
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 ${
                      isDark ? 'border-slate-800/80' : 'border-slate-100'
                    }`}
                  >
                    <div
                      className={`flex items-center border rounded-xl p-1 ${
                        isDark
                          ? 'bg-slate-950/90 border-slate-800'
                          : 'bg-slate-100 border-slate-200'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, -1)}
                        disabled={item.qty === 1}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                          isDark
                            ? 'hover:bg-slate-800 text-slate-300'
                            : 'hover:bg-white text-slate-700'
                        }`}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-8 text-center text-xs font-bold">
                        {item.qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => updateQty(item.id, 1)}
                        disabled={item.qty === 10}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                          isDark
                            ? 'hover:bg-slate-800 text-slate-300'
                            : 'hover:bg-white text-slate-700'
                        }`}
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        isDark
                          ? 'border-slate-800 hover:border-red-500/40 hover:bg-red-500/10 text-slate-400 hover:text-red-400'
                          : 'border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-400 hover:text-red-600'
                      }`}
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-8">
              <div
                className={`backdrop-blur-xl border rounded-3xl p-6 shadow-2xl space-y-6 ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800/80'
                    : 'bg-white/80 border-slate-200'
                }`}
              >
                <h2
                  className={`text-lg font-bold border-b pb-4 ${
                    isDark
                      ? 'text-white border-slate-800'
                      : 'text-slate-900 border-slate-100'
                  }`}
                >
                  Order Summary
                </h2>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div
                    className={`flex justify-between ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    <span>Subtotal</span>
                    <span
                      className={`font-semibold ${
                        isDark ? 'text-slate-200' : 'text-slate-800'
                      }`}
                    >
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <div
                    className={`flex justify-between ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-emerald-500">Free</span>
                  </div>

                  <div
                    className={`border-t pt-3 flex justify-between text-base font-bold ${
                      isDark
                        ? 'border-slate-800 text-white'
                        : 'border-slate-100 text-slate-900'
                    }`}
                  >
                    <span>Total</span>
                    <span className="text-indigo-400">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 group transition-all cursor-pointer shadow-lg shadow-indigo-600/25 active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div
                  className={`flex items-center justify-center gap-2 text-[11px] pt-2 border-t ${
                    isDark
                      ? 'border-slate-800/60 text-slate-400'
                      : 'border-slate-100 text-slate-500'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Encrypted 256-Bit SSL Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}