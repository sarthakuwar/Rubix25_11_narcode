"use client";

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import properties from '@/data.json';

// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-4rem)] bg-muted flex items-center justify-center">
      <p className="text-lg">Loading map...</p>
    </div>
  ),
});

export default function ExplorePage() {
  useEffect(() => {
    // Add Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <MapWithNoSSR properties={properties.properties} />
    </main>
  );
}