"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import properties from '@/data.json';
import Link from 'next/link';

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className = "" }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState(properties.properties);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const filtered = properties.properties.filter(property =>
        property.name.toLowerCase().includes(query.toLowerCase()) ||
        property.city.toLowerCase().includes(query.toLowerCase()) ||
        property.state.toLowerCase().includes(query.toLowerCase()) ||
        property.landmark.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProperties(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Input
            type="text"
            placeholder="Search by location, landmark, or property name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-4 pr-12 py-6 text-lg rounded-lg"
          />
          <Button 
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Search className="h-5 w-5" />
          </Button>
        </motion.div>
      </form>

      <AnimatePresence>
        {showResults && filteredProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 z-50"
          >
            <Card className="p-2 max-h-[400px] overflow-y-auto">
              {filteredProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/property/${property.id}`}
                  onClick={() => setShowResults(false)}
                >
                  <motion.div
                    whileHover={{ backgroundColor: 'hsl(var(--muted))' }}
                    className="p-3 rounded-md cursor-pointer"
                  >
                    <h4 className="font-semibold">{property.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {property.landmark}, {property.city}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}