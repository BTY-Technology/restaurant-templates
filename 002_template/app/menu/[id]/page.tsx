'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { menuItems, getItemById, getRelatedItems } from '@/data/menuItems';
import { MenuItem, CustomizationOption } from '@/types';
import { formatPrice } from '@/utils/formatting';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MenuCard } from '@/components/menu/MenuCard';
import {
  ChevronLeft,
  Minus,
  Plus,
  ShoppingCart,
  Flame,
  Info,
  ZoomIn,
} from 'lucide-react';
import clsx from 'clsx';

// Allergen icon component
const AllergenIcon: React.FC<{ allergen: string }> = ({ allergen }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full">
    <Info size={16} className="text-red-600" />
    <span className="text-sm text-red-900 font-medium">{allergen}</span>
  </div>
);

// Ingredient item component
const IngredientItem: React.FC<{ ingredient: string }> = ({ ingredient }) => (
  <div className="flex items-center gap-2">
    <div className="w-2 h-2 bg-ketchup rounded-full" />
    <span className="text-charcoal">{ingredient}</span>
  </div>
);

export default function MenuItemPage() {
  const params = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [customizations, setCustomizations] = useState<{
    [key: string]: string | string[];
  }>({});

  const item = getItemById(params.id as string);
  const relatedItems = item ? getRelatedItems(item.id) : [];

  if (!item) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display uppercase text-near-black mb-4">
            Item Not Found
          </h1>
          <p className="text-charcoal/70 mb-6">
            The menu item you&apos;re looking for doesn&apos;t exist
          </p>
          <Link href="/menu">
            <Button>Back to Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = item.images || [item.image];
  const totalPrice = calculateTotalPrice(item, customizations, quantity);

  // Handle customization change
  const handleCustomizationChange = (
    customizationId: string,
    optionId: string,
    isCheckbox: boolean
  ) => {
    setCustomizations((prev) => {
      if (isCheckbox) {
        const currentValues = (prev[customizationId] as string[]) || [];
        if (currentValues.includes(optionId)) {
          return {
            ...prev,
            [customizationId]: currentValues.filter((id) => id !== optionId),
          };
        } else {
          return {
            ...prev,
            [customizationId]: [...currentValues, optionId],
          };
        }
      } else {
        return {
          ...prev,
          [customizationId]: optionId,
        };
      }
    });
  };

  // Check if all required customizations are selected
  const canAddToCart = () => {
    if (!item.customizations) return true;
    return item.customizations
      .filter((c) => c.required)
      .every((c) => customizations[c.id]);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!canAddToCart()) return;

    // Set default values for required customizations if not set
    const finalCustomizations = { ...customizations };
    item.customizations?.forEach((customization) => {
      if (customization.required && !finalCustomizations[customization.id]) {
        finalCustomizations[customization.id] = customization.options[0].id;
      }
    });

    addItem(item, quantity, finalCustomizations);
  };

  return (
    <div className="min-h-screen bg-parchment">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-charcoal/10">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-charcoal/60 hover:text-ketchup transition-colors"
            >
              Home
            </Link>
            <span className="text-charcoal/40">/</span>
            <Link
              href="/menu"
              className="text-charcoal/60 hover:text-ketchup transition-colors"
            >
              Menu
            </Link>
            <span className="text-charcoal/40">/</span>
            <span className="text-near-black font-medium">{item.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link href="/menu">
          <motion.button
            className="flex items-center gap-2 text-charcoal hover:text-ketchup
                     transition-colors duration-200 mb-8 group"
            whileHover={{ x: -4 }}
          >
            <ChevronLeft
              size={20}
              className="group-hover:text-ketchup transition-colors"
            />
            <span className="font-medium">Back to Menu</span>
          </motion.button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4 group">
              <Image
                src={images[selectedImage]}
                alt={item.name}
                fill
                className={clsx(
                  'object-cover transition-transform duration-500',
                  isImageZoomed ? 'scale-150' : 'group-hover:scale-110'
                )}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <button
                onClick={() => setIsImageZoomed(!isImageZoomed)}
                className="absolute top-4 right-4 p-2 bg-white/90 rounded-full
                         hover:bg-white transition-colors duration-200"
                aria-label="Zoom image"
              >
                <ZoomIn size={20} className="text-charcoal" />
              </button>
              {/* Dietary badges overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {item.dietaryBadges.map((badge) => (
                  <Badge key={badge} variant={badge} size="md">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={clsx(
                      'relative w-20 h-20 rounded-lg overflow-hidden',
                      'border-2 transition-all duration-200',
                      selectedImage === idx
                        ? 'border-ketchup ring-2 ring-ketchup/20'
                        : 'border-charcoal/20 hover:border-ketchup/50'
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${item.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Title and Price */}
            <div>
              <h1 className="text-4xl md:text-5xl font-display uppercase text-near-black mb-3">
                {item.name}
              </h1>
              <p className="text-xl md:text-2xl font-display text-ketchup">
                {formatPrice(item.price)}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-charcoal leading-relaxed">
              {item.description}
            </p>

            {/* Nutrition Info */}
            <div className="bg-white rounded-lg p-6 border border-charcoal/10">
              <h3 className="text-lg font-display uppercase text-near-black mb-4">
                Nutrition Information
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <Flame className="w-6 h-6 text-ketchup mx-auto mb-2" />
                  <p className="text-2xl font-display text-near-black">
                    {item.calories}
                  </p>
                  <p className="text-sm text-charcoal/70">Calories</p>
                </div>
                {item.protein !== undefined && (
                  <div className="text-center">
                    <p className="text-2xl font-display text-near-black">
                      {item.protein}g
                    </p>
                    <p className="text-sm text-charcoal/70">Protein</p>
                  </div>
                )}
                {item.carbs !== undefined && (
                  <div className="text-center">
                    <p className="text-2xl font-display text-near-black">
                      {item.carbs}g
                    </p>
                    <p className="text-sm text-charcoal/70">Carbs</p>
                  </div>
                )}
                {item.fat !== undefined && (
                  <div className="text-center">
                    <p className="text-2xl font-display text-near-black">
                      {item.fat}g
                    </p>
                    <p className="text-sm text-charcoal/70">Fat</p>
                  </div>
                )}
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-white rounded-lg p-6 border border-charcoal/10">
              <h3 className="text-lg font-display uppercase text-near-black mb-4">
                Ingredients
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.ingredients.map((ingredient, idx) => (
                  <IngredientItem key={idx} ingredient={ingredient} />
                ))}
              </div>
            </div>

            {/* Allergens */}
            {item.allergens.length > 0 && (
              <div className="bg-red-50/50 rounded-lg p-6 border border-red-200">
                <h3 className="text-lg font-display uppercase text-near-black mb-4">
                  Allergen Information
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.allergens.map((allergen, idx) => (
                    <AllergenIcon key={idx} allergen={allergen} />
                  ))}
                </div>
              </div>
            )}

            {/* Customizations */}
            {item.customizations && item.customizations.length > 0 && (
              <div className="space-y-4">
                {item.customizations.map((customization) => (
                  <div
                    key={customization.id}
                    className="bg-white rounded-lg p-6 border border-charcoal/10"
                  >
                    <h3 className="text-lg font-display uppercase text-near-black mb-4">
                      {customization.name}
                      {customization.required && (
                        <span className="text-ketchup ml-2">*</span>
                      )}
                    </h3>

                    <div className="space-y-3">
                      {customization.options.map((option) => {
                        const isSelected =
                          customization.type === 'radio'
                            ? customizations[customization.id] === option.id
                            : (customizations[customization.id] as string[])?.includes(
                                option.id
                              );

                        return (
                          <label
                            key={option.id}
                            className={clsx(
                              'flex items-center justify-between p-3 rounded-lg cursor-pointer',
                              'border-2 transition-all duration-200',
                              isSelected
                                ? 'border-ketchup bg-ketchup/5'
                                : 'border-charcoal/10 hover:border-ketchup/50'
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type={customization.type}
                                name={customization.id}
                                value={option.id}
                                checked={isSelected}
                                onChange={() =>
                                  handleCustomizationChange(
                                    customization.id,
                                    option.id,
                                    customization.type === 'checkbox'
                                  )
                                }
                                className="w-5 h-5 text-ketchup focus:ring-ketchup"
                              />
                              <span className="font-medium text-charcoal">
                                {option.name}
                              </span>
                            </div>
                            {option.price > 0 && (
                              <span className="text-ketchup font-medium">
                                +{formatPrice(option.price)}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="sticky bottom-4 bg-white rounded-lg p-6 border-2 border-charcoal/10 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-charcoal">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-full
                             border-2 border-charcoal/20 hover:border-ketchup
                             transition-colors duration-200"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-2xl font-display w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full
                             border-2 border-charcoal/20 hover:border-ketchup
                             transition-colors duration-200"
                    aria-label="Increase quantity"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!canAddToCart()}
                fullWidth
                size="lg"
                className="flex items-center justify-center gap-3"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart - {formatPrice(totalPrice)}</span>
              </Button>

              {!canAddToCart() && (
                <p className="text-sm text-red-600 text-center mt-2">
                  Please select all required options
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-3xl md:text-4xl font-display uppercase text-near-black mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((relatedItem, idx) => (
                <MenuCard key={relatedItem.id} item={relatedItem} index={idx} />
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MenuItem',
            name: item.name,
            description: item.description,
            image: images[0],
            offers: {
              '@type': 'Offer',
              price: item.price,
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            nutrition: {
              '@type': 'NutritionInformation',
              calories: `${item.calories} calories`,
              proteinContent: item.protein ? `${item.protein}g` : undefined,
              carbohydrateContent: item.carbs ? `${item.carbs}g` : undefined,
              fatContent: item.fat ? `${item.fat}g` : undefined,
            },
            suitableForDiet: item.dietaryBadges.map((badge) => {
              const dietMap: { [key: string]: string } = {
                Vegetarian: 'https://schema.org/VegetarianDiet',
                Vegan: 'https://schema.org/VeganDiet',
                'Gluten-Free': 'https://schema.org/GlutenFreeDiet',
              };
              return dietMap[badge];
            }).filter(Boolean),
          }),
        }}
      />
    </div>
  );
}

// Helper function to calculate total price with customizations
function calculateTotalPrice(
  item: MenuItem,
  customizations: { [key: string]: string | string[] },
  quantity: number
): number {
  let price = item.price;

  if (item.customizations) {
    item.customizations.forEach((customization) => {
      const selectedValue = customizations[customization.id];
      if (!selectedValue) return;

      if (customization.type === 'radio') {
        const option = customization.options.find(
          (opt) => opt.id === selectedValue
        );
        if (option) price += option.price;
      } else {
        // checkbox
        const selectedIds = selectedValue as string[];
        selectedIds?.forEach((id) => {
          const option = customization.options.find((opt) => opt.id === id);
          if (option) price += option.price;
        });
      }
    });
  }

  return price * quantity;
}
