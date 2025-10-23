'use client';

import React, { useState, useEffect } from 'react';
import { SortOption } from '@/types/dish';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import styles from './FilterBar.module.css';

export interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sortBy: SortOption) => void;
  currentFilters?: FilterState;
  currentSort?: SortOption;
}

export interface FilterState {
  dietary: ('vegetarian' | 'vegan' | 'glutenFree')[];
  priceRange: {
    min: number;
    max: number;
  };
  searchQuery: string;
}

const SORT_OPTIONS = [
  { value: 'popular', label: 'Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A-Z' },
];

const DEFAULT_FILTERS: FilterState = {
  dietary: [],
  priceRange: {
    min: 0,
    max: 50,
  },
  searchQuery: '',
};

/**
 * FilterBar component provides filtering and sorting controls
 * for the menu page, including dietary preferences, price range, search, and sorting.
 */
export const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange,
  onSortChange,
  currentFilters,
  currentSort = 'popular',
}) => {
  const [filters, setFilters] = useState<FilterState>(
    currentFilters || DEFAULT_FILTERS
  );
  const [sortBy, setSortBy] = useState<SortOption>(currentSort);
  const [searchInput, setSearchInput] = useState(filters.searchQuery);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.searchQuery) {
        const newFilters = { ...filters, searchQuery: searchInput };
        setFilters(newFilters);
        onFilterChange(newFilters);
      }
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value as SortOption;
    setSortBy(newSortBy);
    onSortChange(newSortBy);
  };

  const handleDietaryChange = (dietary: 'vegetarian' | 'vegan' | 'glutenFree') => {
    const newDietary = filters.dietary.includes(dietary)
      ? filters.dietary.filter((d) => d !== dietary)
      : [...filters.dietary, dietary];
    const newFilters = { ...filters, dietary: newDietary };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (
    type: 'min' | 'max',
    value: string
  ) => {
    const numValue = parseFloat(value) || 0;
    const newFilters = {
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: numValue,
      },
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchInput('');
    onFilterChange(DEFAULT_FILTERS);
  };

  const hasActiveFilters =
    filters.dietary.length > 0 ||
    filters.priceRange.min > 0 ||
    filters.priceRange.max < 50 ||
    filters.searchQuery !== '';

  return (
    <div className={styles.filterBar}>
      <div className={styles.mainFilters}>
        {/* Search Input */}
        <div className={styles.searchWrapper}>
          <Input
            type="search"
            placeholder="Search dishes..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            startIcon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M21 21L16.65 16.65"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
            fullWidth
          />
        </div>

        {/* Sort By */}
        <div className={styles.selectWrapper}>
          <Select
            value={sortBy}
            onChange={handleSortChange}
            fullWidth
            aria-label="Sort by"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Advanced Filters Toggle */}
        <button
          className={styles.advancedToggle}
          onClick={() => setShowAdvanced(!showAdvanced)}
          aria-expanded={showAdvanced}
          aria-controls="advanced-filters"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={showAdvanced ? styles.rotated : ''}
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Filters</span>
        </button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            aria-label="Clear all filters"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div id="advanced-filters" className={styles.advancedFilters}>
          {/* Dietary Filters */}
          <div className={styles.filterGroup}>
            <label className={styles.filterGroupLabel}>Dietary Preferences</label>
            <div className={styles.checkboxGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={filters.dietary.includes('vegetarian')}
                  onChange={() => handleDietaryChange('vegetarian')}
                />
                <span className={styles.checkboxLabel}>Vegetarian</span>
              </label>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={filters.dietary.includes('vegan')}
                  onChange={() => handleDietaryChange('vegan')}
                />
                <span className={styles.checkboxLabel}>Vegan</span>
              </label>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={filters.dietary.includes('glutenFree')}
                  onChange={() => handleDietaryChange('glutenFree')}
                />
                <span className={styles.checkboxLabel}>Gluten-Free</span>
              </label>
            </div>
          </div>

          {/* Price Range */}
          <div className={styles.filterGroup}>
            <label className={styles.filterGroupLabel}>Price Range</label>
            <div className={styles.priceRangeInputs}>
              <div className={styles.priceInput}>
                <label htmlFor="price-min" className={styles.priceLabel}>
                  Min
                </label>
                <input
                  id="price-min"
                  type="number"
                  min="0"
                  max={filters.priceRange.max}
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                  className={styles.priceInputField}
                />
              </div>

              <span className={styles.priceSeparator}>-</span>

              <div className={styles.priceInput}>
                <label htmlFor="price-max" className={styles.priceLabel}>
                  Max
                </label>
                <input
                  id="price-max"
                  type="number"
                  min={filters.priceRange.min}
                  max="100"
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                  className={styles.priceInputField}
                />
              </div>
            </div>

            {/* Price Range Slider */}
            <div className={styles.priceRangeSlider}>
              <input
                type="range"
                min="0"
                max="50"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                className={styles.rangeSlider}
                aria-label="Maximum price"
              />
              <div className={styles.rangeLabels}>
                <span>$0</span>
                <span>$50+</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
