"use client";

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import properties from '@/data.json';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function PropertyCarousel() {
  const featuredProperties = properties.properties.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.5}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 200,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="w-full py-16"
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {featuredProperties.map((property) => (
          <SwiperSlide key={property.id} className="pb-8">
            <Link href={`/property/${property.id}`}>
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <Card className="overflow-hidden transform-gpu">
                  <CardContent className="p-6 relative">
                    <div className="aspect-video bg-muted rounded-lg mb-4 relative overflow-hidden group">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={false}
                      />
                    </div>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-bold mb-2"
                    >
                      {property.name}
                    </motion.h3>
                    <p className="text-muted-foreground mb-2">
                      {property.city}, {property.state}
                    </p>
                    <p className="text-lg font-semibold">
                      ₹{property.price.toLocaleString()}
                    </p>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {property.ammenities.slice(0, 3).map((amenity) => (
                        <motion.span
                          key={amenity}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="px-3 py-1 bg-secondary rounded-full text-sm"
                        >
                          {amenity}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}