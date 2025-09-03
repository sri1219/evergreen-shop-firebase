import { getProductById, products } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddToCartForm from '@/components/AddToCartForm';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return products.map(product => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(Number(params.id));

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint="product image"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-3xl font-semibold text-primary mb-4">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground text-lg mb-6">{product.description}</p>
          
          <AddToCartForm product={product} />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          {product.reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{review.author}</CardTitle>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
