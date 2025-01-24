"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import properties from '@/data.json';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';
  const [landmark, setLandmark] = useState<string>('all');
  const [filteredProperties, setFilteredProperties] = useState(properties.properties);

  // Get unique landmarks
  const landmarks = Array.from(
    new Set(properties.properties.map(p => p.landmark))
  );

  useEffect(() => {
    let filtered = properties.properties.filter(property => 
      property.name.toLowerCase().includes(query) ||
      property.city.toLowerCase().includes(query) ||
      property.state.toLowerCase().includes(query) ||
      property.landmark.toLowerCase().includes(query)
    );

    if (landmark !== 'all') {
      filtered = filtered.filter(property => property.landmark === landmark);
    }

    setFilteredProperties(filtered);
  }, [query, landmark]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Search Results for "{query}"
        </h1>
        <Select value={landmark} onValueChange={setLandmark}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by landmark" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Landmarks</SelectItem>
            {landmarks.map(landmark => (
              <SelectItem key={landmark} value={landmark}>
                {landmark}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map(property => (
          <Link key={property.id} href={`/property/${property.id}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg mb-4" />
                <h2 className="text-xl font-bold mb-2">{property.name}</h2>
                <p className="text-muted-foreground mb-2">
                  {property.city}, {property.state}
                </p>
                <p className="text-lg font-semibold mb-2">
                  ₹{property.price.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {property.landmark}
                </p>
                <div className="flex gap-2">
                  {property.ammenities.map((amenity) => (
                    <span 
                      key={amenity}
                      className="px-3 py-1 bg-secondary rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">
            No properties found matching your search criteria.
          </p>
        </div>
      )}
    </main>
  );
}