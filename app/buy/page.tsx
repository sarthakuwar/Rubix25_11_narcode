"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import properties from '@/data.json';

export default function BuyPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Properties for Sale</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.properties.map((property) => (
            <motion.div
              key={property.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={`/property/${property.id}`}>
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-muted" />
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{property.name}</h2>
                    <p className="text-muted-foreground mb-2">
                      {property.city}, {property.state}
                    </p>
                    <p className="text-xl font-semibold mb-4">
                      ₹{property.price.toLocaleString()}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {property.ammenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-3 py-1 bg-secondary rounded-full text-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}