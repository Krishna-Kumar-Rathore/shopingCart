import React, { useEffect, useState } from 'react';
import CartItem from '../components/Cartitem';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const { cart } = useSelector((state) => state);
  console.log('Cart data : ', cart);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  // ✅ Checkout Button Functionality
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty! Add items first.');
      return;
    }

    toast.success('Proceeding to checkout...');
    // TODO: Add actual checkout logic here (e.g., navigate to a payment page)
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {cart.length > 0 ? (
        <div className="flex flex-col md:flex-row justify-center gap-10">
          {/* Cart Items Section */}
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
            {cart.map((item, index) => (
              <CartItem key={item.id} item={item} itemIndex={index} />
            ))}
          </div>

          {/* Cart Summary Section */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Your Cart Summary</h2>
            <p className="text-lg text-gray-600 mb-2">
              <span className="font-medium">Total Items:</span> {cart.length}
            </p>
            <p className="text-lg font-bold text-gray-800 mb-6">
              Total Amount: <span className="text-green-600">${totalAmount}</span>
            </p>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all"
              onClick={handleCheckout} // ✅ Checkout Button Click
            >
              Checkout Now
            </button>
          </div>
        </div>
      ) : (
        // Empty Cart Section
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Your Cart is Empty</h1>
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
