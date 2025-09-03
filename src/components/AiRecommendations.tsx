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
  const [isStaticExport, setIsStaticExport] = useState(false);

  useEffect(() => {
    // This component's AI features will not work in a static export.
    // We check for `window` to confirm we're on the client-side
    // and can safely assume a static export if certain conditions apply.
    // In a real-world scenario, you might use an environment variable.
    if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
      setIsStaticExport(true);
      return;
    }

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
        // This is expected in a static export environment
        setRecommendations([]);
        setIsStaticExport(true);
      } finally {
        setLoading(false);
      }
    }

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
  
  // Don't render anything if we're in a static export environment
  // and recommendations can't be fetched.
  if (isStaticExport && recommendations.length === 0 && !loading) {
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
          <p className="text-muted-foreground">
            {isStaticExport
              ? "AI recommendations are not available in this view."
              : "No recommendations to show right now."}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
