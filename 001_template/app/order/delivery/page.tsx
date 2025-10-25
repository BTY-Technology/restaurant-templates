'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { CartSummary } from '@/components/features/CartSummary';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCart } from '@/context/CartContext';
import { useOrder } from '@/context/OrderContext';
import { getAllLocations } from '@/data/locations';
import {
  validateAddress,
  validateCity,
  validateState,
  validateZipCode,
  validateDeliveryAddress,
} from '@/utils/validation';
import { OrderType } from '@/types/order';
import styles from './page.module.css';

export default function DeliveryPage() {
  const router = useRouter();
  const { cart, itemCount } = useCart();
  const { currentOrder, setOrderType, setAddress, setLocationId } = useOrder();

  const locations = getAllLocations();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);

  const [selectedOrderType, setSelectedOrderType] = useState<OrderType>(
    currentOrder?.orderType || 'delivery'
  );

  // Delivery Address Form
  const [addressForm, setAddressForm] = useState({
    street: currentOrder?.address?.street || '',
    city: currentOrder?.address?.city || '',
    state: currentOrder?.address?.state || 'CA',
    zipCode: currentOrder?.address?.zipCode || '',
    instructions: currentOrder?.address?.deliveryInstructions || '',
  });

  // Pickup Location
  const [selectedLocationId, setSelectedLocationIdState] = useState(
    currentOrder?.locationId || ''
  );

  useEffect(() => {
    // Redirect if cart is empty
    if (itemCount === 0) {
      router.push('/menu');
      return;
    }

    // Redirect if contact info is missing
    if (!currentOrder?.contactInfo) {
      router.push('/order');
    }
  }, [itemCount, currentOrder, router]);

  const validateDeliveryForm = async () => {
    const newErrors: Record<string, string> = {};

    const streetValidation = validateAddress(addressForm.street);
    if (!streetValidation.isValid) {
      newErrors.street = streetValidation.error!;
      setErrors(newErrors);
      return false;
    }

    const cityValidation = validateCity(addressForm.city);
    if (!cityValidation.isValid) {
      newErrors.city = cityValidation.error!;
      setErrors(newErrors);
      return false;
    }

    const stateValidation = validateState(addressForm.state);
    if (!stateValidation.isValid) {
      newErrors.state = stateValidation.error!;
      setErrors(newErrors);
      return false;
    }

    const zipValidation = validateZipCode(addressForm.zipCode);
    if (!zipValidation.isValid) {
      newErrors.zipCode = zipValidation.error!;
      setErrors(newErrors);
      return false;
    }

    // Validate delivery address
    setIsValidatingAddress(true);
    const deliveryValidation = await validateDeliveryAddress(
      addressForm.street,
      addressForm.city,
      addressForm.state,
      addressForm.zipCode
    );
    setIsValidatingAddress(false);

    if (!deliveryValidation.isValid) {
      newErrors.street = deliveryValidation.error!;
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const validatePickupForm = () => {
    if (!selectedLocationId) {
      setErrors({ location: 'Please select a pickup location' });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleContinue = async () => {
    setOrderType(selectedOrderType);

    if (selectedOrderType === 'delivery') {
      const isValid = await validateDeliveryForm();
      if (isValid) {
        setAddress({
          street: addressForm.street,
          city: addressForm.city,
          state: addressForm.state,
          zipCode: addressForm.zipCode,
          deliveryInstructions: addressForm.instructions,
        });
        router.push('/order/review');
      }
    } else {
      if (validatePickupForm()) {
        setLocationId(selectedLocationId);
        router.push('/order/review');
      }
    }
  };

  const handleBack = () => {
    router.push('/order');
  };

  if (itemCount === 0 || !currentOrder?.contactInfo) {
    return null;
  }

  return (
    <>
      {/* Header */}
      <section className={styles.header}>
        <Container>
          <h1 className={styles.title}>Checkout</h1>
          <div className={styles.progressBar}>
            <div className={`${styles.progressStep} ${styles.active}`}>
              <span className={styles.stepNumber}>1</span>
              <span className={styles.stepLabel}>Contact</span>
            </div>
            <div className={styles.progressLine} />
            <div className={`${styles.progressStep} ${styles.active}`}>
              <span className={styles.stepNumber}>2</span>
              <span className={styles.stepLabel}>Delivery</span>
            </div>
            <div className={styles.progressLine} />
            <div className={styles.progressStep}>
              <span className={styles.stepNumber}>3</span>
              <span className={styles.stepLabel}>Review</span>
            </div>
          </div>
          <p className={styles.stepIndicator}>Step 2 of 3</p>
        </Container>
      </section>

      {/* Main Content */}
      <section className={styles.mainSection}>
        <Container>
          <div className={styles.grid}>
            {/* Form Section */}
            <div className={styles.formSection}>
              <div className={styles.step}>
                <h2 className={styles.stepTitle}>Delivery Options</h2>
                <p className={styles.stepDescription}>
                  Choose how you&apos;d like to receive your order.
                </p>

                {/* Order Type Selection */}
                <div className={styles.orderTypeGrid}>
                  <button
                    className={`${styles.orderTypeCard} ${
                      selectedOrderType === 'delivery' ? styles.selected : ''
                    }`}
                    onClick={() => setSelectedOrderType('delivery')}
                  >
                    <div className={styles.orderTypeIcon}>🚚</div>
                    <h3 className={styles.orderTypeTitle}>Delivery</h3>
                    <p className={styles.orderTypeDescription}>
                      Get your order delivered to your door
                    </p>
                    <p className={styles.orderTypeFee}>+ $4.99 delivery fee</p>
                  </button>
                  <button
                    className={`${styles.orderTypeCard} ${
                      selectedOrderType === 'pickup' ? styles.selected : ''
                    }`}
                    onClick={() => setSelectedOrderType('pickup')}
                  >
                    <div className={styles.orderTypeIcon}>🏪</div>
                    <h3 className={styles.orderTypeTitle}>Pickup</h3>
                    <p className={styles.orderTypeDescription}>
                      Pick up your order at one of our locations
                    </p>
                    <p className={styles.orderTypeFee}>No additional fee</p>
                  </button>
                </div>

                {/* Conditional Forms */}
                {selectedOrderType === 'delivery' ? (
                  <div className={styles.addressSection}>
                    <h3 className={styles.sectionTitle}>Delivery Address</h3>
                    <Input
                      label="Street Address"
                      value={addressForm.street}
                      onChange={(e) =>
                        setAddressForm({ ...addressForm, street: e.target.value })
                      }
                      error={errors.street}
                      required
                    />
                    <div className={styles.formGrid}>
                      <Input
                        label="City"
                        value={addressForm.city}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, city: e.target.value })
                        }
                        error={errors.city}
                        required
                      />
                      <Input
                        label="State"
                        value={addressForm.state}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, state: e.target.value })
                        }
                        error={errors.state}
                        maxLength={2}
                        placeholder="CA"
                        required
                      />
                      <Input
                        label="ZIP Code"
                        value={addressForm.zipCode}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, zipCode: e.target.value })
                        }
                        error={errors.zipCode}
                        placeholder="94102"
                        required
                      />
                    </div>
                    <Input
                      label="Delivery Instructions (Optional)"
                      value={addressForm.instructions}
                      onChange={(e) =>
                        setAddressForm({ ...addressForm, instructions: e.target.value })
                      }
                      placeholder="e.g., Ring doorbell, leave at door"
                    />
                  </div>
                ) : (
                  <div className={styles.pickupSection}>
                    <h3 className={styles.sectionTitle}>Select Pickup Location</h3>
                    {errors.location && (
                      <div className={styles.errorMessage}>{errors.location}</div>
                    )}
                    <div className={styles.locationGrid}>
                      {locations.map((location) => (
                        <button
                          key={location.id}
                          className={`${styles.locationCard} ${
                            selectedLocationId === location.id ? styles.selected : ''
                          }`}
                          onClick={() => setSelectedLocationIdState(location.id)}
                        >
                          <h3 className={styles.locationName}>{location.name}</h3>
                          <p className={styles.locationAddress}>
                            {location.address.street}<br />
                            {location.address.city}, {location.address.state}{' '}
                            {location.address.zipCode}
                          </p>
                          <p className={styles.locationPhone}>{location.phone}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className={styles.navigation}>
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  onClick={handleContinue}
                  disabled={isValidatingAddress}
                  className={styles.nextButton}
                >
                  {isValidatingAddress ? 'Validating...' : 'Continue to Review'}
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className={styles.summarySection}>
              <CartSummary includeDeliveryFee={selectedOrderType === 'delivery'} showCheckoutButton={false} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
