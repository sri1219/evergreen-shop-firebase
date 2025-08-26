'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Spinner from '@/components/Spinner';

export default function PageLoading() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  // This is a bit of a workaround to show a loading indicator on navigation.
  // We can't just use `loading.tsx` for instant client-side transitions.
  // We'll use a link click listener to set loading state.
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Check if the click is on a Next.js Link or a child of it
      let target = e.target as HTMLElement;
      while (target && target.tagName !== 'A') {
        target = target.parentElement as HTMLElement;
      }
      
      if (target && target.tagName === 'A') {
        const href = target.getAttribute('href');
        // Check if it's an internal link
        if (href && href.startsWith('/')) {
            const currentUrl = window.location.pathname + window.location.search;
            if(href !== currentUrl) {
                setLoading(true);
            }
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Spinner className="h-16 w-16 text-primary" />
    </div>
  );
}
