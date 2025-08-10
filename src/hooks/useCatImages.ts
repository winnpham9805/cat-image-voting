import { useState, useCallback } from 'react';
import type { CatImage } from '../types';
import { useApi } from './useApi';

export const useCatImages = () => {
  const [cats, setCats] = useState<CatImage[]>([]);
  const { isLoading, error, get, clearError } = useApi();

  const fetchRandomImages = useCallback(async (limit: number = 10) => {
    const newCats = await get<CatImage[]>(`/images/search?limit=${limit}`);
    setCats(newCats);
    return newCats;
  }, [get]);

  return {
    cats,
    isLoading,
    error,
    fetchRandomImages,
    clearError,
  };
};
