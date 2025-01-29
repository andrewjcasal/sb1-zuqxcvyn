import { BusinessInfo } from '@/types/business';

interface ProcessedFAQ {
  question: string;
  answer: string;
  category?: string;
  keywords: string[];
}

export function processFAQs(faqs: BusinessInfo['faqs']): ProcessedFAQ[] {
  return faqs.map(faq => {
    // Clean and normalize the question
    const cleanedQuestion = cleanText(faq.question);
    
    // Clean and structure the answer
    const cleanedAnswer = cleanText(faq.answer);
    
    // Extract keywords from both question and answer
    const keywords = extractKeywords(cleanedQuestion + ' ' + cleanedAnswer);
    
    // Determine the category based on question content
    const category = determineCategory(cleanedQuestion);

    return {
      question: cleanedQuestion,
      answer: cleanedAnswer,
      category,
      keywords
    };
  });
}

function cleanText(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[^\w\s?.,!-]/g, '') // Remove special characters except basic punctuation
    .replace(/^q:\s*/i, '') // Remove "Q:" prefix
    .replace(/^a:\s*/i, ''); // Remove "A:" prefix
}

function extractKeywords(text: string): string[] {
  // Remove common stop words and extract meaningful keywords
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'is', 'are', 'was', 'were']);
  
  return text
    .toLowerCase()
    .split(/\W+/)
    .filter(word => 
      word.length > 2 && 
      !stopWords.has(word) &&
      !(/^\d+$/.test(word)) // Exclude pure numbers
    );
}

function determineCategory(question: string): string {
  const categoryPatterns = [
    { pattern: /\b(cost|price|payment|fee|charge)\b/i, category: 'Pricing' },
    { pattern: /\b(hour|time|schedule|appointment|booking)\b/i, category: 'Scheduling' },
    { pattern: /\b(service|repair|maintenance|installation)\b/i, category: 'Services' },
    { pattern: /\b(emergency|urgent|24\/7|after hour)\b/i, category: 'Emergency' },
    { pattern: /\b(warranty|guarantee|coverage)\b/i, category: 'Warranty' },
    { pattern: /\b(area|location|region|serve)\b/i, category: 'Service Area' }
  ];

  for (const { pattern, category } of categoryPatterns) {
    if (pattern.test(question)) {
      return category;
    }
  }

  return 'General';
}