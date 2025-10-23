import { z } from 'zod';

/**
 * Email validation schema
 */
export const emailSchema = z.string().email('Please enter a valid email address');

/**
 * Phone validation schema
 */
export const phoneSchema = z
  .string()
  .min(10, 'Phone number must be at least 10 digits')
  .regex(/^[\d\s\-\(\)]+$/, 'Please enter a valid phone number');

/**
 * Zip code validation schema
 */
export const zipSchema = z
  .string()
  .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code');

/**
 * Newsletter subscription schema
 */
export const newsletterSchema = z.object({
  email: emailSchema,
});

/**
 * Customer info schema
 */
export const customerInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  phone: phoneSchema,
});

/**
 * Delivery address schema
 */
export const deliveryAddressSchema = z.object({
  street: z.string().min(5, 'Street address is required'),
  apt: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters'),
  zip: zipSchema,
  instructions: z.string().optional(),
});

/**
 * Checkout form schema
 */
export const checkoutSchema = z.object({
  customer: customerInfoSchema,
  orderType: z.enum(['pickup', 'delivery']),
  locationId: z.string().min(1, 'Please select a location'),
  deliveryAddress: deliveryAddressSchema.optional(),
});

/**
 * Validate delivery address for service area
 */
export const isInDeliveryArea = (zipCode: string): boolean => {
  // Mock validation - in real app, check against service area
  const validZips = ['97201', '97209', '97214', '97205', '97210', '97211', '97212'];
  return validZips.includes(zipCode);
};
