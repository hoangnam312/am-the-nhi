'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartState, CartAction, CartItem, MenuItem } from '@/types';

// Initial empty cart state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

/**
 * Calculate total items and total price from cart items
 */
function calculateTotals(items: CartItem[]): CartState {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { items, totalItems, totalPrice };
}

/**
 * Cart reducer function to handle all cart actions
 */
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(i => i.id === action.payload.id);
      let newItems: CartItem[];

      if (existingIndex >= 0) {
        // Item already exists, increment quantity
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // New item, add to cart with quantity 1
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return calculateTotals(newItems);
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return calculateTotals(newItems);
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items
        .map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter(item => item.quantity > 0); // Remove items with quantity 0
      return calculateTotals(newItems);
    }

    case 'CLEAR_CART':
      return initialState;

    case 'HYDRATE_CART':
      return calculateTotals(action.payload);

    default:
      return state;
  }
}

// Create cart context
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

/**
 * Cart Provider component
 * Manages cart state and syncs with localStorage
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Hydration: Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('restaurant-cart');
      if (saved) {
        try {
          const items = JSON.parse(saved);
          dispatch({ type: 'HYDRATE_CART', payload: items });
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error);
        }
      }
    }
  }, []); // Run once on mount

  // Persistence: Save cart to localStorage on every state change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('restaurant-cart', JSON.stringify(state.items));
    }
  }, [state.items]); // Run whenever items change

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook to access cart context
 * Must be used within CartProvider
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
