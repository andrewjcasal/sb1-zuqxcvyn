import { BusinessInfo } from '@/types/business';
import { DataValidator } from '@/validation/validator';
import { logger } from '@/services/firecrawl/logger';

export function processBusinessData(data: unknown): BusinessInfo {
  // First, validate the raw data
  const validationResult = DataValidator.validateBusinessInfo(data);

  if (!validationResult.isValid) {
    logger.error('Invalid business data', {
      errors: DataValidator.getValidationErrors(validationResult.errors!)
    });
    DataValidator.throwValidationError(validationResult.errors!);
  }

  // Data is now validated and typed correctly
  const validData = validationResult.data!;

  // Additional processing and cleaning
  const processed: BusinessInfo = {
    ...validData,
    // Clean and normalize fields
    name: normalizeText(validData.name),
    industry: normalizeText(validData.industry),
    contact: {
      phone: validData.contact.phone ? normalizePhone(validData.contact.phone) : undefined,
      email: validData.contact.email ? validData.contact.email.toLowerCase() : undefined,
      address: validData.contact.address ? normalizeText(validData.contact.address) : undefined
    },
    services: validData.services.map(service => ({
      name: normalizeText(service.name),
      description: normalizeText(service.description),
      isSpecialty: service.isSpecialty
    })),
    hours: {
      days: normalizeText(validData.hours.days),
      hours: normalizeText(validData.hours.hours),
      emergencyService: validData.hours.emergencyService || false,
      afterHours: validData.hours.afterHours || false
    },
    serviceArea: {
      regions: validData.serviceArea.regions.map(normalizeText),
      radius: validData.serviceArea.radius ? normalizeText(validData.serviceArea.radius) : undefined
    },
    faqs: validData.faqs.map(faq => ({
      question: normalizeText(faq.question),
      answer: normalizeText(faq.answer)
    }))
  };

  logger.debug('Business data processed successfully', {
    businessName: processed.name,
    servicesCount: processed.services.length,
    faqsCount: processed.faqs.length
  });

  return processed;
}

function normalizeText(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[^\w\s.,!?-]/g, '') // Remove special characters except basic punctuation
    .trim();
}

function normalizePhone(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Format for US numbers
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  
  // If already has country code
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  
  return phone; // Return original if doesn't match expected formats
}