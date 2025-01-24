"use client"
import SearchBar from '@/components/SearchBar';
import PropertyCarousel from '@/components/PropertyCarousel';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-background to-muted">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-6xl font-bold mb-6">
            Find Your Perfect Home
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Discover your dream property with our advanced search system. Browse through thousands of listings across multiple cities.
          </p>
          <SearchBar className="max-w-2xl" />
          <div className="mt-8">
            <Link href="/explore">
              <Button variant="outline" className="group">
                Explore Map View
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Properties</h2>
          <PropertyCarousel />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a href="/smartsearch"><div className="p-6 bg-background rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Smart Search</h3>
              <p className="text-muted-foreground">Find properties based on your preferences with our intelligent search system.</p>
            </div></a>
            <div className="p-6 bg-background rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Map Integration</h3>
              <p className="text-muted-foreground">Explore properties visually with our interactive map feature.</p>
            </div>
            <div className="p-6 bg-background rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Detailed Insights</h3>
              <p className="text-muted-foreground">Get comprehensive information about properties and their surroundings.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}