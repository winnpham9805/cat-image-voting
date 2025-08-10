import { useState, useCallback } from 'react';
import type { VoteResponse } from '../types';
import { useApi } from './useApi';

export const useUserVotes = () => {
  const [votes, setVotes] = useState<VoteResponse[]>([]);
  const { isLoading, error, get, clearError } = useApi();

  const fetchUserVotes = useCallback(async (subId: string) => {
    const userVotes = await get<VoteResponse[]>(`/votes?sub_id=${subId}`);
    setVotes(userVotes);
    return userVotes;
  }, [get]);

  return {
    votes,
    isLoading,
    error,
    fetchUserVotes,
    clearError,
  };
};
