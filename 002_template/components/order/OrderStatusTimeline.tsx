'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { OrderStatus } from '@/types';
import { formatTime } from '@/utils/formatting';
import clsx from 'clsx';

interface TimelineStep {
  status: OrderStatus;
  label: string;
  icon: React.ReactNode;
}

interface OrderStatusTimelineProps {
  currentStatus: OrderStatus;
  orderType: 'pickup' | 'delivery';
  placedAt: Date;
  estimatedTime: number;
}

export const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({
  currentStatus,
  orderType,
  placedAt,
  estimatedTime,
}) => {
  const timelineSteps: TimelineStep[] = [
    {
      status: 'created',
      label: 'Order Created',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      status: 'confirmed',
      label: 'Order Confirmed',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      status: 'preparing',
      label: 'Being Prepared',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
    orderType === 'delivery'
      ? {
          status: 'out_for_delivery',
          label: 'Out for Delivery',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
          ),
        }
      : {
          status: 'ready',
          label: 'Ready for Pickup',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
        },
    {
      status: orderType === 'delivery' ? 'delivered' : 'completed',
      label: orderType === 'delivery' ? 'Delivered' : 'Completed',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
  ];

  const statusOrder: OrderStatus[] = [
    'created',
    'confirmed',
    'preparing',
    'ready',
    'out_for_delivery',
    'delivered',
    'completed',
  ];

  const currentIndex = statusOrder.indexOf(currentStatus);

  const getStepState = (stepStatus: OrderStatus): 'completed' | 'current' | 'upcoming' => {
    const stepIndex = statusOrder.indexOf(stepStatus);
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const getEstimatedTimeForStep = (stepStatus: OrderStatus): string => {
    const stepIndex = statusOrder.indexOf(stepStatus);
    if (stepIndex <= currentIndex) {
      const minutesPassed = stepIndex * (estimatedTime / (timelineSteps.length - 1));
      const stepTime = new Date(placedAt.getTime() + minutesPassed * 60000);
      return formatTime(stepTime);
    }
    return '';
  };

  return (
    <div className="space-y-8">
      {/* Timeline */}
      <div className="relative">
        {timelineSteps.map((step, index) => {
          const state = getStepState(step.status);
          const isLast = index === timelineSteps.length - 1;

          return (
            <div key={step.status} className="relative pb-8 last:pb-0">
              {!isLast && (
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-charcoal/10">
                  <motion.div
                    className="w-full bg-ketchup origin-top"
                    initial={{ scaleY: 0 }}
                    animate={{
                      scaleY: state === 'completed' ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </div>
              )}

              <div className="relative flex items-start space-x-4">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={clsx(
                    'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300',
                    state === 'completed' && 'bg-ketchup border-ketchup text-white',
                    state === 'current' && 'bg-white border-ketchup text-ketchup animate-pulse',
                    state === 'upcoming' && 'bg-white border-charcoal/20 text-charcoal/40'
                  )}
                >
                  {state === 'completed' ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-current" />
                  )}
                </motion.div>

                {/* Content */}
                <div className="flex-1 pt-0.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className={clsx(
                          'font-medium transition-colors duration-300',
                          state === 'completed' || state === 'current'
                            ? 'text-near-black'
                            : 'text-charcoal/40'
                        )}
                      >
                        {step.label}
                      </p>
                      {state === 'completed' && (
                        <p className="text-sm text-charcoal/60 mt-1">
                          {getEstimatedTimeForStep(step.status)}
                        </p>
                      )}
                      {state === 'current' && (
                        <p className="text-sm text-ketchup font-medium mt-1">In Progress</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="bg-parchment rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-near-black">Order Progress</span>
          <span className="text-sm text-charcoal/60">
            {Math.round(((currentIndex + 1) / timelineSteps.length) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-white rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-ketchup"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIndex + 1) / timelineSteps.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Status Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-mustard/20 border-l-4 border-mustard rounded-r-lg p-4"
      >
        <div className="flex items-start space-x-3">
          <svg
            className="w-5 h-5 text-mustard flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="font-medium text-near-black">
              {currentStatus === 'created' && 'Your order has been received'}
              {currentStatus === 'confirmed' && 'Your order is confirmed'}
              {currentStatus === 'preparing' && 'Your order is being prepared'}
              {currentStatus === 'ready' && 'Your order is ready for pickup!'}
              {currentStatus === 'out_for_delivery' && 'Your order is on its way'}
              {currentStatus === 'delivered' && 'Your order has been delivered'}
              {currentStatus === 'completed' && 'Order complete. Thank you!'}
            </p>
            <p className="text-sm text-charcoal/80 mt-1">
              {currentStatus === 'ready' && orderType === 'pickup'
                ? 'Please proceed to the pickup location'
                : currentStatus === 'out_for_delivery'
                ? 'Your dasher is on the way to your location'
                : currentStatus === 'delivered' || currentStatus === 'completed'
                ? 'We hope you enjoy your meal!'
                : `Estimated time: ${estimatedTime} minutes`}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
