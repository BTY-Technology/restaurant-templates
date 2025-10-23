'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MenuCard } from '@/components/menu/MenuCard';
import { MenuFilters } from '@/components/menu/MenuFilters';
import { menuItems } from '@/data/menuItems';
import { Category, SortOption, MenuItem } from '@/types';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  // Filter and sort menu items
  const filteredAndSortedItems = useMemo(() => {
    let items = [...menuItems];

    // Filter by category
    if (selectedCategory !== 'All') {
      items = items.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.ingredients.some(ing => ing.toLowerCase().includes(query))
      );
    }

    // Sort items
    items.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return items;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('popularity');
  };

  return (
    <div className="min-h-screen bg-parchment">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ketchup to-ketchup-dark text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display uppercase mb-4">
              Our Menu
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Explore our mouthwatering selection of smashed burgers, crispy chicken, and more
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="container mx-auto px-4 py-8">
        <MenuFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onClearFilters={handleClearFilters}
          itemCount={filteredAndSortedItems.length}
        />
      </section>

      {/* Menu Grid */}
      <section className="container mx-auto px-4 pb-16">
        {filteredAndSortedItems.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {filteredAndSortedItems.map((item, index) => (
              <MenuCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-display uppercase text-near-black mb-2">
              No items found
            </h3>
            <p className="text-charcoal/70 mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-ketchup text-white rounded-button font-medium
                       hover:bg-ketchup-dark transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
}
