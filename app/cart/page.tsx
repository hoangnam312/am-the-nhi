'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';
import CartItemCard from '@/components/CartItem';
import { formatCurrency } from '@/lib/menuData';
import { OrderResponse } from '@/types';

/**
 * Cart Page
 * Review cart items, enter table number and notes, submit order
 */
export default function CartPage() {
  const router = useRouter();
  const { state, dispatch } = useCart();
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Handle quantity update
  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  // Handle item removal
  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  // Handle order submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate table number
    if (!name.trim()) {
      setError('Vui lòng nhập tên của bạn của bạn');
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit order to API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          items: state.items,
          totalPrice: state.totalPrice,
          notes: notes.trim(),
        }),
      });

      const data: OrderResponse = await response.json();

      if (data.success && data.orderId) {
        // Clear cart
        dispatch({ type: 'CLEAR_CART' });

        // Navigate to success page
        router.push(`/success?orderId=${data.orderId}&name=${name.trim()}`);
      } else {
        setError(data.error || 'Không thể gửi đơn hàng. Vui lòng thử lại.');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Order submission error:', err);
      setError('Không thể kết nối với máy chủ. Vui lòng kiểm tra kết nối và thử lại.');
      setIsSubmitting(false);
    }
  };

  // Empty cart state
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Giỏ hàng trống</h1>
          <p className="text-gray-600 mb-6">Hãy thêm các món ngon từ thực đơn!</p>
          <Link
            href="/"
            className="btn-primary inline-block"
          >
            Xem Thực Đơn
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link
            href="/"
            className="text-primary-500 hover:text-primary-600 font-semibold"
          >
            ← Quay lại
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Đơn Hàng Của Bạn</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Cart items */}
        <div className="space-y-3 mb-6">
          {state.items.map(item => (
            <CartItemCard
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Tổng số món:</span>
            <span className="font-semibold">{state.totalItems}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-lg font-bold text-gray-800">Tổng cộng:</span>
            <span className="text-2xl font-bold text-primary-500">
              {formatCurrency(state.totalPrice)}
            </span>
          </div>
        </div>

        {/* Order form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Thông Tin Đơn Hàng</h2>

          {/* Name input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Tên Của Bạn <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Nhập tên của bạn của bạn"
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Notes textarea */}
          <div className="mb-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Ghi Chú (Tùy chọn)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input-field"
              placeholder="Yêu cầu đặc biệt hoặc chế độ ăn kiêng?"
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full"
          >
            {isSubmitting ? 'Đang gửi đơn hàng...' : 'Xác Nhận Đơn Hàng'}
          </button>
        </form>
      </main>
    </div>
  );
}
