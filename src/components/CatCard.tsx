import { memo, useState } from 'react';
import { Button, Badge } from './core';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';
import type { CatImage } from '../types';

interface CatCardProps {
  cat: CatImage;
  onVote: (imageId: string, value: 1 | -1) => Promise<void>;
  userVote?: 1 | -1;
  score?: number;
}

export const CatCard = memo(({ cat, onVote, userVote, score }: CatCardProps) => {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (value: 1 | -1) => {
    if (isVoting) return; // Prevent multiple calls
    
    setIsVoting(true);
    try {
      await onVote(cat.id, value);
    } catch (error) {
      // Error is handled by the parent component
      console.error('Vote failed:', error);
    } finally {
      setIsVoting(false);
    }
  };

  const hasVoted = userVote !== undefined;
  const isUpvoted = userVote === 1;
  const isDisabled = hasVoted || isVoting;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden relative">
      <div className="relative">
        <img
          src={cat.url}
          alt={`Cat ${cat.id}`}
          className="w-full h-48 sm:h-56 object-cover"
          loading="lazy"
        />
        {score !== undefined && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" size="sm">
              Score: {score}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ID: {cat.id.slice(0, 8)}...
            </span>
            {score !== undefined && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {score} votes
              </span>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => handleVote(1)}
              disabled={isDisabled}
              loading={isVoting && !hasVoted}
              variant={hasVoted && isUpvoted ? "up" : "upOutline"}
              size="lg"
              className={`flex-1 transition-all duration-200 ${
                isDisabled && !hasVoted ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              leftIcon={<HandThumbUpIcon className="h-5 w-5" />}
            />
            
            <Button
              onClick={() => handleVote(-1)}
              disabled={isDisabled}
              loading={isVoting && !hasVoted}
              variant="down"
              size="lg"
              className={`flex-1 transition-all duration-200 ${
                isDisabled && !hasVoted ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              leftIcon={<HandThumbDownIcon className="h-5 w-5" />}
            />
            
          </div>
          
          {hasVoted && (
            <div className="text-center">
              <Badge 
                variant={isUpvoted ? "blue" : "warning"} 
                size="sm"
                className="text-xs"
              >
                {isUpvoted ? 'You upvoted this cat!' : 'You downvoted this cat!'}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
