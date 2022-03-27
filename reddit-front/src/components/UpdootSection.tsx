import React from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = React.useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');
  const [, vote] = useVoteMutation();

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" mr={4}>
      <IconButton
        aria-label="Vote up"
        as={ChevronUpIcon}
        w={6}
        h={6}
        isLoading={loadingState === 'updoot-loading'}
        colorScheme={post.voteStatus === 1 ? 'green' : undefined}
        onClick={async () => {
          if (post.voteStatus === 1) return;

          setLoadingState('updoot-loading');
          await vote({ postId: post.id, value: 1 });
          setLoadingState('not-loading');
        }}
      />
      {post.points}
      <IconButton
        aria-label="Vote down"
        as={ChevronDownIcon}
        w={6}
        h={6}
        isLoading={loadingState === 'downdoot-loading'}
        colorScheme={post.voteStatus === -1 ? 'red' : undefined}
        onClick={async () => {
          if (post.voteStatus === -1) return;

          setLoadingState('downdoot-loading');
          await vote({ postId: post.id, value: -1 });
          setLoadingState('not-loading');
        }}
      />
    </Flex>
  );
};
