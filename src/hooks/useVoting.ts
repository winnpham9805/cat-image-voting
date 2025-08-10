import { useState, useCallback } from 'react';
import type { VoteRequest, VoteResponse } from '../types';
import { useApi } from './useApi';

export const useVoting = () => {
  const [isVoting, setIsVoting] = useState(false);
  const { error, post, clearError } = useApi();

  const createVote = useCallback(async (voteData: VoteRequest): Promise<VoteResponse> => {
    try {
      setIsVoting(true);
      const result = await post<VoteResponse>('/votes', voteData);
      return result;
    } finally {
      setIsVoting(false);
    }
  }, [post]);

  return {
    isVoting,
    error,
    createVote,
    clearError,
  };
};
