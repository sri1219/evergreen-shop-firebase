'use client';

import Link from 'next/link';
import { Leaf, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';

export default function Header() {
  const { cartCount } = useCart();
  
  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
              <Leaf className="h-7 w-7" />
              <span>Evergreen Shop</span>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/" passHref>
              <Button variant="ghost">Home</Button>
            </Link>
            <Link href="/cart" passHref>
              <Button variant="ghost" className="relative">
                <ShoppingBag className="h-6 w-6" />
                {cartCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-1 text-xs">
                    {cartCount}
                  </Badge>
                )}
                 <span className="sr-only">Shopping Cart</span>
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
