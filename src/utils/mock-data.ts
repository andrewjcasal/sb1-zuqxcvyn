import { BusinessData } from '../types';

export async function getMockData(): Promise<BusinessData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    services: [
      "Residential Pest Control",
      "Commercial Pest Control",
      "Termite Inspections",
      "Rodent Control"
    ],
    location: "123 Main St, Anytown, USA",
    hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM",
    areaServed: "Greater Metropolitan Area"
  };
}