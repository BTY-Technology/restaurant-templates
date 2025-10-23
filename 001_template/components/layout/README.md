# Layout Components

Production-ready layout components for the Golden Wok restaurant website.

## Components

### Header

Sticky navigation header with cart integration, search, language toggle, and responsive mobile menu.

**Features:**
- Sticky positioning with scroll-based blur effect
- Desktop navigation with active link states
- Cart icon with item count badge (integrated with CartContext)
- Language toggle (EN/中文)
- Search button (placeholder)
- Responsive mobile hamburger menu with slide-in drawer
- "Order Now" CTA button
- Fully accessible with ARIA labels

**Usage:**
```tsx
import { Header } from '@/components/layout';

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
```

**Design:**
- Height: 80px
- Colors: #C4001D (red), #D4AF37 (gold), #1A1A1A (charcoal)
- Transparent background with blur on scroll
- Mobile breakpoint: 768px

---

### Footer

Comprehensive footer with company info, links, contact details, social media, newsletter signup, and Google Maps integration.

**Features:**
- Four-column responsive grid layout
- About section with logo and description
- Quick links navigation
- Contact information (phone, email, address)
- Social media links (Instagram, Facebook, Twitter)
- Newsletter subscription form with validation
- Google Maps embed
- Legal links (Privacy, Terms, Accessibility)
- Copyright notice
- Wave pattern background decoration

**Usage:**
```tsx
import { Footer } from '@/components/layout';

export default function RootLayout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

**Design:**
- Background: #1A1A1A with subtle wave pattern
- Gold accents: #D4AF37
- Responsive: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)

---

### Container

Max-width centered container with responsive padding.

**Features:**
- Max-width: 1200px
- Responsive horizontal padding
- Supports semantic HTML elements
- Fully type-safe

**Usage:**
```tsx
import { Container } from '@/components/layout';

export default function Page() {
  return (
    <Container as="section">
      <h1>Page Content</h1>
      <p>Your content here...</p>
    </Container>
  );
}
```

**Props:**
- `children`: ReactNode - Content to display
- `className`: string (optional) - Additional CSS classes
- `as`: 'div' | 'section' | 'article' | 'main' | 'aside' (default: 'div') - HTML element type

**Padding:**
- Mobile (< 768px): 16px
- Tablet (768px - 1023px): 24px
- Desktop (1024px - 1279px): 32px
- Large desktop (≥ 1280px): 16px

---

## Design System

### Colors
- **Primary Red:** #C4001D
- **Gold:** #D4AF37
- **Charcoal:** #1A1A1A
- **White:** #FFFFFF

### Typography
- **Headings:** System font stack, weights 600-700
- **Body:** System font stack, weight 400-500
- **Small text:** 0.875rem (14px)
- **Base text:** 0.9375rem (15px)
- **Large text:** 1.125rem (18px)

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px - 1279px
- **Large Desktop:** ≥ 1280px

### Spacing
- Uses a consistent spacing scale based on rem units
- Follows 8px grid system

---

## Accessibility

All components include:
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader friendly text
- High contrast mode support
- Reduced motion support

---

## Dependencies

- `next/link` - Client-side navigation
- `next/navigation` - usePathname hook
- `@/context/CartContext` - Cart state management
- `@/components/ui/Button` - Button component
- `@/components/ui/Input` - Input component

---

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Android (latest)
