import { z } from 'zod';

// Reusable patterns
const phoneRegex = /^\+?1?\d{10,15}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const urlRegex = /^https?:\/\/.+/;

// Base schemas for reusable components
const contactSchema = z.object({
  phone: z.string().regex(phoneRegex, 'Invalid phone number format').optional(),
  email: z.string().regex(emailRegex, 'Invalid email format').optional(),
  address: z.string().min(1, 'Address is required').optional()
});

const hoursSchema = z.object({
  days: z.string().min(1, 'Business days are required'),
  hours: z.string().min(1, 'Business hours are required'),
  emergencyService: z.boolean().optional(),
  afterHours: z.boolean().optional()
});

const serviceSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  description: z.string().min(1, 'Service description is required'),
  isSpecialty: z.boolean().optional()
});

const serviceAreaSchema = z.object({
  regions: z.array(z.string()).min(1, 'At least one service region is required'),
  radius: z.string().optional()
});

const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required')
});

const pricingSchema = z.object({
  amount: z.string().optional(),
  description: z.string().min(1, 'Pricing description is required'),
  paymentMethods: z.array(z.string()).optional()
});

const promotionSchema = z.object({
  title: z.string().min(1, 'Promotion title is required'),
  description: z.string().min(1, 'Promotion description is required'),
  validUntil: z.string().optional()
});

const testimonialSchema = z.object({
  text: z.string().min(1, 'Testimonial text is required'),
  author: z.string().optional()
});

const credentialsSchema = z.object({
  licenses: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  insurance: z.string().optional()
});

// Main business info schema
export const businessInfoSchema = z.object({
  name: z.string().min(1, 'Business name is required'),
  industry: z.string().min(1, 'Industry is required'),
  contact: contactSchema,
  services: z.array(serviceSchema).min(1, 'At least one service is required'),
  hours: hoursSchema,
  serviceArea: serviceAreaSchema,
  faqs: z.array(faqSchema).default([]),
  pricing: z.array(pricingSchema).optional(),
  promotions: z.array(promotionSchema).optional(),
  testimonials: z.array(testimonialSchema).optional(),
  credentials: credentialsSchema.optional()
});

// API response schema
export const firecrawlResponseSchema = z.object({
  business: businessInfoSchema,
  metadata: z.object({
    url: z.string().regex(urlRegex, 'Invalid URL format'),
    lastUpdated: z.string().datetime(),
    confidence: z.number().min(0).max(1)
  })
});