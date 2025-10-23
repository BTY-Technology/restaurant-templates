'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { getAllLocations } from '@/data/locations';
import { formatPhoneNumber } from '@/utils/formatting';
import { Location } from '@/types/location';
import styles from './page.module.css';

export default function LocationsPage() {
  const locations = getAllLocations();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(locations[0]);

  const getGoogleMapsUrl = (location: Location) => {
    const address = `${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zipCode}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  const getMapEmbedUrl = (location: Location) => {
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${location.coordinates.lat},${location.coordinates.lng}&zoom=15`;
  };

  const getCurrentDayHours = (location: Location) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    return location.hours.find((h) => h.day === today);
  };

  const isOpenNow = (location: Location) => {
    const todayHours = getCurrentDayHours(location);
    if (!todayHours || todayHours.closed) return false;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const parseTime = (timeStr: string) => {
      const [time, period] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    const openTime = parseTime(todayHours.open!);
    const closeTime = parseTime(todayHours.close!);

    return currentTime >= openTime && currentTime <= closeTime;
  };

  return (
    <>
      {/* Header Section */}
      <section className={styles.header}>
        <Container>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Our Locations</h1>
            <p className={styles.description}>
              Visit us at any of our three San Francisco locations for an unforgettable dining experience
            </p>
          </div>
        </Container>
      </section>

      {/* Locations Grid */}
      <section className={styles.locationsSection}>
        <Container>
          <div className={styles.locationsGrid}>
            {locations.map((location) => {
              const isOpen = isOpenNow(location);
              const todayHours = getCurrentDayHours(location);

              return (
                <div key={location.id} className={styles.locationCard}>
                  {/* Location Image */}
                  {location.images && location.images.length > 0 && (
                    <div className={styles.locationImage}>
                      <Image
                        src={location.images[0]}
                        alt={location.name}
                        width={600}
                        height={400}
                        className={styles.image}
                      />
                      <div className={styles.statusBadge}>
                        <span className={`${styles.statusDot} ${isOpen ? styles.open : styles.closed}`} />
                        {isOpen ? 'Open Now' : 'Closed'}
                      </div>
                    </div>
                  )}

                  {/* Location Details */}
                  <div className={styles.locationContent}>
                    <div className={styles.locationHeader}>
                      <h2 className={styles.locationName}>{location.name}</h2>
                      {location.isMainLocation && (
                        <span className={styles.mainBadge}>Main Location</span>
                      )}
                    </div>

                    {/* Address */}
                    <div className={styles.infoSection}>
                      <div className={styles.infoLabel}>Address</div>
                      <div className={styles.infoValue}>
                        {location.address.street}<br />
                        {location.address.city}, {location.address.state} {location.address.zipCode}
                      </div>
                    </div>

                    {/* Contact */}
                    <div className={styles.infoSection}>
                      <div className={styles.infoLabel}>Contact</div>
                      <div className={styles.infoValue}>
                        <a href={`tel:${location.phone}`} className={styles.link}>
                          {formatPhoneNumber(location.phone)}
                        </a>
                        <br />
                        <a href={`mailto:${location.email}`} className={styles.link}>
                          {location.email}
                        </a>
                      </div>
                    </div>

                    {/* Today's Hours */}
                    {todayHours && (
                      <div className={styles.infoSection}>
                        <div className={styles.infoLabel}>Today's Hours</div>
                        <div className={styles.infoValue}>
                          {todayHours.closed ? (
                            <span className={styles.closedText}>Closed</span>
                          ) : (
                            `${todayHours.open} - ${todayHours.close}`
                          )}
                        </div>
                      </div>
                    )}

                    {/* All Hours */}
                    <div className={styles.hoursSection}>
                      <div className={styles.infoLabel}>Hours</div>
                      <div className={styles.hoursGrid}>
                        {location.hours.map((hours) => (
                          <div key={hours.day} className={styles.hoursRow}>
                            <span className={styles.day}>{hours.day}</span>
                            <span className={styles.time}>
                              {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    {location.features && location.features.length > 0 && (
                      <div className={styles.featuresSection}>
                        <div className={styles.infoLabel}>Features</div>
                        <div className={styles.featuresList}>
                          {location.features.map((feature) => (
                            <span key={feature} className={styles.featureTag}>
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className={styles.actions}>
                      <a
                        href={getGoogleMapsUrl(location)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="primary">Get Directions</Button>
                      </a>
                      <button
                        onClick={() => setSelectedLocation(location)}
                        className={styles.viewMapButton}
                      >
                        View on Map
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Map Section */}
      {selectedLocation && (
        <section className={styles.mapSection}>
          <Container>
            <h2 className={styles.mapTitle}>
              Map: {selectedLocation.name}
            </h2>
            <div className={styles.mapContainer}>
              {/* Note: Replace with actual Google Maps API key */}
              <div className={styles.mapPlaceholder}>
                <div className={styles.mapContent}>
                  <h3>{selectedLocation.name}</h3>
                  <p>
                    {selectedLocation.address.street}<br />
                    {selectedLocation.address.city}, {selectedLocation.address.state} {selectedLocation.address.zipCode}
                  </p>
                  <p className={styles.coordinates}>
                    Coordinates: {selectedLocation.coordinates.lat}, {selectedLocation.coordinates.lng}
                  </p>
                  <a
                    href={getGoogleMapsUrl(selectedLocation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.openInMaps}
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
              {/* Uncomment when you have a Google Maps API key:
              <iframe
                src={getMapEmbedUrl(selectedLocation)}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              */}
            </div>
          </Container>
        </section>
      )}

      {/* Pickup Location Selector */}
      <section className={styles.pickupSection}>
        <Container>
          <div className={styles.pickupContent}>
            <h2 className={styles.pickupTitle}>Order for Pickup</h2>
            <p className={styles.pickupDescription}>
              Select your preferred pickup location when placing your order
            </p>
            <div className={styles.pickupButtons}>
              {locations.map((location) => (
                <a key={location.id} href="/menu">
                  <Button variant="outline">{location.name}</Button>
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
