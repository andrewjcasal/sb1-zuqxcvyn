import { z } from 'zod';
import { businessInfoSchema, firecrawlResponseSchema } from './schemas';
import { BusinessInfo } from '@/types/business';
import { FirecrawlResponse } from '@/services/firecrawl/api';
import { ValidationError } from '@/utils/errors';
import { logger } from '@/services/firecrawl/logger';

interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  errors?: z.ZodError;
}

export class DataValidator {
  static validateBusinessInfo(data: unknown): ValidationResult<BusinessInfo> {
    try {
      const validatedData = businessInfoSchema.parse(data);
      return {
        isValid: true,
        data: validatedData
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error('Business info validation failed', {
          errors: error.errors
        });
        return {
          isValid: false,
          errors: error
        };
      }
      throw error;
    }
  }

  static validateFirecrawlResponse(data: unknown): ValidationResult<FirecrawlResponse> {
    try {
      const validatedData = firecrawlResponseSchema.parse(data);
      return {
        isValid: true,
        data: validatedData
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error('Firecrawl response validation failed', {
          errors: error.errors
        });
        return {
          isValid: false,
          errors: error
        };
      }
      throw error;
    }
  }

  static getValidationErrors(errors: z.ZodError): string[] {
    return errors.errors.map(error => {
      const path = error.path.join('.');
      return `${path}: ${error.message}`;
    });
  }

  static throwValidationError(errors: z.ZodError): never {
    const errorMessages = this.getValidationErrors(errors);
    throw new ValidationError(
      `Data validation failed:\n${errorMessages.join('\n')}`
    );
  }
}