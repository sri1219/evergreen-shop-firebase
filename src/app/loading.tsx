import Spinner from '@/components/Spinner';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Spinner className="h-16 w-16 text-primary" />
    </div>
  );
}
