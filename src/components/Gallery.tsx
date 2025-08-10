import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { CatCard } from './CatCard';
import { Button, LoadingSpinner } from './core';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import type { CatImage, VoteResponse } from '../types';
import { useCatImages, useVoting, useUserVotes } from '../hooks';
import { getSubId } from '../utils/storage';

interface GalleryProps {
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const Gallery = memo(({ onShowToast }: GalleryProps) => {
  const [userVotes, setUserVotes] = useState<Record<string, 1 | -1>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({});

  const subId = useMemo(() => getSubId(), []);
  
  const { cats, isLoading, fetchRandomImages } = useCatImages();
  const { createVote } = useVoting();
  const { fetchUserVotes: fetchUserVotesFromHook } = useUserVotes();

  const fetchCats = useCallback(async () => {
    try {
      const newCats = await fetchRandomImages(10);

      const initialScores: Record<string, number> = {};
      newCats.forEach((cat: CatImage) => {
        initialScores[cat.id] = 0;
      });
      setScores(initialScores);

      await loadUserVotes();
    } catch (error) {
      onShowToast(
        error instanceof Error ? error.message : 'Failed to fetch cats',
        'error'
      );
    }
  }, [fetchRandomImages, onShowToast]);

  const loadUserVotes = useCallback(async () => {
    try {
      const votes = await fetchUserVotesFromHook(subId);
      const voteMap: Record<string, 1 | -1> = {};
      votes.forEach((vote: VoteResponse) => {
        voteMap[vote.image_id] = vote.value;
      });
      setUserVotes(voteMap);
    } catch (error) {
      console.warn('Failed to fetch user votes:', error);
    }
  }, [subId, fetchUserVotesFromHook]);

  const handleVote = useCallback(async (imageId: string, value: 1 | -1) => {
    try {
      await createVote({
        image_id: imageId,
        sub_id: subId,
        value,
      });
      
      // Update user votes
      setUserVotes(prev => ({
        ...prev,
        [imageId]: value,
      }));
      
      setScores(prev => ({
        ...prev,
        [imageId]: (prev[imageId] || 0) + value,
      }));
      
      onShowToast('Vote recorded successfully!', 'success');
    } catch (error) {
      onShowToast(
        error instanceof Error ? error.message : 'Failed to record vote',
        'error'
      );
      throw error; 
    }
  }, [subId, onShowToast, createVote]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchCats();
    setIsRefreshing(false);
  }, [fetchCats]);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="2xl" color="default" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
          Cat Gallery
        </h2>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="info"
          size="lg"
          loading={isRefreshing}
          leftIcon={<ArrowPathIcon className="h-5 w-5" />}
          className="w-full sm:w-auto"
        >
          Refresh
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {cats.map(cat => (
          <CatCard
            key={cat.id}
            cat={cat}
            onVote={handleVote}
            userVote={userVotes[cat.id]}
            score={scores[cat.id]}
          />
        ))}
      </div>
      
      {cats.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">
            No cats found. Try refreshing!
          </p>
        </div>
      )}
    </div>
  );
});
