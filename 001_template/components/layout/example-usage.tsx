/**
 * Example usage of layout components
 * This file demonstrates how to use the Header, Footer, and Container components
 * in a Next.js application layout.
 */

import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Container } from './Container';

/**
 * Example 1: Root Layout
 * Use this pattern in app/layout.tsx for Next.js App Router
 */
export function RootLayoutExample({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}

/**
 * Example 2: Page with Container
 * Use this pattern in individual page components
 */
export function PageExample() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, paddingTop: '2rem', paddingBottom: '4rem' }}>
        <Container>
          <h1>Welcome to Golden Wok</h1>
          <p>Authentic Chinese cuisine since 1998.</p>
        </Container>

        {/* Full-width section example */}
        <section style={{ background: '#F5F5F5', padding: '4rem 0', marginTop: '3rem' }}>
          <Container>
            <h2>Our Specialties</h2>
            <p>Discover our most popular dishes...</p>
          </Container>
        </section>

        {/* Another contained section */}
        <Container as="section" style={{ marginTop: '3rem' }}>
          <h2>About Us</h2>
          <p>Learn more about our story...</p>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

/**
 * Example 3: Different Container Semantic Elements
 */
export function SemanticContainerExample() {
  return (
    <>
      {/* Main content container */}
      <Container as="main">
        <h1>Main Content</h1>
        <p>Primary page content</p>
      </Container>

      {/* Article container */}
      <Container as="article">
        <h2>Blog Post Title</h2>
        <p>Blog post content...</p>
      </Container>

      {/* Section container */}
      <Container as="section">
        <h2>Features</h2>
        <p>Feature list...</p>
      </Container>

      {/* Aside container */}
      <Container as="aside">
        <h3>Related Content</h3>
        <p>Sidebar content...</p>
      </Container>
    </>
  );
}

/**
 * Example 4: Container with Custom Styling
 */
export function StyledContainerExample() {
  return (
    <Container
      className="custom-class"
      style={{
        backgroundColor: '#fff',
        padding: '2rem 1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <h2>Custom Styled Container</h2>
      <p>This container has additional custom styles applied.</p>
    </Container>
  );
}

/**
 * Example 5: Nested Containers (use sparingly)
 * Note: Generally you don't need to nest containers, but it's technically possible
 */
export function NestedContainerWarning() {
  return (
    <div style={{ background: '#F5F5F5', padding: '2rem 0' }}>
      <Container>
        {/* Outer container for the section wrapper */}
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px' }}>
          {/* Inner content - no need for another Container here */}
          <h2>Section Title</h2>
          <p>Section content with proper spacing</p>
        </div>
      </Container>
    </div>
  );
}

/**
 * Example 6: Responsive Layout Pattern
 */
export function ResponsiveLayoutExample() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* Hero section - full width background */}
        <section
          style={{
            background: 'linear-gradient(135deg, #C4001D 0%, #8B0014 100%)',
            color: 'white',
            padding: '4rem 0'
          }}
        >
          <Container>
            <h1>Authentic Chinese Cuisine</h1>
            <p>Experience the taste of tradition</p>
          </Container>
        </section>

        {/* Content section - contained */}
        <Container as="section" style={{ padding: '4rem 0' }}>
          <h2>Our Menu</h2>
          <p>Browse our extensive selection of dishes</p>
        </Container>

        {/* Grid section - full width background, contained content */}
        <section style={{ background: '#1A1A1A', color: 'white', padding: '4rem 0' }}>
          <Container>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              <div>
                <h3>Fresh Ingredients</h3>
                <p>We source the finest ingredients</p>
              </div>
              <div>
                <h3>Expert Chefs</h3>
                <p>Trained in traditional methods</p>
              </div>
              <div>
                <h3>Fast Delivery</h3>
                <p>Hot food delivered quickly</p>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/**
 * Export all examples
 */
export const examples = {
  RootLayoutExample,
  PageExample,
  SemanticContainerExample,
  StyledContainerExample,
  NestedContainerWarning,
  ResponsiveLayoutExample,
};
