import React from 'react';
import NextLink from 'next/link';
import { Box, IconButton, Link } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box ml="auto">
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          icon={<EditIcon w={5} h={5} />}
          aria-label="Edit Post"
          size="sm"
          mr={2}
        />
      </NextLink>
      <IconButton
        icon={<DeleteIcon w={5} h={5} />}
        aria-label="Delete Post"
        size="sm"
        onClick={async () => {
          await deletePost({ id });
        }}
      />
    </Box>
  );
};
