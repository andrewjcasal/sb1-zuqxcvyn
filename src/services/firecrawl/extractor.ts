import { BusinessInfo } from '@/types/business';
import * as cheerio from 'cheerio';

export async function extractBusinessInfo(html: string, url: string): Promise<BusinessInfo> {
  const $ = cheerio.load(html);

  // Helper function to get text content safely
  const getText = (selector: string): string => {
    return $(selector).first().text().trim();
  };

  // Extract business name (usually in the header or title)
  const businessName = getText('h1') || 
                      getText('.business-name') || 
                      $('title').text().split('|')[0].trim();

  // Extract contact information
  const phone = $('a[href^="tel:"]').attr('href')?.replace('tel:', '') || '';
  const email = $('a[href^="mailto:"]').attr('href')?.replace('mailto:', '') || '';
  
  // Look for address in common containers
  const address = $('.address, [itemprop="address"], address').first().text().trim();

  // Extract services
  const services = $('.service, .services li, #services li').map((_, el) => ({
    name: $(el).text().trim() || 'Unnamed Service',
    description: $(el).attr('data-description') || ''
  })).get();

  // If no services found, try to extract from paragraphs or lists
  if (services.length === 0) {
    const serviceSection = $('#services, .services');
    if (serviceSection.length) {
      services.push(...serviceSection.find('p').map((_, el) => ({
        name: $(el).text().trim() || 'Unnamed Service',
        description: ''
      })).get());
    }
  }

  // Extract business hours
  const hoursText = $('.hours, [itemprop="openingHours"]')
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean)
    .join(' ');

  // Extract FAQs
  const faqs = $('.faq, .faqs li').map((_, el) => {
    const question = $(el).find('h3, .question').text().trim();
    const answer = $(el).find('p, .answer').text().trim();
    return { question, answer };
  }).get();

  // Look for service area information
  const serviceAreaText = $('.service-area, #service-area, [data-area]').text().trim();
  const regions = serviceAreaText ? [serviceAreaText] : ['Service area information not found'];

  // Check for emergency service indicators
  const hasEmergencyService = html.toLowerCase().includes('24/7') || 
                             html.toLowerCase().includes('emergency') ||
                             html.toLowerCase().includes('around the clock');

  // Try to determine industry
  const industryKeywords = {
    'plumbing': ['plumber', 'plumbing', 'pipes', 'water heater'],
    'hvac': ['hvac', 'heating', 'cooling', 'air conditioning'],
    'electrical': ['electrician', 'electrical', 'wiring', 'lighting'],
    'landscaping': ['landscaping', 'lawn', 'garden', 'outdoor'],
    'cleaning': ['cleaning', 'janitorial', 'maid', 'housekeeping'],
    'construction': ['construction', 'building', 'renovation', 'remodeling']
  };

  let detectedIndustry = 'General';
  const lowerHtml = html.toLowerCase();
  
  for (const [industry, keywords] of Object.entries(industryKeywords)) {
    if (keywords.some(keyword => lowerHtml.includes(keyword))) {
      detectedIndustry = industry.charAt(0).toUpperCase() + industry.slice(1);
      break;
    }
  }

  return {
    name: businessName || 'Unknown Business',
    industry: detectedIndustry,
    contact: {
      phone,
      email,
      address
    },
    services: services.length > 0 ? services : [{
      name: 'General Services',
      description: 'Service information not found'
    }],
    hours: {
      days: hoursText || 'Not specified',
      hours: 'Not specified',
      emergencyService: hasEmergencyService
    },
    serviceArea: {
      regions
    },
    faqs: faqs.length > 0 ? faqs : []
  };
}