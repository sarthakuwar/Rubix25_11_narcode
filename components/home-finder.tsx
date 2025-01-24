"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Send, MapPin, IndianRupee, Wifi, Shield, Dumbbell, AlertCircle, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getHomeRecommendations, type House } from '@/lib/gemini';

type MatchedHouse = House & { matchScore: number };

export default function HomeFinder() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<MatchedHouse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const result = await getHomeRecommendations(description);
      if (result.matches.length === 0) {
        setError("No matching homes found. Try adjusting your description.");
      }
      setMatches(result.matches || []);
    } catch (error) {
      console.error('Error:', error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'security':
        return <Shield className="w-4 h-4" />;
      case 'gym':
        return <Dumbbell className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Find Your Dream Home</h1>
        <p className="text-muted-foreground">
          Describe your ideal home and let AI find the perfect match for you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your ideal home... (e.g., I'm looking for a spacious home in Gujarat with a gym and good security)"
          className="min-h-[120px]"
        />
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading || !description.trim()}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              Searching
              <span className="animate-pulse">...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Find Matches
            </span>
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {matches.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Recommended Homes</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {matches.map((house) => (
              <Card key={house.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{house.name}</h3>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{house.city}, {house.state}</span>
                      </div>
                    </div>
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {house.matchScore}% Match
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Home className="w-4 h-4" />
                      <span>{house.landmark}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <IndianRupee className="w-4 h-4" />
                      <span>Price: {formatPrice(house.price)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <IndianRupee className="w-4 h-4" />
                      <span>Rent: {formatPrice(house.rent)}/month</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {house.ammenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full text-sm"
                      >
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </div>
                    ))}
                  </div><Button
                onClick={() => router.push(`/property/${house.id}`)}
                className="w-full"
              >
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}