import Spinner from '@/components/Spinner';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full min-h-[calc(100vh-10rem)] w-full">
      <Spinner className="h-12 w-12 text-primary" />
    </div>
  );
}
