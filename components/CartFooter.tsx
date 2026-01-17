'use client';

import Link from 'next/link';
import { formatCurrency } from '@/lib/menuData';

interface CartFooterProps {
  totalItems: number;
  totalPrice: number;
}

/**
 * CartFooter component - sticky footer showing cart summary
 * Only displays when cart has items
 */
export default function CartFooter({ totalItems, totalPrice }: CartFooterProps) {
  // Don't show footer if cart is empty
  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Cart summary */}
        <div className="flex items-center gap-3">
          <div className="text-2xl">🛒</div>
          <div>
            <p className="text-sm text-gray-600">
              {totalItems} {totalItems === 1 ? 'món' : 'món'}
            </p>
            <p className="text-lg font-bold text-gray-800">
              {formatCurrency(totalPrice)}
            </p>
          </div>
        </div>

        {/* View Cart button */}
        <Link
          href="/cart"
          className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors active:scale-95 whitespace-nowrap"
        >
          Xem Giỏ Hàng
        </Link>
      </div>
    </div>
  );
}
