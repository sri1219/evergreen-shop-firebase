'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import Spinner from './Spinner';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Lightbulb } from 'lucide-react';

export default function AiRecommendations() {
  const { cartItems } = useCart();
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRecommendations() {
      if (cartItems.length === 0) {
        setRecommendations([]);
        return;
      }
      
      setLoading(true);
      try {
        const browsingHistory = cartItems.map(item => item.name).join(', ');
        const result = await getProductRecommendations({ browsingHistory });
        setRecommendations(result.recommendations);
      } catch (error) {
        console.error("Failed to get AI recommendations:", error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    }

    // Debounce the call to avoid too many requests
    const handler = setTimeout(() => {
        fetchRecommendations();
    }, 500);

    return () => {
        clearTimeout(handler);
    };

  }, [cartItems]);

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Lightbulb className="h-6 w-6" />
          <span>You Might Also Like</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <Spinner className="w-8 h-8 text-primary" />
          </div>
        ) : recommendations.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No recommendations to show right now.</p>
        )}
      </CardContent>
    </Card>
  );
}
