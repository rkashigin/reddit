import React from 'react';
import { withUrqlClient } from 'next-urql';

import { createUrqlClient } from '../../utils/createUrqlClient';
import { Layout } from '../../components/Layout';
import { Box, Heading } from '@chakra-ui/react';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';

const Post = ({}) => {
  const [{ data, fetching }] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      {data.post.text}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
