export default function Footer() {
  return (
    <div className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li> <a href="/" className="hover:text-white transition">Home</a></li>        
            <li><a href="/cart" className="hover:text-white transition">Cart</a></li>
            <li><a href="/checkout" className="hover:text-white transition">Checkout</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/contact" className="hover:text-white transition">Contact</a> </li>
          </ul>
        </div>

     
        <div>
          <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm mb-3">Subscribe for new products & offers.</p>
        </div>

      </div>
    </div>
  );
}
