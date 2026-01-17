'use client';

import { useState } from 'react';
import { useCart } from './contexts/CartContext';
import { CATEGORIES, getMenuItemsByCategory } from '@/lib/menuData';
import { MenuItem } from '@/types';
import MenuItemCard from '@/components/MenuItem';
import CartFooter from '@/components/CartFooter';

/**
 * Menu Page (Home Page)
 * Displays menu items with category filtering and cart footer
 */
export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất Cả');
  const { state, dispatch } = useCart();

  // Get filtered menu items based on selected category
  const filteredItems = getMenuItemsByCategory(selectedCategory);

  // Handle add to cart
  const handleAddToCart = (item: MenuItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="bg-primary-500 text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-5xl text-center">🔥</div>
          <h1 className="text-3xl font-bold text-center mt-2">Ấm thế nhỉ</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Category tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`tab-button ${
                selectedCategory === category
                  ? 'tab-button-active'
                  : 'tab-button-inactive'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Không tìm thấy món ăn trong danh mục này</p>
          </div>
        )}
      </main>

      {/* Sticky cart footer */}
      <CartFooter
        totalItems={state.totalItems}
        totalPrice={state.totalPrice}
      />
    </div>
  );
}
