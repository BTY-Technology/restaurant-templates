'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { locations } from '@/data/locations';
import { Location } from '@/types';
import { LocationCard } from '@/components/locations/LocationCard';
import { Button } from '@/components/ui/Button';

type ServiceType = 'pickup' | 'delivery' | 'all';

export default function LocationsPage() {
  const [serviceType, setServiceType] = useState<ServiceType>('all');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Filter locations based on service type
  const filteredLocations = useMemo(() => {
    if (serviceType === 'all') {
      return locations;
    }
    // In a real app, you might filter based on delivery zones
    // For now, all locations support both
    return locations;
  }, [serviceType]);

  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
    // In a real app, this would set the pickup location in context/state
    console.log('Selected location:', location);
  };

  // Calculate center point for map
  const mapCenter = useMemo(() => {
    if (selectedLocation) {
      return selectedLocation.coordinates;
    }
    // Default to first location or calculate average
    return locations[0]?.coordinates || { lat: 45.5202, lng: -122.6742 };
  }, [selectedLocation]);

  const mapZoom = selectedLocation ? 15 : 12;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=1920"
            alt="Restaurant locations"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-near-black/70 to-near-black/50" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl text-white mb-6 drop-shadow-2xl">
              Find Us
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
              Three locations across Portland, all serving the same amazing burgers you love.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Type Toggle */}
      <section className="bg-white border-b border-parchment sticky top-0 z-20">
        <div className="max-w-container mx-auto container-padding py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-ketchup"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text-charcoal/80 font-medium">Select your service type:</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={serviceType === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setServiceType('all')}
              >
                All Locations
              </Button>
              <Button
                variant={serviceType === 'pickup' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setServiceType('pickup')}
              >
                Pickup
              </Button>
              <Button
                variant={serviceType === 'delivery' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setServiceType('delivery')}
              >
                Delivery
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-parchment py-8">
        <div className="max-w-container mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl"
          >
            {/* Google Maps Embed */}
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${mapCenter.lat},${mapCenter.lng}&zoom=${mapZoom}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location map"
            />
            {/* Fallback/Placeholder for when no API key */}
            <div className="absolute inset-0 bg-gradient-to-br from-parchment to-mustard/20 flex items-center justify-center">
              <div className="text-center p-8">
                <svg
                  className="w-16 h-16 text-ketchup mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                <p className="text-charcoal/70 text-lg">
                  Interactive map placeholder
                </p>
                <p className="text-charcoal/50 text-sm mt-2">
                  Add your Google Maps API key to enable the map
                </p>
              </div>
            </div>
          </motion.div>

          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-white rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-charcoal/60">Viewing on map:</p>
                  <p className="font-display uppercase text-lg text-near-black">
                    {selectedLocation.name}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLocation(null)}
                >
                  Clear
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Locations List */}
      <section className="section-spacing bg-white">
        <div className="max-w-container mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg text-near-black mb-4">
              Our Locations
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              {filteredLocations.length === 1
                ? 'Showing 1 location'
                : `Showing all ${filteredLocations.length} locations`}
              {serviceType !== 'all' && ` available for ${serviceType}`}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLocations.map((location, index) => (
              <div
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className="cursor-pointer"
              >
                <LocationCard
                  location={location}
                  onSelect={handleSelectLocation}
                  showSelectButton={serviceType === 'pickup' || serviceType === 'all'}
                  index={index}
                />
              </div>
            ))}
          </div>

          {filteredLocations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <svg
                className="w-16 h-16 text-charcoal/30 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xl text-charcoal/70 mb-2">
                No locations found
              </p>
              <p className="text-charcoal/50">
                Try selecting a different service type
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="section-spacing bg-near-black text-white">
        <div className="max-w-container mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-ketchup/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-ketchup"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-display uppercase mb-2">Quick Service</h3>
              <p className="text-white/70">
                Average wait time of 10 minutes or less for pickup orders
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-ketchup/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-ketchup"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-display uppercase mb-2">Order Ahead</h3>
              <p className="text-white/70">
                Skip the line with mobile ordering and curbside pickup
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-ketchup/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-ketchup"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-display uppercase mb-2">Always Fresh</h3>
              <p className="text-white/70">
                Every burger is made to order, never sitting under heat lamps
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-parchment">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-md text-near-black mb-6">
              Can't Make It In?
            </h2>
            <p className="text-lg text-charcoal/70 mb-8 max-w-2xl mx-auto">
              Order delivery through our partners and get Smash & Stack delivered right to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/order"
                className="inline-block bg-ketchup text-white font-medium px-8 py-4 rounded-button hover:bg-ketchup-dark transition-all duration-200"
              >
                Order for Pickup
              </a>
              <a
                href="/order?type=delivery"
                className="inline-block bg-white text-near-black font-medium px-8 py-4 rounded-button border-2 border-charcoal hover:bg-charcoal hover:text-white transition-all duration-200"
              >
                Order Delivery
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
