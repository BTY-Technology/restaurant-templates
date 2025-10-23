'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Dish } from '@/types/dish';
import { useCart } from '@/context/CartContext';
import { Card } from '@/components/ui/Card';
import { Badge, VegetarianBadge, VeganBadge, GlutenFreeBadge, SpiceBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import styles from './DishCard.module.css';

export interface DishCardProps {
  dish: Dish;
  onQuickView?: (dish: Dish) => void;
}

/**
 * DishCard component displays individual dish information with image, details,
 * dietary badges, and add to cart functionality.
 */
export const DishCard: React.FC<DishCardProps> = ({ dish, onQuickView }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(dish, 1);

    // Simulate brief loading state for UX feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const handleQuickView = () => {
    if (onQuickView) {
      onQuickView(dish);
    }
  };

  return (
    <Card className={styles.dishCard} padding="none" hoverable>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={dish.images.main}
            alt={dish.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
          />
        </div>

        {/* Popular badge overlay */}
        {dish.popular && (
          <div className={styles.popularBadge}>
            <Badge variant="warning" size="sm">Popular</Badge>
          </div>
        )}

        {/* Featured badge overlay */}
        {dish.featured && (
          <div className={styles.featuredBadge}>
            <Badge variant="primary" size="sm">Featured</Badge>
          </div>
        )}

        {/* Quick view button */}
        {onQuickView && (
          <button
            className={styles.quickViewButton}
            onClick={handleQuickView}
            aria-label={`Quick view ${dish.name}`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Quick View</span>
          </button>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h3 className={styles.dishName}>{dish.name}</h3>
            <p className={styles.dishNameZh}>{dish.nameZh}</p>
          </div>
          <div className={styles.price}>${dish.price.toFixed(2)}</div>
        </div>

        <p className={styles.description}>{dish.description}</p>

        {/* Dietary and spice badges */}
        <div className={styles.badges}>
          {dish.vegetarian && <VegetarianBadge size="sm" />}
          {dish.vegan && <VeganBadge size="sm" />}
          {dish.glutenFree && <GlutenFreeBadge size="sm" />}
          {dish.spiceLevel > 0 && (
            <SpiceBadge level={dish.spiceLevel as 1 | 2 | 3} size="sm" />
          )}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button
            variant="primary"
            fullWidth
            onClick={handleAddToCart}
            loading={isAdding}
            disabled={isAdding}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
