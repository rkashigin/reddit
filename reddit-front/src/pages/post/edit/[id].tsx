import React from 'react';
import { withUrqlClient } from 'next-urql';
import { Form, Formik } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { createUrqlClient } from '../../../utils/createUrqlClient';
import { Layout } from '../../../components/Layout';
import { InputField } from '../../../components/InputField';
import { useGetPostFromUrl } from '../../../utils/useGetPostFromUrl';
import { useUpdatePostMutation } from '../../../generated/graphql';

const EditPost = ({}) => {
  const router = useRouter();
  const [{ data, fetching }] = useGetPostFromUrl();
  const [, updatePost] = useUpdatePostMutation();

  if (fetching) {
    return (
      <Layout>
        <div>loadng...</div>
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
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          await updatePost({
            id: Number(data?.post?.id),
            ...values,
          });
          router.push('/');
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="Enter post title"
              label="Title"
            />
            <Box mt={4}>
              <InputField
                name="text"
                placeholder="Enter text"
                label="Text"
                textarea
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              Update post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
