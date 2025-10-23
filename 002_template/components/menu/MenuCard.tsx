'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MenuItem } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/utils/formatting';
import { useCart } from '@/contexts/CartContext';

interface MenuCardProps {
  item: MenuItem;
  index?: number;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, index = 0 }) => {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Quick add with default customizations
    const defaultCustomizations: { [key: string]: string } = {};
    if (item.customizations) {
      item.customizations.forEach(customization => {
        if (customization.required) {
          const defaultOption = customization.options[0];
          if (defaultOption) {
            defaultCustomizations[customization.id] = defaultOption.id;
          }
        }
      });
    }

    addItem(item, 1, defaultCustomizations);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/menu/${item.id}`}>
        <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Badges overlay */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
              {item.dietaryBadges.map(badge => (
                <Badge key={badge} variant={badge}>
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-xl font-display uppercase text-near-black mb-2 line-clamp-1">
              {item.name}
            </h3>
            <p className="text-sm text-charcoal/70 mb-3 line-clamp-2">
              {item.description}
            </p>

            {/* Nutrition info */}
            <div className="flex items-center gap-3 text-xs text-charcoal/60 mb-4">
              <span>{item.calories} cal</span>
              <span>•</span>
              <span>{item.protein}g protein</span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-2xl font-display text-ketchup">
                {formatPrice(item.price)}
              </span>
              <Button
                size="sm"
                onClick={handleQuickAdd}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Quick Add
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
