import { ApiError, ApiResponse } from '@/types/api';

export async function handleApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const error: ApiError = {
      message: 'An error occurred while processing your request',
      status: response.status
    };

    try {
      const errorData = await response.json();
      error.message = errorData.message || error.message;
      error.code = errorData.code;
    } catch {
      // Use default error message if response isn't JSON
    }

    throw error;
  }

  const data = await response.json();
  return { data, error: null };
}