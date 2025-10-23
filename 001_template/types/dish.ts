export type Category = 'Appetizers' | 'Noodles' | 'Rice' | 'Chef\'s Specials' | 'Soups' | 'Desserts';

export type SpiceLevel = 0 | 1 | 2 | 3;

export type Allergen =
  | 'Gluten'
  | 'Dairy'
  | 'Eggs'
  | 'Soy'
  | 'Peanuts'
  | 'Tree Nuts'
  | 'Shellfish'
  | 'Fish'
  | 'Sesame';

export interface Dish {
  id: string;
  name: string;
  nameZh: string; // Chinese name
  description: string;
  price: number;
  category: Category;
  spiceLevel: SpiceLevel;
  allergens: Allergen[];
  ingredients: string[];
  images: {
    main: string;
    thumbnail: string;
    gallery?: string[];
  };
  featured: boolean;
  popular: boolean;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  relatedDishes?: string[]; // Array of dish IDs
}

export interface DishFilters {
  category?: Category;
  spiceLevel?: SpiceLevel;
  dietary?: ('vegetarian' | 'vegan' | 'glutenFree')[];
  priceRange?: {
    min: number;
    max: number;
  };
}

export type SortOption = 'price-asc' | 'price-desc' | 'popular' | 'name';
