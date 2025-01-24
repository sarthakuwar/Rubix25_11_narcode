"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Property {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  price: number;
  city: string;
  state: string;
}

interface MapProps {
  properties: Property[];
}

export default function Map({ properties }: MapProps) {
  const router = useRouter();
  const center = properties.length > 0
    ? [properties[0].latitude, properties[0].longitude]
    : [20.5937, 78.9629]; // India's center coordinates

  return (
    <MapContainer
      center={[center[0], center[1]]}
      zoom={13}
      style={{ height: 'calc(100vh - 4rem)', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={[property.latitude, property.longitude]}
        >
          <Popup>
            <Card className="p-4">
              <h3 className="font-bold text-lg mb-2">{property.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {property.city}, {property.state}
              </p>
              <p className="font-semibold mb-4">
                ₹{property.price.toLocaleString()}
              </p>
              <Button
                onClick={() => router.push(`/property/${property.id}`)}
                className="w-full"
              >
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}