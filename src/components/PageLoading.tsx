'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Spinner from '@/components/Spinner';

export default function PageLoading() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a static export, there's no client-side navigation that needs a loading spinner
    // so we can just set loading to false.
    if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
        setLoading(false);
        return;
    }

    setLoading(false);
  }, [pathname, searchParams]);


  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Spinner className="h-16 w-16 text-primary" />
    </div>
  );
}
