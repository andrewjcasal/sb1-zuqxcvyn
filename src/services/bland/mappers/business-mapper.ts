import { BusinessInfo } from '@/types/business';
import { CallConfig } from '../types';

export function mapBusinessToCallConfig(business: BusinessInfo): CallConfig {
  return {
    phoneNumber: business.contact.phone || '',
    email: business.contact.email,
    businessName: business.name,
    services: business.services.map(s => s.name),
    hours: {
      days: business.hours.days,
      hours: business.hours.hours,
      emergencyService: business.hours.emergencyService || false
    },
    faqs: business.faqs,
    pricing: business.pricing?.map(p => ({
      description: p.description,
      amount: p.amount
    }))
  };
}