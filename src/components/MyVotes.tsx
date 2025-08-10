import { useEffect, useCallback, useMemo, memo } from 'react';
import { Button, Badge, LoadingSpinner } from './core';
import { ArrowPathIcon, HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';

import { useUserVotes } from '../hooks';
import { getSubId } from '../utils/storage';

interface MyVotesProps {
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const MyVotes = memo(({ onShowToast }: MyVotesProps) => {
  const subId = useMemo(() => getSubId(), []);
  const { votes, isLoading, fetchUserVotes } = useUserVotes();

  const fetchVotes = useCallback(async () => {
    try {
      await fetchUserVotes(subId);
    } catch (error) {
      onShowToast(
        error instanceof Error ? error.message : 'Failed to fetch votes',
        'error'
      );
    }
  }, [subId, onShowToast, fetchUserVotes]);

  useEffect(() => {
    fetchVotes();
  }, [fetchVotes]);

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
          My Votes
        </h2>
        <Button
          onClick={fetchVotes}
          variant="info"
          size="lg"
          leftIcon={<ArrowPathIcon className="h-5 w-5" />}
          className="w-full sm:w-auto"
        >
          Refresh
        </Button>
      </div>

      {votes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">
            You haven't voted on any cats yet. Start voting in the gallery!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {votes.map(vote => (
            <div
              key={vote.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={vote.image.url}
                  alt={`Voted cat ${vote.image.id}`}
                  className="w-full h-40 sm:h-48 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                  <Badge
                    variant={vote.value === 1 ? "blue" : "warning"}
                    size="sm"
                    className="sm:text-sm"
                  >
                    <div className="flex items-center gap-1">
                      {vote.value === 1 ? (
                        <HandThumbUpIcon className="h-3 w-3" />
                      ) : (
                        <HandThumbDownIcon className="h-3 w-3" />
                      )}
                      {vote.value === 1 ? 'Up' : 'Down'}
                    </div>
                  </Badge>
                </div>
              </div>
              
              <div className="p-3 sm:p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      ID: {vote.image.id.slice(0, 8)}...
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(vote.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    Voted on: {new Date(vote.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
