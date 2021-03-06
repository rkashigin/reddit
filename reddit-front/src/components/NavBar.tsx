import React from 'react';
import { Box, Button, Flex, Link, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  if (fetching) {
  } else if (data?.me) {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Button as={Link} mr={4}>
            Create post
          </Button>
        </NextLink>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          variant="link"
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );
  } else {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={4} color="white">
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    );
  }

  return (
    <Flex zIndex={2} position="sticky" top="0" bg="tan" p={4} align="center">
      <Flex maxW="81.5%" flex={1} m="auto" align="center">
        <NextLink href="/">
          <Link>
            <Heading>Reddit</Heading>
          </Link>
        </NextLink>
        <Box ml="auto">{body}</Box>
      </Flex>
    </Flex>
  );
};
