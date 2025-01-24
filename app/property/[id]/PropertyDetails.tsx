"use client";

import { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp, Star, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Property {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  state: string;
  city: string;
  landmark: string;
  price: number;
  shippage: number;
  ammenities: string[];
  rent: number;
  priceBreakdown?: {
    basePrice: number;
    gst: number;
    stampDuty: number;
    registrationCharges: number;
    maintenanceDeposit: number;
  };
  reviews?: Array<{
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

interface PropertyDetailsProps {
  property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [reviews, setReviews] = useState(property.reviews || []);

  const handleSubmitReview = () => {
    const newReview = {
      id: reviews.length + 1,
      user: name,
      rating: rating,
      comment: comment,
      date: new Date().toISOString(),
    };

    setReviews([...reviews, newReview]);
    setComment('');
    setName('');
    setRating(5);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-video bg-muted rounded-lg mb-6" />
          <h1 className="text-4xl font-bold mb-4">{property.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mb-6">
            <MapPin className="h-5 w-5" />
            <span>{property.landmark}, {property.city}, {property.state}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Price Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                >
                  {showPriceBreakdown ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </div>
              
              <p className="text-3xl font-bold mb-4">
                ₹{property.price.toLocaleString()}
              </p>

              <AnimatePresence>
                {showPriceBreakdown && property.priceBreakdown && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-2 pt-4 border-t"
                  >
                    <div className="flex justify-between">
                      <span>Base Price</span>
                      <span>₹{property.priceBreakdown.basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (5%)</span>
                      <span>₹{property.priceBreakdown.gst.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stamp Duty (3%)</span>
                      <span>₹{property.priceBreakdown.stampDuty.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Registration Charges</span>
                      <span>₹{property.priceBreakdown.registrationCharges.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maintenance Deposit</span>
                      <span>₹{property.priceBreakdown.maintenanceDeposit.toLocaleString()}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {property.ammenities.map((amenity) => (
                  <motion.span
                    key={amenity}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="px-4 py-2 bg-secondary rounded-full text-sm"
                  >
                    {amenity}
                  </motion.span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
              
              {/* Add Review Form */}
              <div className="mb-8 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        variant={star <= rating ? "default" : "outline"}
                        size="icon"
                        onClick={() => setRating(star)}
                      >
                        <Star className={star <= rating ? "fill-current" : ""} />
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Your Review</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience..."
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={handleSubmitReview}
                  disabled={!comment.trim() || !name.trim()}
                  className="w-full"
                >
                  Submit Review
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{review.user}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.main>
  );
}