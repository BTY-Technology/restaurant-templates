/**
 * Examples of UI Components Usage
 *
 * This file demonstrates how to use all the UI components in various scenarios.
 * Copy and adapt these examples for your specific use cases.
 */

import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Badge,
  VegetarianBadge,
  VeganBadge,
  GlutenFreeBadge,
  SpiceBadge,
  AllergenBadge,
  Input,
  Textarea,
  Select,
  OptGroup,
  Modal,
  Button,
} from './index';

/**
 * Example 1: Menu Item Card
 * Perfect for displaying dishes on the menu page
 */
export function MenuItemCard() {
  const [cartModalOpen, setCartModalOpen] = useState(false);

  return (
    <>
      <Card
        image="/images/kung-pao-chicken.jpg"
        imageAlt="Kung Pao Chicken"
        imageAspectRatio="4/3"
        hoverable
        padding="md"
      >
        <CardHeader>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <SpiceBadge level={2} size="sm" />
            <AllergenBadge allergen="nuts" size="sm" />
            <Badge variant="primary" size="sm">Popular</Badge>
          </div>
          <CardTitle>Kung Pao Chicken</CardTitle>
          <CardDescription>
            Spicy stir-fried chicken with peanuts, vegetables, and chili peppers in a savory sauce
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#C4001D' }}>$14.95</span>
          <Button size="sm" onClick={() => setCartModalOpen(true)}>
            Add to Cart
          </Button>
        </CardFooter>
      </Card>

      {/* Cart confirmation modal */}
      <Modal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        title="Added to Cart"
        size="sm"
      >
        <p>Kung Pao Chicken has been added to your cart!</p>
      </Modal>
    </>
  );
}

/**
 * Example 2: Reservation Form
 * Complete form with validation and all input types
 */
export function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    specialRequests: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation logic here
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          required
          fullWidth
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          helpText="We'll send your confirmation here"
          required
          fullWidth
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="(555) 123-4567"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={errors.phone}
          required
          fullWidth
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            error={errors.date}
            required
            fullWidth
          />

          <Select
            label="Time"
            placeholder="Select time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            error={errors.time}
            required
            fullWidth
            options={[
              { value: '17:00', label: '5:00 PM' },
              { value: '17:30', label: '5:30 PM' },
              { value: '18:00', label: '6:00 PM' },
              { value: '18:30', label: '6:30 PM' },
              { value: '19:00', label: '7:00 PM' },
              { value: '19:30', label: '7:30 PM' },
              { value: '20:00', label: '8:00 PM' },
              { value: '20:30', label: '8:30 PM' },
            ]}
          />
        </div>

        <Select
          label="Number of Guests"
          placeholder="Select party size"
          value={formData.guests}
          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
          error={errors.guests}
          required
          fullWidth
          options={[
            { value: '1', label: '1 person' },
            { value: '2', label: '2 people' },
            { value: '3', label: '3 people' },
            { value: '4', label: '4 people' },
            { value: '5', label: '5 people' },
            { value: '6', label: '6 people' },
            { value: '7', label: '7+ people' },
          ]}
        />

        <Textarea
          label="Special Requests"
          placeholder="Any dietary restrictions or special occasions?"
          value={formData.specialRequests}
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          helpText="Optional - Let us know how we can make your experience special"
          rows={4}
          fullWidth
        />

        <Button type="submit" variant="primary" size="lg" fullWidth>
          Make Reservation
        </Button>
      </div>
    </form>
  );
}

/**
 * Example 3: Menu Filter with Select and Badges
 * Filtering menu items by category and dietary preferences
 */
export function MenuFilter() {
  const [category, setCategory] = useState('');
  const [dietary, setDietary] = useState('');

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
      <Select
        label="Category"
        placeholder="All Categories"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        size="md"
        style={{ minWidth: '200px' }}
      >
        <OptGroup label="Appetizers">
          <option value="spring-rolls">Spring Rolls</option>
          <option value="dumplings">Dumplings</option>
          <option value="soups">Soups</option>
        </OptGroup>
        <OptGroup label="Main Courses">
          <option value="chicken">Chicken</option>
          <option value="beef">Beef</option>
          <option value="seafood">Seafood</option>
          <option value="vegetarian">Vegetarian</option>
        </OptGroup>
        <OptGroup label="Desserts">
          <option value="traditional">Traditional</option>
          <option value="modern">Modern</option>
        </OptGroup>
      </Select>

      <Select
        label="Dietary Preference"
        placeholder="All Options"
        value={dietary}
        onChange={(e) => setDietary(e.target.value)}
        size="md"
        style={{ minWidth: '200px' }}
        options={[
          { value: 'vegetarian', label: 'Vegetarian' },
          { value: 'vegan', label: 'Vegan' },
          { value: 'gluten-free', label: 'Gluten-Free' },
        ]}
      />

      <Button variant="outline" onClick={() => { setCategory(''); setDietary(''); }}>
        Clear Filters
      </Button>
    </div>
  );
}

/**
 * Example 4: Image Gallery Modal
 * Clicking on an image opens a full-screen modal
 */
export function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: '/images/dish-1.jpg', alt: 'Kung Pao Chicken' },
    { src: '/images/dish-2.jpg', alt: 'Beef & Broccoli' },
    { src: '/images/dish-3.jpg', alt: 'Sweet & Sour Pork' },
  ];

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {images.map((image, index) => (
          <Card
            key={index}
            image={image.src}
            imageAlt={image.alt}
            imageAspectRatio="1/1"
            hoverable
            onClick={() => setSelectedImage(image.src)}
            padding="none"
          />
        ))}
      </div>

      {/* Image zoom modal */}
      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        size="xl"
        showCloseButton
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Enlarged view"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        )}
      </Modal>
    </>
  );
}

/**
 * Example 5: Shopping Cart Modal
 * Full-featured cart with items, totals, and actions
 */
export function ShoppingCartModal() {
  const [isOpen, setIsOpen] = useState(false);

  const cartItems = [
    { name: 'Kung Pao Chicken', price: 14.95, quantity: 2 },
    { name: 'Beef & Broccoli', price: 13.95, quantity: 1 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        View Cart ({cartItems.length})
      </Button>

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
            <Button variant="primary">Checkout (${total.toFixed(2)})</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.map((item, index) => (
            <Card key={index} bordered padding="sm">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0' }}>{item.name}</h4>
                  <p style={{ margin: 0, color: '#6B7280', fontSize: '0.875rem' }}>
                    Quantity: {item.quantity}
                  </p>
                </div>
                <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </Card>
          ))}

          <div style={{ borderTop: '1px solid #F1E6C8', paddingTop: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '1.125rem' }}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

/**
 * Example 6: Badge Showcase
 * Displaying various dietary and allergen information
 */
export function DishBadges() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <VegetarianBadge size="sm" />
      <VeganBadge size="sm" />
      <GlutenFreeBadge size="sm" />
      <SpiceBadge level={1} size="sm" />
      <SpiceBadge level={2} size="sm" />
      <SpiceBadge level={3} size="sm" />
      <AllergenBadge allergen="nuts" size="sm" />
      <AllergenBadge allergen="dairy" size="sm" />
      <AllergenBadge allergen="shellfish" size="sm" />
      <Badge variant="primary" size="sm">Chef&apos;s Special</Badge>
      <Badge variant="success" size="sm">Best Seller</Badge>
      <Badge variant="warning" size="sm">Limited Time</Badge>
    </div>
  );
}
