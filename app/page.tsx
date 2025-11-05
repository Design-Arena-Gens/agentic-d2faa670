import dynamic from 'next/dynamic';
import { slides } from '@/data/slides';

const SlideDeck = dynamic(() => import('@/components/Slide'), { ssr: false });

export default function Page() {
  return (
    <main>
      <SlideDeck slides={slides} />
    </main>
  );
}
