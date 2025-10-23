'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Modal, ModalHeader, ModalBody } from '@/components/ui/Modal';
import { CartSummary } from '@/components/features/CartSummary';
import { Container } from './Container';
import styles from './Header.module.css';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'About', href: '/about' },
  { name: 'Locations', href: '/locations' },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | '中文'>('EN');

  // Handle scroll for transparent/blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? '中文' : 'EN');
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <Container>
        <nav className={styles.nav} aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Golden Wok Home">
            <div className={styles.logoIcon}>
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M20 5L25 15H35L27 21L30 31L20 25L10 31L13 21L5 15H15L20 5Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className={styles.logoText}>
              Golden Wok
              <span className={styles.logoSubtext}>Authentic Chinese Cuisine</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <ul className={styles.navList}>
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${
                      pathname === item.href ? styles.navLinkActive : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Actions */}
          <div className={styles.desktopActions}>
            {/* Search Button */}
            <button
              className={styles.iconButton}
              aria-label="Search menu"
              onClick={() => {
                // TODO: Implement search functionality
                console.log('Search clicked');
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Language Toggle */}
            <button
              className={styles.languageToggle}
              onClick={toggleLanguage}
              aria-label={`Switch to ${language === 'EN' ? 'Chinese' : 'English'}`}
            >
              {language}
            </button>

            {/* Cart Button */}
            <button
              className={styles.cartButton}
              aria-label={`Cart with ${itemCount} items`}
              onClick={() => setIsCartOpen(true)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 2L7.17 4H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3.17L15 2H9z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="13"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {itemCount > 0 && (
                <span className={styles.cartBadge} aria-hidden="true">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* Order Now CTA */}
            <Button variant="primary" size="md" asChild>
              <Link href="/menu">Order Now</Link>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className={styles.mobileActions}>
            {/* Cart Button */}
            <button
              className={styles.iconButton}
              aria-label={`Cart with ${itemCount} items`}
              onClick={() => setIsCartOpen(true)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 2L7.17 4H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3.17L15 2H9z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="13"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {itemCount > 0 && (
                <span className={styles.cartBadge} aria-hidden="true">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* Hamburger Menu Button */}
            <button
              className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuHeader}>
              <div className={styles.mobileMenuLogo}>
                <div className={styles.logoIcon}>
                  <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 5L25 15H35L27 21L30 31L20 25L10 31L13 21L5 15H15L20 5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span>Golden Wok</span>
              </div>
              <button
                className={styles.closeButton}
                onClick={toggleMobileMenu}
                aria-label="Close menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <nav className={styles.mobileMenuNav}>
              <ul className={styles.mobileNavList}>
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`${styles.mobileNavLink} ${
                        pathname === item.href ? styles.mobileNavLinkActive : ''
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className={styles.mobileMenuActions}>
                {/* Search */}
                <button className={styles.mobileActionButton}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Search Menu</span>
                </button>

                {/* Language Toggle */}
                <button className={styles.mobileActionButton} onClick={toggleLanguage}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 1C5.03 1 1 5.03 1 10s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 16.93 7zM10 2.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM2.26 11C2.1 10.36 2 9.69 2 9s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H2.26zm.81 1h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 3.07 12zm2.95-6H3.07a7.987 7.987 0 0 1 4.33-3.56A15.65 15.65 0 0 0 6.02 6zM10 17.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM12.34 13H7.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.26 2.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM14.36 11c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Language: {language}</span>
                </button>

                <Button variant="primary" size="lg" fullWidth asChild>
                  <Link href="/menu">Order Now</Link>
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Cart Modal */}
      <Modal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        size="lg"
      >
        <ModalHeader>
          <h2>Your Cart</h2>
        </ModalHeader>
        <ModalBody>
          <CartSummary mode="modal" onClose={() => setIsCartOpen(false)} />
        </ModalBody>
      </Modal>
    </header>
  );
};
