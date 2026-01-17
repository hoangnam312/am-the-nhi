// Menu Item Type
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'main' | 'drink' | 'snack';
  image: string;
  description?: string;
}

// Cart Item Type (extends MenuItem with quantity)
export interface CartItem extends MenuItem {
  quantity: number;
}

// Order Type (what gets sent to Google Sheets)
export interface Order {
  orderId: string;
  name: string;
  items: CartItem[];
  totalPrice: number;
  notes: string;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'completed';
}

// Cart Context Types
export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE_CART'; payload: CartItem[] };

// API Response Types
export interface OrderResponse {
  success: boolean;
  orderId?: string;
  error?: string;
}
