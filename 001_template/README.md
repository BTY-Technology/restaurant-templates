# Golden Wok Restaurant Website

A modern, full-featured Chinese restaurant website built with Next.js 14, TypeScript, and React. This template includes online ordering, DoorDash integration, menu catalog, location finder, and more.

![Golden Wok](https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&q=80)

## 🌟 Features

### Core Features
- **🏠 Home Page** - Hero section, featured dishes, about preview, newsletter signup
- **📋 Menu Catalog** - Filtering, sorting, pagination, category navigation
- **🍜 Individual Dish Pages** - Detailed descriptions, nutrition info, allergens, related dishes
- **ℹ️ About Us** - Brand story, chef profiles, awards, values
- **📍 Locations & Hours** - Multiple locations with maps, hours, features
- **🛒 Online Ordering** - Multi-step checkout with delivery/pickup options
- **📦 Order Confirmation** - Real-time DoorDash integration with status tracking

### Technical Features
- ✅ **Next.js 14 App Router** - Server and client components
- ✅ **TypeScript** - Full type safety
- ✅ **State Management** - React Context API for cart and orders
- ✅ **SEO Optimized** - Metadata API, structured data (JSON-LD)
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **CSS Modules** - Scoped styling
- ✅ **Accessibility** - WCAG 2.1 AA compliant
- ✅ **Mock API Integration** - DoorDash delivery tracking simulation
- ✅ **Form Validation** - Real-time validation with error messages
- ✅ **Performance** - Image optimization, lazy loading

## 🎨 Design System

### Color Palette
- **Primary (Ink Charcoal)**: `#1A1A1A` - Text, headers
- **Secondary (Rice Paper)**: `#FFF9F0` - Backgrounds
- **Accent (Lacquer Red)**: `#C4001D` - Buttons, CTAs, links
- **Accent Hover (Lacquer Red Dark)**: `#930016` - Hover states
- **Background (Jade Parchment)**: `#F1E6C8` - Page background
- **Accent (Imperial Gold)**: `#D4AF37` - Highlights, badges

### Typography
- **Headings**: Noto Serif SC (serif) - Bold, elegant Chinese-inspired
- **Body**: Inter (sans-serif) - Clean, modern, readable

### Breakpoints
- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: 768px - 992px
- **Large Desktop**: 992px - 1200px
- **Extra Large**: > 1200px

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun 1.0+
- npm, yarn, pnpm, or bun

### Setup

1. **Install dependencies:**

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

2. **Create environment variables:**

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

3. **Configure environment variables:**

Edit `.env.local` with your settings:

```env
# Google Maps API Key (for location maps)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Mock DoorDash Configuration
NEXT_PUBLIC_DOORDASH_API_KEY=mock_doordash_api_key
NEXT_PUBLIC_DOORDASH_STORE_ID=golden-wok-001

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Golden Wok

# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=info@goldenwok.com
NEXT_PUBLIC_CONTACT_PHONE=+1-555-0123
```

4. **Run development server:**

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

# Using bun
bun dev
```

5. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📂 Project Structure

```
golden-wok-restaurant/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── menu/
│   │   ├── page.tsx            # Menu catalog
│   │   └── [slug]/
│   │       └── page.tsx        # Individual dish pages
│   ├── about/
│   │   └── page.tsx            # About us page
│   ├── locations/
│   │   └── page.tsx            # Locations & hours
│   └── order/
│       ├── page.tsx            # Checkout page
│       └── confirmation/
│           └── page.tsx        # Order confirmation
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── Modal.tsx
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   └── features/                # Feature-specific components
│       ├── DishCard.tsx
│       ├── CartSummary.tsx
│       ├── FilterBar.tsx
│       ├── NewsletterForm.tsx
│       └── ChefCard.tsx
├── context/
│   ├── CartContext.tsx          # Shopping cart state
│   └── OrderContext.tsx         # Order state
├── data/
│   ├── dishes.ts                # Mock dish data
│   ├── locations.ts             # Restaurant locations
│   └── chefs.ts                 # Chef profiles
├── types/
│   ├── dish.ts                  # Dish type definitions
│   ├── cart.ts                  # Cart type definitions
│   ├── order.ts                 # Order type definitions
│   ├── location.ts              # Location type definitions
│   └── chef.ts                  # Chef type definitions
├── utils/
│   ├── formatting.ts            # Formatting utilities
│   ├── validation.ts            # Form validation
│   ├── doordash.ts              # Mock DoorDash API
│   └── seo.ts                   # SEO and structured data
├── styles/
│   └── variables.module.css     # Design system variables
├── public/                      # Static assets
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🧩 Key Components

### UI Components (`/components/ui`)
- **Button** - Variants: primary, secondary, outline, ghost
- **Card** - Flexible card container with header, body, footer
- **Badge** - Status badges, dietary labels, allergen indicators
- **Input** - Form inputs with validation states
- **Select** - Dropdown select with option groups
- **Modal** - Accessible modal dialogs

### Layout Components (`/components/layout`)
- **Header** - Sticky navigation with cart, search, mobile menu
- **Footer** - Four-column footer with links, contact, newsletter
- **Container** - Max-width container (1200px)

### Feature Components (`/components/features`)
- **DishCard** - Menu item display with add to cart
- **CartSummary** - Shopping cart with quantity controls
- **FilterBar** - Advanced filtering and sorting for menu
- **NewsletterForm** - Email subscription form
- **ChefCard** - Chef profile display

## 🛠️ State Management

### Cart Context (`useCart`)
```typescript
const { cart, addToCart, removeFromCart, updateQuantity, clearCart, itemCount } = useCart();

// Add item to cart
addToCart(dish, quantity, specialInstructions);

// Remove item
removeFromCart(dishId);

// Update quantity
updateQuantity(dishId, newQuantity);
```

### Order Context (`useOrder`)
```typescript
const { currentOrder, setContactInfo, setOrderType, setAddress, submitOrder } = useOrder();

// Set contact information
setContactInfo({ firstName, lastName, email, phone });

// Set order type
setOrderType('delivery'); // or 'pickup'

// Submit order
const order = await submitOrder(cart);
```

## 🎯 Pages

### Home Page (`/`)
- Hero section with call-to-action
- Featured dishes showcase
- About preview
- Newsletter signup

### Menu Catalog (`/menu`)
- Category filtering
- Search functionality
- Sorting options (price, popularity, name)
- Dietary filters (vegetarian, vegan, gluten-free)
- Pagination

### Dish Detail (`/menu/[slug]`)
- Large product images with zoom
- Complete dish information
- Nutrition facts
- Allergen warnings
- Related dishes
- Add to cart with quantity

### About Us (`/about`)
- Brand story and history
- Chef profiles with specialties
- Core values
- Awards and recognition

### Locations (`/locations`)
- Multiple location cards
- Hours of operation
- Contact information
- Google Maps integration
- Directions links

### Checkout (`/order`)
- Multi-step form (4 steps)
- Contact information
- Delivery or pickup selection
- Address validation
- Order review
- Cart summary sidebar

### Order Confirmation (`/order/confirmation`)
- Order details and ID
- DoorDash handoff integration
- Real-time delivery tracking
- Status updates every 30 seconds
- Dasher information

## 🔌 API Integration

### Mock DoorDash API (`/utils/doordash.ts`)

```typescript
import { handoffToDoorDash, getDoorDashStatus, trackDasher } from '@/utils/doordash';

// Hand off order to DoorDash
const response = await handoffToDoorDash({
  orderId: 'GW-123',
  pickupAddress: { /* ... */ },
  deliveryAddress: { /* ... */ },
  contactInfo: { /* ... */ },
  orderTotal: 45.99,
  items: [/* ... */],
});

// Poll for status updates
const status = await getDoorDashStatus(response.doordashOrderId);

// Track dasher location
const location = await trackDasher(response.doordashOrderId);
```

## 🔍 SEO Features

- **Meta Tags** - Title, description, keywords
- **Open Graph** - Social media sharing
- **Twitter Cards** - Enhanced Twitter previews
- **Structured Data** - Restaurant, MenuItem, LocalBusiness schemas
- **Sitemap** - Auto-generated sitemap
- **Robots.txt** - Search engine directives
- **Canonical URLs** - Prevent duplicate content

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader optimization
- Color contrast compliance (WCAG AA)
- Reduced motion support
- Alt text for images

## 📱 Responsive Design

The website is fully responsive with a mobile-first approach:

- **Mobile** (< 768px): Single column layouts, hamburger menu, sticky CTAs
- **Tablet** (768px - 1024px): Two-column layouts, collapsible filters
- **Desktop** (> 1024px): Full multi-column layouts, sidebar navigation

## 🧪 Testing

```bash
# Run type checking
npm run build

# Check for linting errors
npm run lint
```

## 📈 Performance Optimization

- **Next.js Image Component** - Automatic image optimization
- **Static Generation** - Pre-rendered pages for faster loads
- **Code Splitting** - Automatic code splitting by page
- **CSS Modules** - Component-scoped styles
- **Lazy Loading** - Deferred loading of images and components
- **Font Optimization** - Google Fonts with display swap

## 🔐 Security Features

- **Environment Variables** - Sensitive data protection
- **Input Validation** - XSS prevention
- **HTTPS Ready** - SSL/TLS support
- **Content Security Policy** - Header configuration
- **CORS Protection** - Cross-origin request handling

## 🎨 Customization

### Change Colors

Edit `/app/globals.css` or `/styles/variables.module.css`:

```css
:root {
  --color-ink-charcoal: #1A1A1A;
  --color-lacquer-red: #C4001D;
  --color-imperial-gold: #D4AF37;
  /* ... */
}
```

### Add Menu Items

Edit `/data/dishes.ts`:

```typescript
export const dishes: Dish[] = [
  {
    id: 'new-dish',
    name: 'New Dish',
    nameZh: '新菜',
    description: 'Delicious new dish',
    price: 15.99,
    category: 'Appetizers',
    // ...
  },
];
```

### Add Locations

Edit `/data/locations.ts`:

```typescript
export const locations: Location[] = [
  {
    id: 'new-location',
    name: 'Golden Wok New Location',
    address: { /* ... */ },
    coordinates: { lat: 37.7749, lng: -122.4194 },
    // ...
  },
];
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or support, please contact:
- Email: info@goldenwok.com
- Phone: +1 (555) 012-3456

## 🙏 Acknowledgments

- **Next.js** - React framework
- **TypeScript** - Type safety
- **Unsplash** - Stock images
- **Google Fonts** - Noto Serif SC and Inter fonts

---

**Built with ❤️ by BTY Technology**

Start your culinary journey today! 🥢
