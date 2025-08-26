import type { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Organic Avocado',
    price: 1.99,
    description: 'Fresh and creamy organic Hass avocado, perfect for toast or salads.',
    category: 'Groceries',
    image: 'https://picsum.photos/seed/avocado/600/600',
    reviews: [
      { id: 1, author: 'Jane D.', rating: 5, comment: 'Perfectly ripe and delicious!' },
      { id: 2, author: 'John S.', rating: 4, comment: 'A bit small but great taste.' },
    ],
  },
  {
    id: 2,
    name: 'Artisan Sourdough Bread',
    price: 5.49,
    description: 'Handcrafted sourdough bread with a crispy crust and soft, chewy interior.',
    category: 'Bakery',
    image: 'https://picsum.photos/seed/bread/600/600',
    reviews: [
      { id: 1, author: 'Emily R.', rating: 5, comment: 'The best sourdough I have ever had.' },
    ],
  },
  {
    id: 3,
    name: 'Cold Brew Coffee Concentrate',
    price: 12.00,
    description: 'Smooth and rich cold brew concentrate. Just add water or milk.',
    category: 'Beverages',
    image: 'https://picsum.photos/seed/coffee/600/600',
    reviews: [
      { id: 1, author: 'Mike T.', rating: 5, comment: 'Makes my morning routine so much easier and tastier.' },
      { id: 2, author: 'Sara L.', rating: 4, comment: 'Strong flavor, a little goes a long way.' },
    ],
  },
  {
    id: 4,
    name: 'Eco-Friendly Cleaning Spray',
    price: 7.99,
    description: 'All-purpose cleaning spray made with plant-derived ingredients. Safe for pets and kids.',
    category: 'Household',
    image: 'https://picsum.photos/seed/cleaning/600/600',
    reviews: [
      { id: 1, author: 'Alex G.', rating: 5, comment: 'Works great and smells amazing!' },
    ],
  },
  {
    id: 5,
    name: 'Lavender Scented Soy Candle',
    price: 18.50,
    description: 'Calming lavender scented candle made from 100% soy wax. 40+ hour burn time.',
    category: 'Home Decor',
    image: 'https://picsum.photos/seed/candle/600/600',
    reviews: [
      { id: 1, author: 'Chloe B.', rating: 5, comment: 'Fills the room with a lovely, relaxing scent.' },
    ],
  },
  {
    id: 6,
    name: 'Stainless Steel Water Bottle',
    price: 24.95,
    description: '32oz insulated stainless steel water bottle. Keeps drinks cold for 24 hours or hot for 12.',
    category: 'Lifestyle',
    image: 'https://picsum.photos/seed/bottle/600/600',
    reviews: [
      { id: 1, author: 'Ben K.', rating: 5, comment: 'Durable and keeps my water ice cold all day.' },
      { id: 2, author: 'Jessica W.', rating: 5, comment: 'Love the sleek design and it never leaks.' },
    ],
  },
   {
    id: 7,
    name: 'Gourmet Olive Oil',
    price: 15.99,
    description: 'Extra virgin olive oil from first cold press, with a robust and fruity flavor.',
    category: 'Groceries',
    image: 'https://picsum.photos/seed/oliveoil/600/600',
    reviews: [
        { id: 1, author: 'Maria P.', rating: 5, comment: 'Amazing flavor, great for salads and cooking.' },
    ],
  },
  {
    id: 8,
    name: 'Handmade Ceramic Mug',
    price: 22.00,
    description: 'A unique, handcrafted ceramic mug, perfect for your favorite hot beverage.',
    category: 'Household',
    image: 'https://picsum.photos/seed/mug/600/600',
    reviews: [
        { id: 1, author: 'David L.', rating: 5, comment: 'Beautiful and feels great to hold.' },
    ],
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id);
}

export function getCategories(): string[] {
    const categories = new Set(products.map(p => p.category));
    return Array.from(categories);
}
