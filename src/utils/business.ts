import { BusinessInfo } from '@/types/business';

export function validateBusinessData(data: Partial<BusinessInfo>): BusinessInfo {
  return {
    name: data.name || 'Business Name Not Found',
    industry: data.industry || 'Industry Not Specified',
    contact: {
      phone: data.contact?.phone || 'No Phone Listed',
      email: data.contact?.email || 'No Email Listed',
      address: data.contact?.address || 'No Address Listed'
    },
    services: data.services?.length ? data.services : [{
      name: 'Services Not Listed',
      description: 'No service information available'
    }],
    hours: {
      days: data.hours?.days || 'Business hours not specified',
      hours: data.hours?.hours || 'Hours not available',
      afterHours: data.hours?.afterHours || false,
      emergencyService: data.hours?.emergencyService || false
    },
    serviceArea: {
      regions: data.serviceArea?.regions?.length ? 
        data.serviceArea.regions : ['Service area not specified'],
      radius: data.serviceArea?.radius
    },
    faqs: data.faqs?.length ? data.faqs : [],
    pricing: data.pricing || [],
    promotions: data.promotions || [],
    scheduling: data.scheduling || {
      process: 'Scheduling information not available',
      availability: 'Contact business for availability'
    },
    testimonials: data.testimonials || [],
    credentials: {
      licenses: data.credentials?.licenses || [],
      certifications: data.credentials?.certifications || [],
      insurance: data.credentials?.insurance
    }
  };
}