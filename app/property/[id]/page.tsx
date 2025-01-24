import properties from '@/data.json';
import PropertyDetails from './PropertyDetails';

// This is required for static site generation with dynamic routes
export function generateStaticParams() {
  return properties.properties.map((property) => ({
    id: property.id.toString(),
  }));
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  const property = properties.properties.find(p => p.id.toString() === params.id);
  
  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1>Property not found</h1>
      </div>
    );
  }

  return <PropertyDetails property={property} />;
}