'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Category, SortOption } from '@/types';
import clsx from 'clsx';
import { Search, X } from 'lucide-react';

interface MenuFiltersProps {
  selectedCategory: Category | 'All';
  onCategoryChange: (category: Category | 'All') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
  itemCount: number;
}

const categories: (Category | 'All')[] = ['All', 'Burgers', 'Chicken', 'Sides', 'Shakes'];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A-Z' },
];

export const MenuFilters: React.FC<MenuFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onClearFilters,
  itemCount,
}) => {
  const hasActiveFilters = selectedCategory !== 'All' || searchQuery !== '' || sortBy !== 'popularity';

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40">
          <Search size={20} />
        </div>
        <Input
          type="text"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 pr-4 py-3 border-2 border-charcoal/20 rounded-full"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={clsx(
              'px-6 py-2 rounded-full font-medium transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-ketchup focus:ring-offset-2',
              selectedCategory === category
                ? 'bg-ketchup text-white shadow-md'
                : 'bg-white text-charcoal border-2 border-charcoal/20 hover:border-ketchup hover:text-ketchup'
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Sort and Clear Filters Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm font-medium text-charcoal whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="px-4 py-2 border-2 border-charcoal/20 rounded-button bg-white text-charcoal
                     focus:outline-none focus:border-ketchup transition-colors duration-200
                     cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Item Count and Clear Filters */}
        <div className="flex items-center gap-4">
          <p className="text-sm text-charcoal/70">
            <span className="font-semibold text-near-black">{itemCount}</span> items found
          </p>
          {hasActiveFilters && (
            <motion.button
              onClick={onClearFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ketchup
                       hover:bg-ketchup/10 rounded-button transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={16} />
              Clear Filters
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};
