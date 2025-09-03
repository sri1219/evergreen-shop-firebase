'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import type { CartItem as CartItemType } from '@/lib/types';
import { Card } from './ui/card';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <Card className="flex items-center p-4">
      <div className="relative h-24 w-24 rounded-md overflow-hidden mr-4">
        <Image src={item.image} alt={item.name} fill className="object-cover" data-ai-hint="product image" unoptimized/>
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2 mx-4">
        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={item.quantity}
          readOnly
          className="w-14 text-center"
          min="1"
        />
        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
        <Trash2 className="h-5 w-5 text-destructive" />
      </Button>
    </Card>
  );
}
