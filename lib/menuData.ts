import { MenuItem } from '@/types';

// Hardcoded menu items for the restaurant
export const MENU_ITEMS: MenuItem[] = [
  // Drinks
  {
    id: 'cacao',
    name: 'Cacao',
    price: 25000,
    category: 'drink',
    image: '🍫',
    description: 'Cacao nóng/đá thơm ngon'
  },
  {
    id: 'quat-em-di',
    name: 'Quất Em Đi',
    price: 15000,
    category: 'drink',
    image: '🍋',
    description: 'Nước quất tươi mát'
  },
  {
    id: 'phong-xa',
    name: 'Phóng Xạ',
    price: 20000,
    category: 'drink',
    image: '☢️',
    description: 'Thức uống phóng xạ đặc biệt'
  },
  {
    id: 'bi-dao',
    name: 'Bí Đao',
    price: 15000,
    category: 'drink',
    image: '🥒',
    description: 'Nước bí đao thanh mát'
  },
  {
    id: 'hong-tra-sua',
    name: 'Hồng Trà Sữa',
    price: 20000,
    category: 'drink',
    image: '🥛',
    description: 'Hồng trà sữa thơm béo'
  },
  {
    id: 'khoai-mon-bong-benh',
    name: 'Khoai Môn Bồng Bềnh',
    price: 20000,
    category: 'drink',
    image: '🍠',
    description: 'Thức uống khoai môn béo ngậy'
  },
  // Skewers
  {
    id: 'xien-thit',
    name: 'Xiên Thịt',
    price: 5000,
    category: 'snack',
    image: '🍢',
    description: 'Xiên thịt'
  },
  {
    id: 'xien-xuc-xich',
    name: 'XXX',
    price: 10000,
    category: 'snack',
    image: '🌭',
    description: 'Xiên xúc xích'
  },
  {
    id: 'xien-cha-muc',
    name: 'Xiên Chả Mực',
    price: 5000,
    category: 'snack',
    image: '🦑',
    description: 'Xiên chả mực'
  }
];

// Category labels
export const CATEGORIES = ['Tất Cả', 'Đồ Uống', 'Đồ Nướng'] as const;

/**
 * Filter menu items by category
 * @param category - Category label ('Tất Cả', 'Món Chính', or 'Đồ Uống')
 * @returns Filtered array of menu items
 */
export function getMenuItemsByCategory(category: string): MenuItem[] {
  if (category === 'Tất Cả') {
    return MENU_ITEMS;
  }

  const categoryMap: { [key: string]: 'drink' | 'snack' } = {
    'Đồ Uống': 'drink',
    'Đồ Nướng': 'snack'
  };

  const categoryKey = categoryMap[category];
  return MENU_ITEMS.filter(item => item.category === categoryKey);
}

/**
 * Format price in Vietnamese currency format
 * @param amount - Price amount in VND
 * @returns Formatted string like "45,000đ"
 */
export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}đ`;
}
