'use client';

import { MenuItem } from '@/types';
import { formatCurrency } from '@/lib/menuData';

interface MenuItemProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

/**
 * MenuItem component - displays individual menu item with add to cart button
 */
export default function MenuItemCard({ item, onAddToCart }: MenuItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
      {/* Emoji/Image */}
      <div className="text-6xl text-center mb-3">
        {item.image}
      </div>

      {/* Item name */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
        {item.name}
      </h3>

      {/* Description */}
      {item.description && (
        <p className="text-sm text-gray-600 mb-3 text-center line-clamp-2">
          {item.description}
        </p>
      )}

      {/* Price */}
      <p className="text-xl font-bold text-primary-600 mb-3 text-center">
        {formatCurrency(item.price)}
      </p>

      {/* Add to Cart button */}
      <button
        onClick={() => onAddToCart(item)}
        className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors active:scale-95"
      >
        Thêm vào giỏ
      </button>
    </div>
  );
}
