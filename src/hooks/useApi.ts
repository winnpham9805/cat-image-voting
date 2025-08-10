/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';

const API_BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = import.meta.env.VITE_CAT_API_KEY || '';

if (!API_KEY) {
  console.warn('VITE_CAT_API_KEY environment variable is not set. Please add your API key to .env file.');
}

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
};

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeRequest = useCallback(async <T>(
    url: string, 
    options: RequestInit = {}
  ): Promise<T> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers,
        ...options,
      });
      
      if (!response.ok) {
        throw new ApiError(response.status, `Request failed: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Convenience methods for common HTTP operations
  const get = useCallback(<T>(url: string): Promise<T> => {
    return makeRequest<T>(url, { method: 'GET' });
  }, [makeRequest]);

  const post = useCallback(<T, D = any>(url: string, data?: D): Promise<T> => {
    return makeRequest<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }, [makeRequest]);

  const put = useCallback(<T, D = any>(url: string, data?: D): Promise<T> => {
    return makeRequest<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }, [makeRequest]);

  const del = useCallback(<T>(url: string): Promise<T> => {
    return makeRequest<T>(url, { method: 'DELETE' });
  }, [makeRequest]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    makeRequest,
    get,
    post,
    put,
    del,
    clearError,
  };
};
