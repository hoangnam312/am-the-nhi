import { MenuItem } from '@/types';

// Hardcoded menu items for the restaurant
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'pho-bo',
    name: 'Phở Bò',
    price: 45000,
    category: 'main',
    image: '🍜',
    description: 'Phở bò truyền thống với rau thơm tươi'
  },
  {
    id: 'bun-cha',
    name: 'Bún Chả',
    price: 40000,
    category: 'main',
    image: '🍲',
    description: 'Thịt nướng với bún và nước mắm chua ngọt'
  },
  {
    id: 'com-suon',
    name: 'Cơm Sườn',
    price: 42000,
    category: 'main',
    image: '🍱',
    description: 'Sườn nướng với cơm trắng và dưa chua'
  },
  {
    id: 'iced-tea',
    name: 'Trà Đá',
    price: 10000,
    category: 'drink',
    image: '🧊',
    description: 'Trà đá truyền thống Việt Nam'
  },
  {
    id: 'coffee',
    name: 'Cà Phê Sữa Đá',
    price: 15000,
    category: 'drink',
    image: '☕',
    description: 'Cà phê phin với sữa đặc'
  }
];

// Category labels
export const CATEGORIES = ['Tất Cả', 'Món Chính', 'Đồ Uống'] as const;

/**
 * Filter menu items by category
 * @param category - Category label ('Tất Cả', 'Món Chính', or 'Đồ Uống')
 * @returns Filtered array of menu items
 */
export function getMenuItemsByCategory(category: string): MenuItem[] {
  if (category === 'Tất Cả') {
    return MENU_ITEMS;
  }

  const categoryMap: { [key: string]: 'main' | 'drink' } = {
    'Món Chính': 'main',
    'Đồ Uống': 'drink'
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
