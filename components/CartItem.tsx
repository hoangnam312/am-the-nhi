'use client';

import { CartItem } from '@/types';
import { formatCurrency } from '@/lib/menuData';

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

/**
 * CartItem component - displays cart item with quantity controls
 */
export default function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const subtotal = item.price * item.quantity;

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm">
      <div className='flex items-center gap-3'>

        {/* Emoji/Image */}
        <div className="text-3xl flex-shrink-0">
          {item.image}
        </div>

        {/* Item details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
          <p className="text-sm text-gray-600">{formatCurrency(item.price)}</p>
        </div>
      </div>


      <div className='flex items-center gap-3 justify-end'>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center font-bold text-white transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Subtotal */}
        <div className="text-right flex-shrink-0 w-20">
          <p className="font-bold text-gray-800">{formatCurrency(subtotal)}</p>
        </div>

        {/* Remove button */}
        <button
          onClick={() => onRemove(item.id)}
          className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center text-red-600 font-bold transition-colors flex-shrink-0"
          aria-label="Remove item"
        >
          ×
        </button>
      </div>

    </div>
  );
}
