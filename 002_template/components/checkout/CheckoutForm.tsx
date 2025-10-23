'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { OrderType, Location, DeliveryAddress } from '@/types';
import { locations } from '@/data/locations';

// Validation schemas for each step
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Invalid phone number'),
});

const orderTypeSchema = z.object({
  orderType: z.enum(['pickup', 'delivery'] as const),
  locationId: z.string().min(1, 'Please select a location'),
});

const deliveryAddressSchema = z.object({
  street: z.string().min(5, 'Street address is required'),
  apt: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters'),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  instructions: z.string().optional(),
});

const fullSchema = z.object({
  ...contactSchema.shape,
  ...orderTypeSchema.shape,
  ...deliveryAddressSchema.shape,
});

export type CheckoutFormData = z.infer<typeof fullSchema>;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting?: boolean;
}

type Step = 1 | 2 | 3;

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const [currentStep, setCurrentStep] = useState<Step>(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(fullSchema),
    mode: 'onBlur',
    defaultValues: {
      orderType: 'pickup',
      locationId: locations[0].id,
      state: 'OR',
    },
  });

  const orderType = watch('orderType');
  const locationId = watch('locationId');
  const selectedLocation = locations.find(loc => loc.id === locationId);

  const handleNext = async () => {
    let fieldsToValidate: (keyof CheckoutFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['name', 'email', 'phone'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['orderType', 'locationId'];
      if (orderType === 'delivery') {
        fieldsToValidate.push('street', 'city', 'state', 'zip');
      }
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(3, prev + 1) as Step);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1) as Step);
  };

  const progressPercentage = (currentStep / 3) * 100;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium text-charcoal">
          <span className={currentStep >= 1 ? 'text-ketchup' : ''}>1. Contact Info</span>
          <span className={currentStep >= 2 ? 'text-ketchup' : ''}>2. Order Details</span>
          <span className={currentStep >= 3 ? 'text-ketchup' : ''}>3. Review</span>
        </div>
        <div className="h-2 bg-parchment rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-ketchup"
            initial={{ width: '33.33%' }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Contact Information */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-near-black font-display">Contact Information</h2>

            <Input
              label="Full Name"
              {...register('name')}
              error={errors.name?.message}
              placeholder="John Doe"
            />

            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              placeholder="john@example.com"
            />

            <Input
              label="Phone Number"
              type="tel"
              {...register('phone')}
              error={errors.phone?.message}
              placeholder="(503) 555-1234"
            />
          </motion.div>
        )}

        {/* Step 2: Pickup or Delivery */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-near-black font-display">Order Type</h2>

            {/* Order Type Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-near-black">
                How would you like to receive your order?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-ketchup">
                  <input
                    type="radio"
                    value="pickup"
                    {...register('orderType')}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center space-y-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-medium">Pickup</span>
                  </div>
                  {orderType === 'pickup' && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-ketchup rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>

                <label className="relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-ketchup">
                  <input
                    type="radio"
                    value="delivery"
                    {...register('orderType')}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center space-y-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                    <span className="font-medium">Delivery</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-ketchup rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>
              </div>
              {errors.orderType && (
                <p className="text-sm text-red-600">{errors.orderType.message}</p>
              )}
            </div>

            {/* Location Selection */}
            <div className="space-y-3">
              <label htmlFor="location" className="block text-sm font-medium text-near-black">
                {orderType === 'pickup' ? 'Pickup Location' : 'Nearest Location'}
              </label>
              <select
                id="location"
                {...register('locationId')}
                className="w-full px-4 py-3 border-b-2 border-charcoal/20 bg-transparent transition-colors duration-200 focus:outline-none focus:border-ketchup"
              >
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name} - {location.address}
                  </option>
                ))}
              </select>
              {errors.locationId && (
                <p className="text-sm text-red-600">{errors.locationId.message}</p>
              )}
            </div>

            {/* Delivery Address Form */}
            <AnimatePresence>
              {orderType === 'delivery' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 pt-4 border-t border-charcoal/10"
                >
                  <h3 className="text-lg font-semibold text-near-black">Delivery Address</h3>

                  <Input
                    label="Street Address"
                    {...register('street')}
                    error={errors.street?.message}
                    placeholder="123 Main St"
                  />

                  <Input
                    label="Apartment, Suite, etc. (Optional)"
                    {...register('apt')}
                    error={errors.apt?.message}
                    placeholder="Apt 4B"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      {...register('city')}
                      error={errors.city?.message}
                      placeholder="Portland"
                    />

                    <Input
                      label="State"
                      {...register('state')}
                      error={errors.state?.message}
                      placeholder="OR"
                      maxLength={2}
                    />
                  </div>

                  <Input
                    label="ZIP Code"
                    {...register('zip')}
                    error={errors.zip?.message}
                    placeholder="97201"
                  />

                  <div className="space-y-2">
                    <label htmlFor="instructions" className="block text-sm font-medium text-near-black">
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      id="instructions"
                      {...register('instructions')}
                      rows={3}
                      className="w-full px-4 py-3 border-b-2 border-charcoal/20 bg-transparent transition-colors duration-200 focus:outline-none focus:border-ketchup resize-none"
                      placeholder="Ring doorbell, leave at door, etc."
                    />
                    {errors.instructions && (
                      <p className="text-sm text-red-600">{errors.instructions.message}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-near-black font-display">Review Your Order</h2>

            <div className="bg-parchment rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-charcoal/60 mb-1">Contact Information</h3>
                <p className="text-near-black">{watch('name')}</p>
                <p className="text-near-black">{watch('email')}</p>
                <p className="text-near-black">{watch('phone')}</p>
              </div>

              <div className="border-t border-charcoal/10 pt-4">
                <h3 className="text-sm font-medium text-charcoal/60 mb-1">Order Type</h3>
                <p className="text-near-black capitalize">{orderType}</p>
              </div>

              <div className="border-t border-charcoal/10 pt-4">
                <h3 className="text-sm font-medium text-charcoal/60 mb-1">
                  {orderType === 'pickup' ? 'Pickup Location' : 'Nearest Location'}
                </h3>
                <p className="text-near-black font-medium">{selectedLocation?.name}</p>
                <p className="text-sm text-charcoal/80">{selectedLocation?.address}</p>
                <p className="text-sm text-charcoal/80">
                  {selectedLocation?.city}, {selectedLocation?.state} {selectedLocation?.zip}
                </p>
              </div>

              {orderType === 'delivery' && (
                <div className="border-t border-charcoal/10 pt-4">
                  <h3 className="text-sm font-medium text-charcoal/60 mb-1">Delivery Address</h3>
                  <p className="text-near-black">{watch('street')} {watch('apt')}</p>
                  <p className="text-near-black">
                    {watch('city')}, {watch('state')} {watch('zip')}
                  </p>
                  {watch('instructions') && (
                    <p className="text-sm text-charcoal/80 mt-2">
                      <span className="font-medium">Instructions:</span> {watch('instructions')}
                    </p>
                  )}
                </div>
              )}

              <div className="border-t border-charcoal/10 pt-4">
                <h3 className="text-sm font-medium text-charcoal/60 mb-1">Payment Method</h3>
                <div className="flex items-center space-x-2">
                  <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
                    <rect width="32" height="20" rx="3" fill="#1434CB"/>
                    <path d="M11.5 10L14.5 13L20.5 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-near-black">Card ending in 4242 (Mock)</span>
                </div>
                <p className="text-xs text-charcoal/60 mt-2">
                  This is a demo. No actual payment will be processed.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-charcoal/10">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1 || isSubmitting}
        >
          Back
        </Button>

        {currentStep < 3 ? (
          <Button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
          >
            Next
          </Button>
        ) : (
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Place Order
          </Button>
        )}
      </div>
    </form>
  );
};
