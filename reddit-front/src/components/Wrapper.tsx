import React from 'react';
import { Box } from '@chakra-ui/react';

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
  variant?: WrapperVariant;
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant }) => {
  return (
    <Box mt={8} mx="auto" w="100%" maxW={variant === 'regular' ? '80%' : '60%'}>
      {children}
    </Box>
  );
};

export default Wrapper;
