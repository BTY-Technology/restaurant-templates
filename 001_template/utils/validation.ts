/**
 * Validation utility functions for forms
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email address
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
};

/**
 * Validate phone number
 */
export const validatePhone = (phone: string): ValidationResult => {
  const phoneRegex = /^[\d\s\-\(\)\+]+$/;
  const cleaned = phone.replace(/\D/g, '');

  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }

  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }

  if (cleaned.length < 10) {
    return { isValid: false, error: 'Phone number must be at least 10 digits' };
  }

  return { isValid: true };
};

/**
 * Validate name
 */
export const validateName = (name: string, fieldName: string = 'Name'): ValidationResult => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters` };
  }

  if (name.length > 50) {
    return { isValid: false, error: `${fieldName} must be less than 50 characters` };
  }

  return { isValid: true };
};

/**
 * Validate ZIP code
 */
export const validateZipCode = (zipCode: string): ValidationResult => {
  const zipRegex = /^\d{5}(-\d{4})?$/;

  if (!zipCode) {
    return { isValid: false, error: 'ZIP code is required' };
  }

  if (!zipRegex.test(zipCode)) {
    return { isValid: false, error: 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)' };
  }

  return { isValid: true };
};

/**
 * Validate street address
 */
export const validateAddress = (address: string): ValidationResult => {
  if (!address || address.trim().length === 0) {
    return { isValid: false, error: 'Address is required' };
  }

  if (address.trim().length < 5) {
    return { isValid: false, error: 'Please enter a complete address' };
  }

  return { isValid: true };
};

/**
 * Validate city
 */
export const validateCity = (city: string): ValidationResult => {
  if (!city || city.trim().length === 0) {
    return { isValid: false, error: 'City is required' };
  }

  if (city.trim().length < 2) {
    return { isValid: false, error: 'Please enter a valid city name' };
  }

  return { isValid: true };
};

/**
 * Validate state (2-letter code)
 */
export const validateState = (state: string): ValidationResult => {
  const stateRegex = /^[A-Z]{2}$/;

  if (!state) {
    return { isValid: false, error: 'State is required' };
  }

  if (!stateRegex.test(state.toUpperCase())) {
    return { isValid: false, error: 'Please enter a valid 2-letter state code' };
  }

  return { isValid: true };
};

/**
 * Validate credit card number (basic Luhn algorithm)
 */
export const validateCreditCard = (cardNumber: string): ValidationResult => {
  const cleaned = cardNumber.replace(/\s/g, '');

  if (!cleaned) {
    return { isValid: false, error: 'Card number is required' };
  }

  if (!/^\d+$/.test(cleaned)) {
    return { isValid: false, error: 'Card number must contain only digits' };
  }

  if (cleaned.length < 13 || cleaned.length > 19) {
    return { isValid: false, error: 'Please enter a valid card number' };
  }

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  if (sum % 10 !== 0) {
    return { isValid: false, error: 'Please enter a valid card number' };
  }

  return { isValid: true };
};

/**
 * Validate CVV
 */
export const validateCVV = (cvv: string): ValidationResult => {
  if (!cvv) {
    return { isValid: false, error: 'CVV is required' };
  }

  if (!/^\d{3,4}$/.test(cvv)) {
    return { isValid: false, error: 'Please enter a valid CVV (3 or 4 digits)' };
  }

  return { isValid: true };
};

/**
 * Validate required field
 */
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true };
};

/**
 * Mock address validation (simulates API call)
 */
export const validateDeliveryAddress = async (
  street: string,
  city: string,
  state: string,
  zipCode: string
): Promise<ValidationResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock validation logic
  const addressResult = validateAddress(street);
  if (!addressResult.isValid) return addressResult;

  const cityResult = validateCity(city);
  if (!cityResult.isValid) return cityResult;

  const stateResult = validateState(state);
  if (!stateResult.isValid) return stateResult;

  const zipResult = validateZipCode(zipCode);
  if (!zipResult.isValid) return zipResult;

  // Mock delivery zone check
  const validZipCodes = ['94102', '94110', '94103', '94104', '94105', '94107', '94108', '94109', '94111', '94112', '94114', '94115', '94116', '94117', '94118', '94121', '94122', '94123', '94124', '94127', '94129', '94130', '94131', '94132', '94133', '94134'];

  if (!validZipCodes.includes(zipCode.substring(0, 5))) {
    return {
      isValid: false,
      error: 'Sorry, we do not deliver to this area. Please select pickup instead.'
    };
  }

  return { isValid: true };
};
