import dynamic from 'next/dynamic';

const HomeFinder = dynamic(() => import('@/components/home-finder'), { ssr: false });

export default function smartsearch() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <main className="container mx-auto px-4 py-8">
        <HomeFinder />
      </main>
    </div>
  );
}
