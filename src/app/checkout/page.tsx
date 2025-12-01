'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import toast from 'react-hot-toast';
import * as yup from "yup";

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
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
  paymentMethod: yup.string().required(),
});

export default function Page() {
  const router = useRouter();  
  const [cart, setCart] = useState<CartItem[]>([]); 
  const [buyNowItem, setBuyNowItem] = useState<BuyNowItem | null>(null); 
  const [total, setTotal] = useState(0); 
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]); 
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [errors, setErrors] = useState<any>({}); 
   
   const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
  });

 

  useEffect(() => {
    const validateEmail = async () => {
      try {
        await schema.validateAt("email", { email: formData.email });
        setErrors((prev: any) => ({ ...prev, email: "" }));
      } catch (err: any) {
        setErrors((prev: any) => ({ ...prev, email: err.message }));
      }
    };

    if (formData.email.trim() !== "") {
      validateEmail();
    }
  }, [formData.email]);

 
  useEffect(() => {
   
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


  useEffect(() => {
    if (buyNowItem) {
      setTotal(buyNowItem.total);
    } else {
      
      const t = cart.reduce((s, item) => s + item.price * item.qty, 0);
      setTotal(t);
    }
  }, [cart, buyNowItem]);


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
      const collected: any = {};
      if (err.inner) {
        err.inner.forEach((e: any) => {
          collected[e.path] = e.message;
        });
      }
      setErrors(collected);
      toast.error("Please fill all fields correctly.");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {showOrderHistory ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Order Confirmation</h2>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowOrderHistory(false);
                router.push("/");
              }}
            >
              Continue Shopping
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">✅ Order Placed Successfully!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Thank you for your purchase. Your order has been confirmed.</p>
              
              {orderHistory.length > 0 && orderHistory[0] && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                 
                    <div>
                      <p className="text-sm text-gray-600">Customer</p>
                      <p className="font-semibold">{orderHistory[0].firstName} {orderHistory[0].lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-semibold">{orderHistory[0].paymentMethod}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-bold mb-2">Items Ordered:</h3>
                    {orderHistory[0].items.map(item => (
                      <div key={item.id} className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                          </div>
                        </div>
                        <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <div>Total Amount</div>
                      <div>${orderHistory[0].total.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData(prev => ({ ...prev, firstName: e.target.value }))
                      }
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData(prev => ({ ...prev, lastName: e.target.value }))
                      }
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, email: e.target.value }))
                    }
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, phone: e.target.value }))
                    }
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, address: e.target.value }))
                    }
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  onValueChange={(val) =>
                    setFormData(prev => ({ ...prev, paymentMethod: val }))
                  }
                >
                  <div className="flex items-center gap-2 mb-4">
                    <RadioGroupItem value="e-sewa" id="e-sewa" />
                    <Label htmlFor="e-sewa">E-sewa</Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="khalti" id="khalti" />
                    <Label htmlFor="khalti">Khalti</Label>
                  </div>
                </RadioGroup>

                {errors.paymentMethod && (
                  <p className="text-red-500 text-sm mt-2">{errors.paymentMethod}</p>
                )}
              </CardContent>
            </Card>
          </div>

            <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {buyNowItem ? (                 
                    <div key={buyNowItem.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img
                          src={buyNowItem.image}
                          alt={buyNowItem.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{buyNowItem.title}</p>
                          <p className="text-sm text-gray-600">Qty: {buyNowItem.qty}</p>
                          
                        </div>
                      </div>
                      <p className="font-semibold">${buyNowItem.total.toFixed(2)}</p>
                    </div>
                  ) : (
                    
                    cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                          </div>
                        </div>
                        <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                      </div>
                    ))
                  )}
                </div>
            
                <div className="mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <div>Total Amount</div>
                    <div>${total.toFixed(2)}</div>
                  </div>
                </div>              
            
                <Button
                  variant="outline"
                  className="w-full mt-6 text-lg py-3 cursor-pointer"
                  onClick={handlePlaceOrder}                 
                  disabled={buyNowItem ? false : cart.length === 0}
                >
                  Confirm Order
                </Button>

                <Button
                  variant="outline"
                  className="w-full mt-2 cursor-pointer"
                  onClick={() => router.push("/cart")}
                >
                  Back to Cart
                </Button>

              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}