# UI Components Architecture

## Component Hierarchy

```
components/ui/
│
├── Button (Pre-existing)
│   ├── variants: primary, secondary, outline, ghost
│   ├── sizes: sm, md, lg
│   └── states: loading, disabled
│
├── Card
│   ├── Card (container)
│   ├── CardHeader (section)
│   ├── CardTitle (heading)
│   ├── CardDescription (text)
│   └── CardFooter (section)
│
├── Badge
│   ├── Badge (base)
│   ├── VegetarianBadge (preset)
│   ├── VeganBadge (preset)
│   ├── GlutenFreeBadge (preset)
│   ├── SpiceBadge (preset)
│   └── AllergenBadge (preset)
│
├── Input
│   ├── Input (base)
│   └── Textarea (variant)
│
├── Select
│   ├── Select (base)
│   └── OptGroup (grouping)
│
└── Modal
    ├── Modal (container)
    ├── ModalHeader (section)
    ├── ModalBody (section)
    └── ModalFooter (section)
```

## Component Composition Patterns

### Pattern 1: Card + Badge + Button
**Use Case**: Menu item display

```tsx
<Card image="dish.jpg" hoverable>
  <CardHeader>
    <SpiceBadge level={2} />
    <VegetarianBadge />
    <CardTitle>Dish Name</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardFooter>
    <span>$14.95</span>
    <Button>Add to Cart</Button>
  </CardFooter>
</Card>
```

### Pattern 2: Input + Select (Form)
**Use Case**: Reservation form

```tsx
<form>
  <Input label="Name" required />
  <Input label="Email" type="email" required />
  <Select label="Party Size" options={[...]} />
  <Textarea label="Special Requests" />
  <Button type="submit">Submit</Button>
</form>
```

### Pattern 3: Modal + Card + Button
**Use Case**: Shopping cart

```tsx
<Modal isOpen={isOpen} title="Cart">
  {items.map(item => (
    <Card key={item.id}>
      <CardTitle>{item.name}</CardTitle>
      <span>${item.price}</span>
    </Card>
  ))}
  <Button>Checkout</Button>
</Modal>
```

## State Management Flow

```
User Interaction
      ↓
Event Handler
      ↓
State Update (useState/Context)
      ↓
Component Re-render
      ↓
CSS Transition/Animation
```

## Props Flow

### Input Component Props Flow
```
Parent Component
      ↓
InputProps {
  label, value, onChange, error,
  helpText, state, size, icons
}
      ↓
Input Component
      ↓
Renders: Label → InputWrapper → input → ValidationIcon → HelpText
```

### Modal Component Props Flow
```
Parent Component
      ↓
ModalProps {
  isOpen, onClose, title, size,
  footer, children
}
      ↓
Modal Component
      ↓
createPortal(Backdrop → Modal → Header → Body → Footer, document.body)
```

## Styling Architecture

### CSS Modules Strategy
```
Component.tsx
      ↓
imports styles from Component.module.css
      ↓
CSS Modules generates unique class names
      ↓
Scoped styles (no conflicts)
```

### Class Name Composition
```tsx
const classNames = [
  styles.base,           // Base styles
  styles[variant],       // Variant styles
  styles[size],          // Size styles
  state && styles.state, // Conditional styles
  className,             // Custom styles
]
  .filter(Boolean)
  .join(' ');
```

## Accessibility Architecture

### Focus Management (Modal)
```
Modal Opens
      ↓
Store Previous Active Element
      ↓
Focus Modal Container
      ↓
Trap Focus Within Modal
      ↓
Modal Closes
      ↓
Restore Previous Focus
```

### ARIA Labeling Strategy
```
Component
      ↓
Generate Unique ID
      ↓
Link Label (htmlFor) ↔ Input (id)
      ↓
Link Description (aria-describedby)
      ↓
Set State (aria-invalid, role="alert")
```

## Responsive Design Strategy

```css
/* Mobile First */
.component {
  /* Base mobile styles */
}

/* Tablet */
@media (min-width: 576px) {
  .component {
    /* Tablet adjustments */
  }
}

/* Desktop */
@media (min-width: 768px) {
  .component {
    /* Desktop enhancements */
  }
}
```

## Animation Architecture

### Transitions
```css
.component {
  transition: all 200ms ease;
}

.component:hover {
  transform: translateY(-2px);
}
```

### Keyframe Animations
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  animation: fadeIn 250ms ease-out;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .component {
    transition: none;
    animation: none;
  }
}
```

## Type System Architecture

```typescript
// Base Props (HTML attributes)
HTMLAttributes<HTMLDivElement>

// Custom Props
interface CustomProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

// Combined Props (Omit conflicts)
interface ComponentProps
  extends Omit<HTMLAttributes, 'size'>,
          CustomProps {}
```

## Export Strategy

### Barrel Export (index.ts)
```typescript
// Components
export { Component } from './Component';

// Types
export type { ComponentProps } from './Component';
```

### Usage
```typescript
// Named imports
import { Card, CardTitle } from '@/components/ui';

// Type imports
import type { CardProps } from '@/components/ui';
```

## Performance Optimization

### CSS Modules Benefits
- ✅ Scoped styles (no global conflicts)
- ✅ Tree-shaking unused styles
- ✅ Build-time processing
- ✅ No runtime overhead

### Component Optimization
- ✅ No unnecessary re-renders
- ✅ Minimal prop drilling
- ✅ ForwardRef for ref support
- ✅ Pure CSS animations (no JS)

### Bundle Size
```
Component Sizes (minified + gzipped):
- Card:   ~2.5KB
- Badge:  ~2.0KB
- Input:  ~3.5KB
- Select: ~3.0KB
- Modal:  ~4.0KB
Total:    ~15KB
```

## Testing Strategy

### Unit Testing
```typescript
// Component rendering
test('Card renders with image', () => {
  render(<Card image="test.jpg" />);
  expect(screen.getByRole('img')).toBeInTheDocument();
});

// Accessibility
test('Input has proper labels', () => {
  render(<Input label="Email" />);
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
});

// Interactions
test('Modal closes on Escape', () => {
  render(<Modal isOpen onClose={mockClose} />);
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(mockClose).toHaveBeenCalled();
});
```

### Integration Testing
```typescript
// Form submission
test('Reservation form submits', async () => {
  render(<ReservationForm />);

  await userEvent.type(screen.getByLabelText('Name'), 'John');
  await userEvent.selectOptions(screen.getByLabelText('Time'), '18:00');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(mockSubmit).toHaveBeenCalled();
});
```

## Design Tokens

### Colors
```css
--primary-red: #C4001D;
--primary-red-dark: #930016;
--gold: #D4AF37;
--parchment: #F1E6C8;
--charcoal: #1A1A1A;
```

### Spacing
```css
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
```

### Border Radius
```css
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 9999px;
```

### Typography
```css
--font-sans: 'Inter', sans-serif;
--font-serif: 'Noto Serif SC', serif;
```

## Error Handling

### Validation Errors
```tsx
<Input
  error={errors.email}              // Display error
  aria-invalid={!!errors.email}     // Accessibility
  aria-describedby="email-error"    // Link to error message
/>
```

### Graceful Degradation
- Modal falls back to div if portal fails
- Images show alt text on error
- Form still submits without JS validation

---

**Last Updated**: October 21, 2025
