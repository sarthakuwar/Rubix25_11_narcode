"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Home, Upload } from 'lucide-react';

export default function RentPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    description: '',
    amenities: '',
    legalDocuments: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would be handled by an API endpoint
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Home className="h-8 w-8" />
            <h1 className="text-4xl font-bold">List Your Property</h1>
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Input
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    placeholder="Apartment, House, Villa, etc."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Monthly Rent (₹)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Property Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amenities">Amenities</Label>
                <Textarea
                  id="amenities"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  placeholder="List amenities (e.g., parking, gym, swimming pool)"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Property Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="legalDocuments">Legal Information</Label>
                <Textarea
                  id="legalDocuments"
                  name="legalDocuments"
                  value={formData.legalDocuments}
                  onChange={handleChange}
                  placeholder="Property papers, ownership details, etc."
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Listing
                <Upload className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Card>
        </div>
      </motion.div>
    </main>
  );
}