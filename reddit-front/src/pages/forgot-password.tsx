import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { InputField } from '../components/InputField';
import { Box, Button } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import Wrapper from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              if an account with this email exists, we will sent you an email
            </Box>
          ) : (
            <Form>
              <Box mt={4}>
                <InputField
                  name="email"
                  placeholder="Enter email"
                  label="Email"
                  type="email"
                />
              </Box>
              <Button
                mt={4}
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting}
              >
                Forgot password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
