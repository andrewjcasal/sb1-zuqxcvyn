export interface BusinessHours {
  days: string;
  hours: string;
  afterHours?: boolean;
  emergencyService?: boolean;
}

export interface Service {
  name: string;
  description: string;
  isSpecialty?: boolean;
}

export interface PricingInfo {
  amount?: string;
  description: string;
  paymentMethods?: string[];
}

export interface Promotion {
  title: string;
  description: string;
  validUntil?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BusinessInfo {
  name: string;
  industry: string;
  contact: {
    phone?: string;
    email?: string;
    address?: string;
  };
  services: Service[];
  hours: BusinessHours;
  serviceArea: {
    regions: string[];
    radius?: string;
  };
  faqs: FAQ[];
  pricing?: PricingInfo[];
  promotions?: Promotion[];
  scheduling?: {
    process: string;
    availability: string;
  };
  testimonials?: {
    text: string;
    author?: string;
  }[];
  credentials?: {
    licenses: string[];
    certifications: string[];
    insurance?: string;
  };
}