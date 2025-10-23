import { MenuItem, Location } from '@/types';

/**
 * SEO and Structured Data utilities
 */

const SITE_NAME = 'Smash & Stack';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/**
 * Generate Restaurant Schema.org structured data
 */
export const getRestaurantSchema = (location: Location) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: SITE_NAME,
    image: `${SITE_URL}/images/hero-burger.jpg`,
    '@id': `${SITE_URL}/#restaurant`,
    url: SITE_URL,
    telephone: location.phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    openingHoursSpecification: Object.entries(location.hours).map(([day, hours]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: day,
      opens: hours.split(' - ')[0],
      closes: hours.split(' - ')[1],
    })),
    servesCuisine: 'American',
    acceptsReservations: false,
    menu: `${SITE_URL}/menu`,
  };
};

/**
 * Generate MenuItem Schema.org structured data
 */
export const getMenuItemSchema = (item: MenuItem) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: item.name,
    description: item.description,
    image: item.image,
    offers: {
      '@type': 'Offer',
      price: item.price.toString(),
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
    suitableForDiet: item.dietaryBadges.map(badge => {
      const dietMap: Record<string, string> = {
        Vegetarian: 'https://schema.org/VegetarianDiet',
        Vegan: 'https://schema.org/VeganDiet',
        'Gluten-Free': 'https://schema.org/GlutenFreeDiet',
      };
      return dietMap[badge];
    }).filter(Boolean),
  };
};

/**
 * Generate Breadcrumb Schema.org structured data
 */
export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
};

/**
 * Generate Organization Schema.org structured data
 */
export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://www.facebook.com/smashandstack',
      'https://www.instagram.com/smashandstack',
      'https://twitter.com/smashandstack',
    ],
  };
};

/**
 * Generate default OpenGraph metadata
 */
export const getDefaultMetadata = () => {
  return {
    title: {
      default: `${SITE_NAME} | Premium Smash Burgers & American Comfort Food`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      'Discover premium smash burgers with crispy edges, fresh ingredients, and bold flavors. Order online for pickup or delivery.',
    keywords: [
      'burgers',
      'smash burgers',
      'american food',
      'comfort food',
      'restaurant',
      'delivery',
      'takeout',
      'chicken sandwich',
      'milkshakes',
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: SITE_URL,
      siteName: SITE_NAME,
      title: `${SITE_NAME} | Premium Smash Burgers`,
      description: 'Premium smash burgers with crispy edges and fresh ingredients.',
      images: [
        {
          url: `${SITE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} Burgers`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} | Premium Smash Burgers`,
      description: 'Premium smash burgers with crispy edges and fresh ingredients.',
      images: [`${SITE_URL}/images/og-image.jpg`],
      creator: '@smashandstack',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
};
