# Golden Wok UI Components

A comprehensive collection of reusable UI components for the Golden Wok restaurant website. All components follow the design system with proper accessibility, responsive design, and the Golden Wok color palette.

## Design System Colors

- **Primary Red**: `#C4001D` - Primary actions, links, focus states
- **Gold**: `#D4AF37` - Accents, highlights, premium features
- **Parchment**: `#F1E6C8` - Backgrounds, borders, subtle elements
- **Charcoal**: `#1A1A1A` - Text, headings, dark elements
- **Cream**: `#FFF9F0` - Page background

## Components

### Button

Pre-existing button component with multiple variants and states.

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md">Order Now</Button>
```

### Card

A versatile card component for displaying menu items, promotions, and content blocks.

**Features:**
- Optional image with customizable aspect ratios (1:1, 4:3, 16:9, 21:9)
- Hover effects with scale and shadow animations
- Flexible padding options (none, sm, md, lg)
- Clickable card support with keyboard navigation
- Bordered variant

**Usage:**

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui';

<Card
  image="/images/kung-pao-chicken.jpg"
  imageAlt="Kung Pao Chicken"
  hoverable
  padding="md"
>
  <CardHeader>
    <CardTitle>Kung Pao Chicken</CardTitle>
    <CardDescription>
      Spicy stir-fried chicken with peanuts, vegetables, and chili peppers
    </CardDescription>
  </CardHeader>
  <CardFooter>
    <span className="price">$14.95</span>
    <Button size="sm">Add to Cart</Button>
  </CardFooter>
</Card>
```

### Badge

Display allergens, dietary labels, spice levels, and status indicators.

**Features:**
- Multiple variants (default, primary, success, warning, danger, info)
- Icon support
- Outlined and filled styles
- Pre-configured badges for common use cases

**Usage:**

```tsx
import {
  Badge,
  VegetarianBadge,
  SpiceBadge,
  AllergenBadge
} from '@/components/ui';

// Basic badge
<Badge variant="success">Popular</Badge>

// Pre-configured badges
<VegetarianBadge />
<VeganBadge />
<GlutenFreeBadge />
<SpiceBadge level={2} />
<AllergenBadge allergen="nuts" />

// Custom badge with icon
<Badge variant="warning" icon="⭐">Chef's Special</Badge>
```

**Available Pre-configured Badges:**
- `VegetarianBadge` - Green badge with plant icon
- `VeganBadge` - Green badge with leaf icon
- `GlutenFreeBadge` - Blue badge with wheat icon
- `SpiceBadge` - Red badge with chili peppers (levels 1-3)
- `AllergenBadge` - Yellow outlined badge for allergens

### Input

Form input component with validation states, labels, and help text.

**Features:**
- Label and help text support
- Error and success states with messages
- Start and end icon support
- Size variants (sm, md, lg)
- Full width option
- Accessible with ARIA attributes

**Usage:**

```tsx
import { Input, Textarea } from '@/components/ui';

// Basic input
<Input
  label="Email Address"
  type="email"
  placeholder="your@email.com"
  required
/>

// Input with validation
<Input
  label="Phone Number"
  type="tel"
  error="Please enter a valid phone number"
  helpText="Format: (555) 123-4567"
/>

// Input with icons
<Input
  label="Search Menu"
  placeholder="Search dishes..."
  startIcon={<SearchIcon />}
/>

// Textarea
<Textarea
  label="Special Instructions"
  rows={4}
  helpText="Let us know about dietary restrictions or preferences"
/>
```

### Select

Dropdown select component for filters and form fields.

**Features:**
- Label and help text support
- Error and success states
- Option groups support
- Animated chevron icon
- Size variants (sm, md, lg)
- Full width option

**Usage:**

```tsx
import { Select, OptGroup } from '@/components/ui';

// With options array
<Select
  label="Party Size"
  placeholder="Select number of guests"
  options={[
    { value: '1', label: '1 person' },
    { value: '2', label: '2 people' },
    { value: '3', label: '3 people' },
    { value: '4', label: '4 people' },
    { value: '5+', label: '5+ people' },
  ]}
/>

// With option groups
<Select label="Menu Category">
  <OptGroup label="Appetizers">
    <option value="spring-rolls">Spring Rolls</option>
    <option value="dumplings">Dumplings</option>
  </OptGroup>
  <OptGroup label="Main Courses">
    <option value="kung-pao">Kung Pao Chicken</option>
    <option value="beef-broccoli">Beef & Broccoli</option>
  </OptGroup>
</Select>
```

### Modal

Modal/dialog component for cart preview, image zoom, and overlays.

**Features:**
- Portal rendering to avoid z-index issues
- Backdrop click and Escape key to close
- Focus trap and keyboard navigation
- Body scroll prevention
- Size variants (sm, md, lg, xl, full)
- Animated entrance/exit
- Custom header and footer

**Usage:**

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@/components/ui';
import { useState } from 'react';

function CartPreview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>View Cart</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Shopping Cart"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Continue Shopping
            </Button>
            <Button variant="primary">Checkout</Button>
          </>
        }
      >
        <p>Your cart items go here...</p>
      </Modal>
    </>
  );
}

// Image zoom modal
<Modal
  isOpen={imageZoomOpen}
  onClose={() => setImageZoomOpen(false)}
  size="xl"
  showCloseButton={true}
>
  <img src="/images/dish-large.jpg" alt="Dish detail" />
</Modal>
```

## Accessibility Features

All components include:

- **ARIA Attributes**: Proper labels, roles, and descriptions
- **Keyboard Navigation**: Full keyboard support (Tab, Enter, Escape, Arrow keys)
- **Focus Management**: Visible focus indicators and logical tab order
- **Screen Reader Support**: Meaningful labels and state announcements
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference
- **High Contrast**: Enhanced borders and colors in high contrast mode

## Responsive Design

All components are fully responsive with:

- Mobile-first approach
- Breakpoints at 576px, 768px, and 1200px
- Touch-friendly sizes on mobile devices
- Optimized layouts for different screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## TypeScript Support

All components are written in TypeScript with comprehensive type definitions. Import types alongside components:

```tsx
import { Card, type CardProps } from '@/components/ui';
```

## Usage Tips

### Card Component
- Use `hoverable` for interactive cards like menu items
- Set `imageAspectRatio="1/1"` for profile images or square products
- Use `padding="none"` when you want edge-to-edge content

### Badge Component
- Stack multiple badges using flexbox with gap
- Use outline variant for less emphasis
- Spice badges automatically show appropriate peppers for level

### Input Component
- Always provide labels for accessibility
- Use helpText for format examples
- Error messages automatically set ARIA attributes

### Select Component
- Use placeholder for non-required selects
- Group related options with OptGroup
- Keep option labels concise

### Modal Component
- Set `size="full"` for image galleries or complex forms
- Use `closeOnBackdropClick={false}` for critical confirmations
- Footer buttons should use consistent alignment (usually right)

## Examples

See the `/examples` directory for complete usage examples and common patterns.
