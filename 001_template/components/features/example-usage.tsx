/**
 * Example Usage Guide for Feature Components
 *
 * This file demonstrates how to use the feature-specific components
 * in your Golden Wok restaurant website pages.
 */

import React from 'react';
import {
  DishCard,
  CartSummary,
  FilterBar,
  NewsletterForm,
  ChefCard,
  FilterState,
} from '@/components/features';
import { Dish } from '@/types/dish';
import { Chef } from '@/types/chef';

// =============================================================================
// 1. DishCard Example
// =============================================================================

const DishCardExample = () => {
  const exampleDish: Dish = {
    id: '1',
    name: 'Kung Pao Chicken',
    nameZh: '宫保鸡丁',
    description: 'Stir-fried chicken with peanuts, vegetables, and chili peppers in a savory sauce.',
    price: 14.99,
    category: 'Chef\'s Specials',
    spiceLevel: 2,
    allergens: ['Peanuts', 'Soy'],
    ingredients: ['Chicken', 'Peanuts', 'Bell Peppers', 'Soy Sauce'],
    images: {
      main: '/images/dishes/kung-pao-chicken.jpg',
      thumbnail: '/images/dishes/kung-pao-chicken-thumb.jpg',
    },
    featured: true,
    popular: true,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  };

  const handleQuickView = (dish: Dish) => {
    console.log('Opening quick view for:', dish.name);
    // Open modal with dish details
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <DishCard dish={exampleDish} onQuickView={handleQuickView} />
    </div>
  );
};

// =============================================================================
// 2. CartSummary Example
// =============================================================================

const CartSummaryExample = () => {
  const handleClose = () => {
    console.log('Closing cart');
  };

  return (
    <>
      {/* Sidebar Mode (for slide-in cart) */}
      <CartSummary
        mode="sidebar"
        onClose={handleClose}
        includeDeliveryFee={true}
      />

      {/* Modal Mode (for popup cart) */}
      <CartSummary
        mode="modal"
        onClose={handleClose}
        includeDeliveryFee={false}
      />
    </>
  );
};

// =============================================================================
// 3. FilterBar Example
// =============================================================================

const FilterBarExample = () => {
  const [filters, setFilters] = React.useState<FilterState>({
    category: 'All',
    sortBy: 'popular',
    dietary: [],
    priceRange: { min: 0, max: 50 },
    searchQuery: '',
  });

  const handleFilterChange = (newFilters: FilterState) => {
    console.log('Filters changed:', newFilters);
    setFilters(newFilters);
    // Apply filters to dish list
  };

  return (
    <FilterBar
      onFilterChange={handleFilterChange}
      currentFilters={filters}
    />
  );
};

// =============================================================================
// 4. NewsletterForm Example
// =============================================================================

const NewsletterFormExample = () => {
  return (
    <>
      {/* Inline Layout (for header/footer) */}
      <div style={{ maxWidth: '600px' }}>
        <NewsletterForm
          layout="inline"
          placeholder="Your email address"
          buttonText="Subscribe"
          showTitle={true}
          showDescription={true}
        />
      </div>

      {/* Stacked Layout (for narrow sections) */}
      <div style={{ maxWidth: '400px', marginTop: '40px' }}>
        <NewsletterForm
          layout="stacked"
          placeholder="Enter your email"
          buttonText="Sign Up"
          title="Stay Updated"
          description="Get weekly specials and updates."
          showTitle={true}
          showDescription={true}
        />
      </div>

      {/* Minimal Version (without title/description) */}
      <div style={{ maxWidth: '500px', marginTop: '40px' }}>
        <NewsletterForm
          layout="inline"
          showTitle={false}
          showDescription={false}
          placeholder="Email"
          buttonText="Join"
        />
      </div>
    </>
  );
};

// =============================================================================
// 5. ChefCard Example
// =============================================================================

const ChefCardExample = () => {
  const exampleChef: Chef = {
    id: '1',
    name: 'Chef Wang Li',
    nameZh: '王力',
    title: 'Executive Chef',
    bio: 'Chef Wang has over 25 years of experience in authentic Sichuan cuisine. Trained in Chengdu, he brings traditional techniques and bold flavors to every dish. His passion for cooking started at age 15 when he apprenticed under Master Chen.',
    image: '/images/chefs/wang-li.jpg',
    specialties: ['Sichuan Cuisine', 'Noodle Making', 'Dim Sum'],
    experience: '25+ Years of Culinary Excellence',
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <ChefCard chef={exampleChef} bioMaxLength={150} />
    </div>
  );
};

// =============================================================================
// Complete Page Example: Menu Page
// =============================================================================

const MenuPageExample = () => {
  const [filters, setFilters] = React.useState<FilterState>({
    category: 'All',
    sortBy: 'popular',
    dietary: [],
    priceRange: { min: 0, max: 50 },
    searchQuery: '',
  });

  const [filteredDishes, setFilteredDishes] = React.useState<Dish[]>([]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Apply filters to dishes
    // applyFilters(newFilters);
  };

  const handleQuickView = (dish: Dish) => {
    // Open dish detail modal
  };

  return (
    <div style={{ padding: '40px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1>Our Menu</h1>

        {/* Filter Bar */}
        <FilterBar
          onFilterChange={handleFilterChange}
          currentFilters={filters}
        />

        {/* Dish Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '60px',
        }}>
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onQuickView={handleQuickView}
            />
          ))}
        </div>

        {/* Newsletter Section */}
        <div style={{
          background: '#f9f9f9',
          padding: '60px 40px',
          borderRadius: '12px',
          marginTop: '80px',
        }}>
          <NewsletterForm
            layout="inline"
            title="Join Our Community"
            description="Subscribe for exclusive offers and updates on new dishes."
          />
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// Complete Page Example: About/Team Page
// =============================================================================

const TeamPageExample = () => {
  const chefs: Chef[] = [
    // Array of chef data
  ];

  return (
    <div style={{ padding: '40px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1>Meet Our Chefs</h1>

        {/* Chef Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '32px',
          marginTop: '40px',
        }}>
          {chefs.map((chef) => (
            <ChefCard key={chef.id} chef={chef} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Export examples for documentation
export {
  DishCardExample,
  CartSummaryExample,
  FilterBarExample,
  NewsletterFormExample,
  ChefCardExample,
  MenuPageExample,
  TeamPageExample,
};
