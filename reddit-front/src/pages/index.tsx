import { withUrqlClient } from 'next-urql';
import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';

import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components/Layout';

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });

  return (
    <Layout>
      <NextLink href="/create-post">
        <Link>Create post</Link>
      </NextLink>
      <br />
      {data ? (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      ) : (
        <div>loading...</div>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
