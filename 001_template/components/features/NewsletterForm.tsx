'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import styles from './NewsletterForm.module.css';

export interface NewsletterFormProps {
  /**
   * Display mode: inline (horizontal) or stacked (vertical)
   * @default 'inline'
   */
  layout?: 'inline' | 'stacked';
  /**
   * Custom placeholder text
   * @default 'Enter your email'
   */
  placeholder?: string;
  /**
   * Custom button text
   * @default 'Subscribe'
   */
  buttonText?: string;
  /**
   * Show form title
   * @default true
   */
  showTitle?: boolean;
  /**
   * Custom title text
   */
  title?: string;
  /**
   * Show description
   * @default true
   */
  showDescription?: boolean;
  /**
   * Custom description text
   */
  description?: string;
}

/**
 * NewsletterForm component for email subscription with validation,
 * loading states, and localStorage persistence.
 */
export const NewsletterForm: React.FC<NewsletterFormProps> = ({
  layout = 'inline',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  showTitle = true,
  title = 'Join Our Newsletter',
  showDescription = true,
  description = 'Get exclusive offers, updates on new menu items, and special promotions delivered to your inbox.',
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset states
    setError('');
    setSuccess('');

    // Validate email
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Check if email already exists
    const existingEmails = getStoredEmails();
    if (existingEmails.includes(email.toLowerCase())) {
      setError('This email is already subscribed');
      return;
    }

    // Simulate API call
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store email in localStorage
      storeEmail(email);

      // Success
      setSuccess('Thank you for subscribing! Check your email for a welcome message.');
      setEmail('');

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess('');
      }, 5000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStoredEmails = (): string[] => {
    try {
      const stored = localStorage.getItem('golden-wok-newsletter');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const storeEmail = (email: string) => {
    try {
      const emails = getStoredEmails();
      emails.push(email.toLowerCase());
      localStorage.setItem('golden-wok-newsletter', JSON.stringify(emails));
    } catch (err) {
      console.error('Failed to store email:', err);
    }
  };

  return (
    <div className={`${styles.newsletterForm} ${styles[layout]}`}>
      {showTitle && (
        <h3 className={styles.title}>{title}</h3>
      )}

      {showDescription && (
        <p className={styles.description}>{description}</p>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            error={error}
            success={success}
            disabled={isLoading}
            fullWidth
            startIcon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            aria-label="Email address"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={isLoading || !!success}
          fullWidth={layout === 'stacked'}
        >
          {buttonText}
        </Button>
      </form>

      {/* Success/Error messages displayed outside form for better layout */}
      {(error || success) && (
        <div className={styles.messageContainer} role="status" aria-live="polite">
          {error && (
            <div className={styles.errorMessage}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M15 9L9 15M9 9L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className={styles.successMessage}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{success}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
