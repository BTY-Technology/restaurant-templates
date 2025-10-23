# Feature Components

This directory contains feature-specific components for the Golden Wok restaurant website. These components integrate with the design system and provide reusable, production-ready functionality.

## Components Overview

### 1. DishCard

Display individual dish information with images, pricing, dietary badges, and cart functionality.

**File:** `DishCard.tsx` + `DishCard.module.css`

**Key Features:**
- Responsive image with zoom effect on hover
- Dietary badges (vegetarian, vegan, gluten-free)
- Spice level indicator
- Add to cart functionality with loading state
- Quick view button for modal integration
- Popular and Featured badges
- Chinese name display

**Props:**
```typescript
{
  dish: Dish;                        // Dish object from types
  onQuickView?: (dish: Dish) => void; // Callback for quick view modal
}
```

**Usage Example:**
```tsx
import { DishCard } from '@/components/features';

<DishCard
  dish={dishData}
  onQuickView={(dish) => setSelectedDish(dish)}
/>
```

---

### 2. CartSummary

Displays cart contents with quantity controls, pricing breakdown, and checkout functionality.

**File:** `CartSummary.tsx` + `CartSummary.module.css`

**Key Features:**
- Works as both sidebar and modal content
- Quantity increase/decrease controls
- Remove item functionality
- Empty cart state with CTA
- Price breakdown (subtotal, tax, delivery, total)
- Special instructions display
- Responsive scrollable item list

**Props:**
```typescript
{
  mode?: 'sidebar' | 'modal';        // Display mode (default: 'sidebar')
  onClose?: () => void;               // Callback when close is clicked
  includeDeliveryFee?: boolean;       // Show delivery fee (default: true)
}
```

**Usage Example:**
```tsx
import { CartSummary } from '@/components/features';

// Sidebar cart
<CartSummary
  mode="sidebar"
  onClose={() => setCartOpen(false)}
/>

// Modal cart without delivery fee
<CartSummary
  mode="modal"
  includeDeliveryFee={false}
  onClose={() => setModalOpen(false)}
/>
```

---

### 3. FilterBar

Comprehensive filtering and sorting controls for the menu page.

**File:** `FilterBar.tsx` + `FilterBar.module.css`

**Key Features:**
- Category filter dropdown
- Sort options (popular, price, name)
- Dietary preference checkboxes
- Price range controls with slider
- Search input with 300ms debounce
- Collapsible advanced filters
- Clear all filters button
- Active filter indicators

**Props:**
```typescript
{
  onFilterChange: (filters: FilterState) => void;  // Callback with filter updates
  currentFilters?: FilterState;                     // Current filter state
}
```

**FilterState Interface:**
```typescript
{
  category?: Category | 'All';
  sortBy: SortOption;
  dietary: ('vegetarian' | 'vegan' | 'glutenFree')[];
  priceRange: { min: number; max: number; };
  searchQuery: string;
}
```

**Usage Example:**
```tsx
import { FilterBar, FilterState } from '@/components/features';

const [filters, setFilters] = useState<FilterState>({
  category: 'All',
  sortBy: 'popular',
  dietary: [],
  priceRange: { min: 0, max: 50 },
  searchQuery: '',
});

<FilterBar
  onFilterChange={setFilters}
  currentFilters={filters}
/>
```

---

### 4. NewsletterForm

Email subscription form with validation and localStorage persistence.

**File:** `NewsletterForm.tsx` + `NewsletterForm.module.css`

**Key Features:**
- Email validation with regex
- Loading state during submission
- Success/error message display
- localStorage persistence
- Duplicate email detection
- Mock API call simulation (1s delay)
- Inline and stacked layouts
- Customizable title and description

**Props:**
```typescript
{
  layout?: 'inline' | 'stacked';       // Form layout (default: 'inline')
  placeholder?: string;                 // Input placeholder
  buttonText?: string;                  // Button text (default: 'Subscribe')
  showTitle?: boolean;                  // Show title (default: true)
  title?: string;                       // Custom title
  showDescription?: boolean;            // Show description (default: true)
  description?: string;                 // Custom description
}
```

**Usage Example:**
```tsx
import { NewsletterForm } from '@/components/features';

// Footer version
<NewsletterForm
  layout="inline"
  title="Join Our Newsletter"
/>

// Sidebar version
<NewsletterForm
  layout="stacked"
  showTitle={false}
  showDescription={false}
  placeholder="Email"
  buttonText="Join"
/>
```

---

### 5. ChefCard

Display chef profile information with expandable bio.

**File:** `ChefCard.tsx` + `ChefCard.module.css`

**Key Features:**
- Profile image with hover effect
- Bilingual name display (English + Chinese)
- Expandable bio with "read more/less"
- Specialty badges
- Experience indicator with icon
- Responsive layout
- Card-based design

**Props:**
```typescript
{
  chef: Chef;                           // Chef object from types
  bioMaxLength?: number;                // Max bio length before truncation (default: 150)
}
```

**Usage Example:**
```tsx
import { ChefCard } from '@/components/features';

<ChefCard
  chef={chefData}
  bioMaxLength={200}
/>
```

---

## Design System Integration

All components follow the Golden Wok design system:

### Colors
- **Primary Red:** `#C4001D`
- **Gold Accent:** `#D4AF37`
- **Cream Background:** `#F1E6C8`
- **Dark Text:** `#1A1A1A`

### Typography
- Headings: Bold, clear hierarchy
- Body: 14-16px, line-height 1.6-1.7
- Chinese text: Slightly smaller than English

### Spacing
- Consistent 4px grid system
- Card padding: 16-24px
- Component gaps: 8-24px

## Accessibility Features

All components include:
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus visible states
- Screen reader support
- Reduced motion support
- Semantic HTML
- Color contrast compliance

## Responsive Design

Breakpoints used:
- **Desktop:** > 1024px
- **Tablet:** 768px - 1024px
- **Mobile:** < 768px
- **Small Mobile:** < 480px

All components are fully responsive and tested across devices.

## State Management

Components integrate with existing context providers:
- `CartContext` (CartSummary, DishCard)
- localStorage (NewsletterForm)
- Component-level state (FilterBar, ChefCard)

## Performance Optimizations

- Next.js Image component for optimized images
- CSS modules for scoped styling
- Debounced search input (300ms)
- Lazy loading support
- Memoization where appropriate

## Testing Recommendations

When testing these components:

1. **DishCard**
   - Test add to cart functionality
   - Verify quick view modal integration
   - Check badge visibility logic

2. **CartSummary**
   - Test empty cart state
   - Verify quantity controls
   - Check price calculations

3. **FilterBar**
   - Test search debounce
   - Verify filter combinations
   - Check clear filters

4. **NewsletterForm**
   - Test email validation
   - Verify error states
   - Check localStorage persistence

5. **ChefCard**
   - Test bio expansion
   - Verify responsive images
   - Check specialty badges

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## File Structure

```
components/features/
├── DishCard.tsx
├── DishCard.module.css
├── CartSummary.tsx
├── CartSummary.module.css
├── FilterBar.tsx
├── FilterBar.module.css
├── NewsletterForm.tsx
├── NewsletterForm.module.css
├── ChefCard.tsx
├── ChefCard.module.css
├── index.ts
├── example-usage.tsx
└── README.md
```

## Contributing

When adding new feature components:
1. Follow the existing pattern (Component.tsx + Component.module.css)
2. Add TypeScript interfaces for all props
3. Include proper JSDoc comments
4. Ensure accessibility compliance
5. Add responsive styles
6. Export from index.ts
7. Update this README
8. Add usage examples

## License

Part of the Golden Wok Restaurant template.
