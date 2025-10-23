'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Location } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface LocationCardProps {
  location: Location;
  onSelect?: (location: Location) => void;
  showSelectButton?: boolean;
  index?: number;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onSelect,
  showSelectButton = false,
  index = 0,
}) => {
  // Determine if location is currently open
  const isOpen = useMemo(() => {
    const now = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = dayNames[now.getDay()];
    const currentHours = location.hours[today];

    if (!currentHours || currentHours.toLowerCase() === 'closed') {
      return false;
    }

    // Parse hours (e.g., "11:00 AM - 10:00 PM")
    const [openTime, closeTime] = currentHours.split(' - ');

    const parseTime = (timeStr: string): number => {
      const [time, period] = timeStr.trim().split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      let hour24 = hours;

      if (period === 'PM' && hours !== 12) {
        hour24 = hours + 12;
      } else if (period === 'AM' && hours === 12) {
        hour24 = 0;
      }

      return hour24 * 60 + minutes;
    };

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const openMinutes = parseTime(openTime);
    const closeMinutes = parseTime(closeTime);

    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  }, [location.hours]);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.address}, ${location.city}, ${location.state} ${location.zip}`
  )}`;

  const phoneLink = location.phone.replace(/[^0-9]/g, '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <Card hoverable padding="lg" className="h-full">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-2xl font-display uppercase text-near-black">
              {location.name}
            </h3>
            <Badge
              variant={isOpen ? 'default' : 'default'}
              size="sm"
              className={isOpen ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
            >
              {isOpen ? 'Open Now' : 'Closed'}
            </Badge>
          </div>
        </div>

        {/* Address */}
        <div className="mb-4 text-charcoal/80">
          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-ketchup mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <p>{location.address}</p>
              <p>{location.city}, {location.state} {location.zip}</p>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <a
            href={`tel:+1${phoneLink}`}
            className="flex items-center gap-2 text-charcoal/80 hover:text-ketchup transition-colors"
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>{location.phone}</span>
          </a>
        </div>

        {/* Hours */}
        <div className="mb-4">
          <h4 className="font-display uppercase text-sm text-near-black mb-2">Hours</h4>
          <div className="space-y-1">
            {Object.entries(location.hours).map(([day, hours]) => {
              const now = new Date();
              const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
              const today = dayNames[now.getDay()];
              const isToday = day === today;

              return (
                <div
                  key={day}
                  className={`flex justify-between text-sm ${
                    isToday ? 'font-semibold text-near-black' : 'text-charcoal/70'
                  }`}
                >
                  <span>{day}</span>
                  <span>{hours}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features */}
        {location.features && location.features.length > 0 && (
          <div className="mb-6">
            <h4 className="font-display uppercase text-sm text-near-black mb-2">Features</h4>
            <div className="flex flex-wrap gap-2">
              {location.features.map((feature) => (
                <Badge key={feature} variant="default" size="sm">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-parchment">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="outline" size="sm" fullWidth>
              <svg
                className="w-4 h-4 mr-2"
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
              Get Directions
            </Button>
          </a>
          {showSelectButton && onSelect && (
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={() => onSelect(location)}
            >
              Select for Pickup
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
