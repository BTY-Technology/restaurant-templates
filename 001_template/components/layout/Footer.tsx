'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Container } from './Container';
import styles from './Footer.module.css';

const quickLinks = [
  { name: 'Menu', href: '/menu' },
  { name: 'Locations', href: '/locations' },
  { name: 'About', href: '/about' },
  { name: 'Order Online', href: '/order' },
  { name: 'Careers', href: '/careers' },
];

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Accessibility', href: '/accessibility' },
];

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setIsSubscribing(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      setSubscriptionStatus('success');
      setEmail('');

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubscriptionStatus('idle');
      }, 3000);
    }, 1000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Wave Pattern */}
      <div className={styles.wavePattern} aria-hidden="true" />

      <Container>
        {/* Main Footer Content */}
        <div className={styles.mainContent}>
          {/* Column 1: About Us */}
          <div className={styles.column}>
            <div className={styles.logoSection}>
              <div className={styles.logo}>
                <div className={styles.logoIcon}>
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 5L25 15H35L27 21L30 31L20 25L10 31L13 21L5 15H15L20 5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span className={styles.logoText}>Golden Wok</span>
              </div>
              <p className={styles.description}>
                Experience authentic Chinese cuisine prepared with the finest ingredients and traditional
                cooking methods. Serving our community with passion since 1998.
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={styles.link}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contact Us</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <a href="tel:+15551234567" className={styles.contactLink}>
                  (555) 123-4567
                </a>
              </li>
              <li className={styles.contactItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="m22 6-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <a href="mailto:info@goldenwok.com" className={styles.contactLink}>
                  info@goldenwok.com
                </a>
              </li>
              <li className={styles.contactItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <address className={styles.address}>
                  123 Main Street<br />
                  Chinatown, CA 94108
                </address>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us & Newsletter */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Follow Us</h3>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className={styles.newsletter}>
              <h4 className={styles.newsletterTitle}>Join Our Newsletter</h4>
              <p className={styles.newsletterDescription}>
                Get special offers and updates delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  success={subscriptionStatus === 'success' ? 'Successfully subscribed!' : undefined}
                  error={subscriptionStatus === 'error' ? 'Something went wrong. Please try again.' : undefined}
                  aria-label="Email address for newsletter"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  loading={isSubscribing}
                  disabled={!email}
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className={styles.mapSection}>
          <h3 className={styles.mapTitle}>Visit Our Main Location</h3>
          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0862478992975!2d-122.40889668468158!3d37.79377797975762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580c7e8a3d4cb%3A0x8f7b9c8e4c8d8e8e!2sSan%20Francisco%20Chinatown!5e0!3m2!1sen!2sus!4v1635789012345!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Golden Wok Main Location"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} Golden Wok. All rights reserved.
          </p>
          <nav className={styles.legalNav} aria-label="Legal links">
            <ul className={styles.legalLinks}>
              {legalLinks.map((link, index) => (
                <li key={link.name}>
                  <Link href={link.href} className={styles.legalLink}>
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className={styles.separator} aria-hidden="true">
                      |
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
};
