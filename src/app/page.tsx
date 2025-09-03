'use client';

import { useState } from 'react';
import Image from 'next/image';
import { products, getCategories } from '@/lib/products';
import type { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import AiRecommendations from '@/components/AiRecommendations';

const categories = ['All', ...getCategories()];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-12">
      <section className="relative w-full h-[400px] bg-primary/10 rounded-lg overflow-hidden">
        <Image
          src="https://picsum.photos/1200/400"
          alt="Lush green leaves"
          fill
          className="object-cover"
          data-ai-hint="green leaves"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 shadow-lg">Welcome to Evergreen Shop</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl shadow-md">Discover fresh, quality products for a vibrant life.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
          <div className="flex justify-center flex-wrap gap-2 mb-8">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`capitalize ${selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground'}`}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <AiRecommendations />
        </section>
      </div>
    </div>
  );
}
