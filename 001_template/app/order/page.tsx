'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { CartSummary } from '@/components/features/CartSummary';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCart } from '@/context/CartContext';
import { useOrder } from '@/context/OrderContext';
import {
  validateName,
  validateEmail,
  validatePhone,
} from '@/utils/validation';
import styles from './page.module.css';

export default function OrderPage() {
  const router = useRouter();
  const { cart, itemCount } = useCart();
  const { currentOrder, setContactInfo } = useOrder();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contactForm, setContactForm] = useState({
    firstName: currentOrder?.contactInfo?.firstName || '',
    lastName: currentOrder?.contactInfo?.lastName || '',
    email: currentOrder?.contactInfo?.email || '',
    phone: currentOrder?.contactInfo?.phone || '',
  });

  useEffect(() => {
    if (itemCount === 0) {
      router.push('/menu');
    }
  }, [itemCount, router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const firstNameValidation = validateName(contactForm.firstName, 'First name');
    if (!firstNameValidation.isValid) {
      newErrors.firstName = firstNameValidation.error!;
    }

    const lastNameValidation = validateName(contactForm.lastName, 'Last name');
    if (!lastNameValidation.isValid) {
      newErrors.lastName = lastNameValidation.error!;
    }

    const emailValidation = validateEmail(contactForm.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error!;
    }

    const phoneValidation = validatePhone(contactForm.phone);
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.error!;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      setContactInfo({
        firstName: contactForm.firstName,
        lastName: contactForm.lastName,
        email: contactForm.email,
        phone: contactForm.phone,
      });
      router.push('/order/delivery');
    }
  };

  if (itemCount === 0) {
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
            <div className={styles.progressStep}>
              <span className={styles.stepNumber}>2</span>
              <span className={styles.stepLabel}>Delivery</span>
            </div>
            <div className={styles.progressLine} />
            <div className={styles.progressStep}>
              <span className={styles.stepNumber}>3</span>
              <span className={styles.stepLabel}>Review</span>
            </div>
          </div>
          <p className={styles.stepIndicator}>Step 1 of 3</p>
        </Container>
      </section>

      {/* Main Content */}
      <section className={styles.mainSection}>
        <Container>
          <div className={styles.grid}>
            {/* Form Section */}
            <div className={styles.formSection}>
              <div className={styles.step}>
                <h2 className={styles.stepTitle}>Contact Information</h2>
                <p className={styles.stepDescription}>
                  We&apos;ll use this information to keep you updated about your order.
                </p>
                <div className={styles.formGrid}>
                  <Input
                    label="First Name"
                    value={contactForm.firstName}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, firstName: e.target.value })
                    }
                    error={errors.firstName}
                    required
                  />
                  <Input
                    label="Last Name"
                    value={contactForm.lastName}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, lastName: e.target.value })
                    }
                    error={errors.lastName}
                    required
                  />
                </div>
                <Input
                  label="Email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  error={errors.email}
                  required
                />
                <Input
                  label="Phone"
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  error={errors.phone}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>

              {/* Navigation Buttons */}
              <div className={styles.navigation}>
                <Button
                  onClick={handleContinue}
                  className={styles.nextButton}
                  fullWidth
                >
                  Continue to Delivery Options
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className={styles.summarySection}>
              <CartSummary includeDeliveryFee={false} showCheckoutButton={false} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
