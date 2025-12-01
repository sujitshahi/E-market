'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent} from "@/components/ui/card";
import { useRouter } from 'next/navigation';

interface OrderItem {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
}

interface OrderHistory {
  id: number | string;
  items: OrderItem[];
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
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const savedOrders = localStorage.getItem("orderHistory");
    if (savedOrders) {
      try {
        setOrderHistory(JSON.parse(savedOrders));
      } catch (err) {
        console.log("order history load error", err);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="container mx-auto p-6">Loading order history...</div>;
  }

  if (orderHistory.length === 0) {
    return (
      <div className="mx-auto p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">No Orders Yet</h1>
          <Button className="border-2 cursor-pointer" onClick={() => router.push("/")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Order Summary</h1>
        <div className="flex gap-2">
          <Button className='cursor-pointer' variant="outline"onClick={() => router.push("/cart")}>
            Back to Cart
          </Button>
          <Button className='cursor-pointer' variant="outline" onClick={() => router.push("/")}>
            Continue Shopping
          </Button>
        </div>
      </div>

      <div className="">
        {orderHistory.map((order) => (
          <Card key={order.id}  className="border-2">            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 rounded-lg">
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <p className="text-sm">{order.firstName} {order.lastName}</p>
                  <p className="text-sm">{order.email}</p>
                  <p className="text-sm">{order.phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Shipping & Payment</h3>
                  <p className="text-sm">{order.address}</p>
                  <p className="text-sm mt-1">
                    Payment: <span className="font-medium">{order.paymentMethod}</span>
                  </p>
                </div>
              </div>

              
              <h3 className="font-semibold mb-4">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.qty}</p>
                        <p className="text-sm text-gray-600">Price per unit: ${item.price}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              
              <div className="mt-6 pt-4">
                <div className="flex justify-between items-center">
                  <div className="text-right">                   
                    <div className="flex justify-between text-lg font-bold pt-2 mt-2">
                      <div>Total:</div>
                      <div>${order.total}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

