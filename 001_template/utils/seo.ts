import { Dish } from '@/types/dish';
import { Location } from '@/types/location';

/**
 * SEO and Structured Data Utilities
 */

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
    images: string[];
    type: string;
  };
}

/**
 * Generate page metadata for SEO
 */
export const generateMetadata = (
  title: string,
  description: string,
  image?: string
): PageMetadata => {
  const siteName = 'Golden Wok';
  const fullTitle = `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      images: image ? [image] : ['/og-image.jpg'],
      type: 'website',
    },
  };
};

/**
 * Generate Restaurant schema.org structured data
 */
export const generateRestaurantSchema = (location: Location) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Golden Wok',
    image: location.images,
    '@id': `https://goldenwok.com/locations/${location.id}`,
    url: 'https://goldenwok.com',
    telephone: location.phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      postalCode: location.address.zipCode,
      addressCountry: location.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    openingHoursSpecification: location.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.day,
      opens: h.closed ? undefined : h.open,
      closes: h.closed ? undefined : h.close,
    })),
    servesCuisine: ['Chinese', 'Sichuan', 'Cantonese'],
    acceptsReservations: 'True',
    menu: 'https://goldenwok.com/menu',
  };
};

/**
 * Generate MenuItem schema.org structured data
 */
export const generateMenuItemSchema = (dish: Dish) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: dish.name,
    description: dish.description,
    image: dish.images.main,
    offers: {
      '@type': 'Offer',
      price: dish.price.toString(),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    nutrition: dish.nutritionInfo
      ? {
          '@type': 'NutritionInformation',
          calories: `${dish.nutritionInfo.calories} calories`,
          proteinContent: `${dish.nutritionInfo.protein}g`,
          carbohydrateContent: `${dish.nutritionInfo.carbs}g`,
          fatContent: `${dish.nutritionInfo.fat}g`,
        }
      : undefined,
    suitableForDiet: [
      dish.vegetarian ? 'https://schema.org/VegetarianDiet' : null,
      dish.vegan ? 'https://schema.org/VeganDiet' : null,
      dish.glutenFree ? 'https://schema.org/GlutenFreeDiet' : null,
    ].filter(Boolean),
  };
};

/**
 * Generate BreadcrumbList schema.org structured data
 */
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://goldenwok.com${item.url}`,
    })),
  };
};

/**
 * Generate LocalBusiness schema.org structured data
 */
export const generateLocalBusinessSchema = (location: Location) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: location.name,
    image: location.images,
    '@id': `https://goldenwok.com/locations/${location.id}`,
    url: 'https://goldenwok.com',
    telephone: location.phone,
    email: location.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      postalCode: location.address.zipCode,
      addressCountry: location.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    openingHoursSpecification: location.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.day,
      opens: h.closed ? undefined : h.open,
      closes: h.closed ? undefined : h.close,
    })),
  };
};

/**
 * Generate Menu schema.org structured data
 */
export const generateMenuSchema = (dishes: Dish[], category?: string) => {
  const menuSection = category
    ? {
        '@type': 'MenuSection',
        name: category,
        hasMenuItem: dishes.map((dish) => ({
          '@type': 'MenuItem',
          name: dish.name,
          description: dish.description,
          offers: {
            '@type': 'Offer',
            price: dish.price.toString(),
            priceCurrency: 'USD',
          },
          image: dish.images.main,
        })),
      }
    : dishes.map((dish) => ({
        '@type': 'MenuItem',
        name: dish.name,
        description: dish.description,
        offers: {
          '@type': 'Offer',
          price: dish.price.toString(),
          priceCurrency: 'USD',
        },
        image: dish.images.main,
      }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'Golden Wok Menu',
    hasMenuSection: category ? [menuSection] : undefined,
    hasMenuItem: !category ? menuSection : undefined,
  };
};

/**
 * Generate FAQ schema.org structured data
 */
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

/**
 * Generate Organization schema.org structured data
 */
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Golden Wok',
    url: 'https://goldenwok.com',
    logo: 'https://goldenwok.com/logo.png',
    description:
      'Authentic Chinese cuisine with modern flair. Experience the best of Sichuan and Cantonese flavors at Golden Wok.',
    sameAs: [
      'https://facebook.com/goldenwok',
      'https://instagram.com/goldenwok',
      'https://twitter.com/goldenwok',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-0123',
      contactType: 'Customer Service',
      areaServed: 'US',
      availableLanguage: ['English', 'Chinese'],
    },
  };
};
