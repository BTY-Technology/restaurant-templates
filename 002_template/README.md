# Smash & Stack - Modern Burger Restaurant Website

A production-ready restaurant website built with Next.js 14, TypeScript, and Tailwind CSS. Features a complete online ordering system with mock DoorDash integration, interactive menu catalog, location finder, and fully responsive design.

## 🍔 Features

### Core Functionality
- **Interactive Menu Catalog**: Browse, filter, and sort menu items with real-time search
- **Individual Item Pages**: Detailed product pages with nutrition info, customizations, and image galleries
- **Shopping Cart**: Full-featured cart with quantity management and customization display
- **Online Ordering**: Multi-step checkout flow with pickup and delivery options
- **Order Tracking**: Real-time order status updates with mock DoorDash integration
- **Location Finder**: Multiple locations with Google Maps integration and hours display
- **About Us**: Team profiles and brand story

### Technical Features
- ✨ **Modern Design**: Bold Americana diner aesthetic with smooth animations
- 📱 **Fully Responsive**: Mobile-first design optimized for all devices
- ⚡ **Next.js 14 App Router**: Server-side rendering for optimal performance and SEO
- 🎨 **Tailwind CSS**: Custom design system with brand colors and typography
- 📝 **TypeScript**: Full type safety across the entire application
- 🎭 **Framer Motion**: Smooth page transitions and micro-interactions
- 🛒 **React Context**: Global state management for cart and orders
- ✅ **Form Validation**: React Hook Form + Zod for robust form handling
- ♿ **Accessible**: WCAG compliant with keyboard navigation and ARIA labels
- 🔍 **SEO Optimized**: Structured data, meta tags, and semantic HTML

## 🎨 Design System

### Color Palette
- **Primary**: Ketchup Red (#FF3131) - CTAs and accents
- **Secondary**: Mustard Gold (#FDBA21) - Highlights and badges
- **Charcoal**: (#111111) - Dark text and borders
- **Toasted Bun**: (#FFF7E6) - Light accents
- **Parchment**: (#F2EFEA) - Backgrounds

### Typography
- **Headings**: Anton (bold, uppercase display font)
- **Body**: Inter (clean, readable sans-serif)

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **State Management**: React Context API
- **Image Optimization**: Next.js Image component with AVIF/WebP support

## 📋 Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun package manager

## ⚙️ Installation

1. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. **Set up environment variables:**

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and configure:

```env
# Google Maps API Key (optional - for location maps)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Mock DoorDash API Key (for demonstration)
NEXT_PUBLIC_DOORDASH_MOCK_KEY=mock_doordash_key

# Site URL for SEO
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 📁 Project Structure

```
smash-and-stack/
├── app/                           # Next.js 14 App Router
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page with hero
│   ├── menu/
│   │   ├── page.tsx             # Menu catalog with filters
│   │   └── [id]/page.tsx        # Individual item pages
│   ├── about/page.tsx           # About us page
│   ├── locations/page.tsx       # Locations finder
│   ├── checkout/page.tsx        # Multi-step checkout
│   └── order/[orderId]/page.tsx # Order tracking
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Card.tsx
│   │   └── LoadingSkeleton.tsx
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── menu/                    # Menu-specific components
│   │   ├── MenuCard.tsx
│   │   └── MenuFilters.tsx
│   ├── cart/
│   │   └── CartDrawer.tsx
│   ├── checkout/
│   │   └── CheckoutForm.tsx
│   ├── locations/
│   │   └── LocationCard.tsx
│   └── order/
│       └── OrderStatusTimeline.tsx
├── contexts/
│   ├── CartContext.tsx          # Shopping cart state
│   └── OrderContext.tsx         # Order management
├── data/
│   ├── menuItems.ts             # Menu item data
│   ├── locations.ts             # Restaurant locations
│   └── team.ts                  # Team member profiles
├── lib/
│   ├── doordash-mock.ts         # Mock DoorDash API
│   └── seo.ts                   # SEO utilities and schema
├── types/
│   └── index.ts                 # TypeScript type definitions
├── utils/
│   ├── cart.ts                  # Cart calculation utilities
│   ├── formatting.ts            # Number/date formatting
│   └── validation.ts            # Form validation schemas
├── public/                      # Static assets
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind customization
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🎯 Key Pages

### Home Page (`/`)
- Full-bleed hero with CTA
- Featured menu items
- Why choose us section
- Newsletter signup

### Menu Catalog (`/menu`)
- Filter by category (Burgers, Chicken, Sides, Shakes)
- Sort by popularity, price, or name
- Real-time search
- Responsive grid layout

### Item Detail (`/menu/[id]`)
- Image gallery with zoom
- Full nutritional information
- Customization options (sizes, toppings, add-ons)
- Related items
- Add to cart with quantity selector

### Checkout (`/checkout`)
- Step 1: Contact information
- Step 2: Pickup or delivery selection
- Step 3: Order review and submit
- Form validation with error messages

### Order Tracking (`/order/[orderId]`)
- Real-time status updates
- Order timeline visualization
- Dasher information (for delivery)
- Estimated time remaining
- Order details and receipt

### About (`/about`)
- Brand story
- Quality promise
- Team member profiles

### Locations (`/locations`)
- All restaurant locations
- Google Maps integration
- Hours and contact info
- Pickup/delivery toggle

## 🛠 Customization

### Update Menu Items

Edit `data/menuItems.ts` to add, remove, or modify menu items:

```typescript
{
  id: 'your-item-id',
  name: 'Item Name',
  description: 'Detailed description',
  price: 12.99,
  category: 'Burgers',
  image: 'https://your-image-url.jpg',
  calories: 680,
  // ... more fields
}
```

### Update Locations

Edit `data/locations.ts` to configure restaurant locations:

```typescript
{
  id: 'location-id',
  name: 'Location Name',
  address: '123 Main St',
  city: 'Portland',
  state: 'OR',
  zip: '97201',
  phone: '(503) 555-1234',
  coordinates: { lat: 45.5202, lng: -122.6742 },
  hours: { Monday: '11:00 AM - 10:00 PM', /* ... */ },
}
```

### Update Brand Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  charcoal: '#111111',
  bun: '#FFF7E6',
  ketchup: '#FF3131',
  // ... customize colors
}
```

### Update Team Members

Edit `data/team.ts` to add team member profiles.

## 🧪 Testing

Run tests with Jest:

```bash
npm run test
# or
npm run test:watch
```

## 🏗 Building for Production

```bash
npm run build
npm start
```

This creates an optimized production build with:
- Minified JavaScript and CSS
- Optimized images (WebP/AVIF)
- Server-side rendering
- Static generation for menu items

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

This template works with:
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Railway](https://railway.app/)
- Any Node.js hosting platform

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key for location maps | Optional |
| `NEXT_PUBLIC_DOORDASH_MOCK_KEY` | Mock DoorDash API key | No (demo only) |
| `NEXT_PUBLIC_SITE_URL` | Full site URL for SEO | Yes (production) |

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

This is a template project. Feel free to fork and customize for your needs.

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ by [BTY Technology](https://btytechnology.com)
