'use client';

import { useState, useMemo } from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { DishCard } from '@/components/features/DishCard';
import { FilterBar, FilterState } from '@/components/features/FilterBar';
import { dishes } from '@/data/dishes';
import { Dish, SortOption } from '@/types/dish';
import styles from './page.module.css';

const ITEMS_PER_PAGE = 12;

const categories = [
  'All',
  'Appetizers',
  'Soups',
  'Noodles',
  'Rice',
  "Chef's Specials",
  'Desserts',
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [filters, setFilters] = useState<FilterState>({
    dietary: [],
    priceRange: {
      min: 0,
      max: 50,
    },
    searchQuery: '',
  });

  // Filter and sort dishes
  const filteredDishes = useMemo(() => {
    let filtered = dishes;

    // Category filter (from tabs)
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((dish) => dish.category === selectedCategory);
    }

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (dish) =>
          dish.name.toLowerCase().includes(query) ||
          dish.description.toLowerCase().includes(query)
      );
    }

    // Dietary filters
    if (filters.dietary.includes('vegetarian')) {
      filtered = filtered.filter((dish) => dish.vegetarian);
    }
    if (filters.dietary.includes('vegan')) {
      filtered = filtered.filter((dish) => dish.vegan);
    }
    if (filters.dietary.includes('glutenFree')) {
      filtered = filtered.filter((dish) => dish.glutenFree);
    }

    // Price range filter
    filtered = filtered.filter(
      (dish) =>
        dish.price >= filters.priceRange.min &&
        dish.price <= filters.priceRange.max
    );

    // Sort
    const sorted = [...filtered];
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        sorted.sort((a, b) => {
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return 0;
        });
        break;
    }

    return sorted;
  }, [selectedCategory, sortBy, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredDishes.length / ITEMS_PER_PAGE);
  const paginatedDishes = filteredDishes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Header Section */}
      <section className={styles.header}>
        <Container>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Our Menu</h1>
            <p className={styles.description}>
              Explore our carefully curated selection of authentic Chinese dishes, from traditional
              favorites to modern interpretations
            </p>
          </div>
        </Container>
      </section>

      {/* Category Tabs */}
      <section className={styles.categorySection}>
        <Container>
          <div className={styles.categoryTabs}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryTab} ${
                  selectedCategory === category ? styles.activeTab : ''
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Filter and Menu Grid */}
      <section className={styles.menuSection}>
        <Container>
          <FilterBar
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            currentFilters={filters}
            currentSort={sortBy}
          />

          {/* Results Count */}
          <div className={styles.resultsCount}>
            Showing {paginatedDishes.length} of {filteredDishes.length} dishes
          </div>

          {/* Dish Grid */}
          {paginatedDishes.length > 0 ? (
            <div className={styles.dishGrid}>
              {paginatedDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <p>No dishes found matching your criteria.</p>
              <button
                className={styles.resetButton}
                onClick={() => {
                  setSelectedCategory('All');
                  setFilters({
                    dietary: [],
                    priceRange: {
                      min: 0,
                      max: 50,
                    },
                    searchQuery: '',
                  });
                }}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageButton}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`${styles.pageNumber} ${
                      currentPage === page ? styles.activePage : ''
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                className={styles.pageButton}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
