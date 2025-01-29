export function formatPhoneE164(phone: string): string {
  try {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // For US numbers
    if (digits.length === 10) {
      return `+1${digits}`;
    }
    
    // If number already includes country code (11 digits starting with 1)
    if (digits.length === 11 && digits.startsWith('1')) {
      return `+${digits}`;
    }
    
    // If number already has + prefix and correct length
    if (phone.startsWith('+') && digits.length >= 11) {
      return phone;
    }
    
    throw new Error('Please enter a valid 10-digit US phone number');
  } catch (error) {
    throw new Error('Invalid phone number format. Please enter a valid 10-digit US phone number.');
  }
}

export function validatePhoneNumber(phone: string): boolean {
  try {
    const formatted = formatPhoneE164(phone);
    return /^\+1\d{10}$/.test(formatted);
  } catch {
    return false;
  }
}