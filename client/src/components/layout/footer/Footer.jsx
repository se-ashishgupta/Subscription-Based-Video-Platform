import React from 'react';
import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react';
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
  TiSocialGithubCircular,
} from 'react-icons/ti';
const Footer = () => {
  return (
    <Box padding={4} bg={'blackAlpha.900'} minH={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width={'full'}>
          <Heading children="All Right Reserved" color={'white'} />
          <Heading
            fontFamily={'body'}
            size={'sm'}
            children="@Coding Course"
            color={'blue.500'}
          />
        </VStack>

        <HStack
          spacing={[2, 10]}
          justifyContent={'center'}
          color={'white'}
          fontSize={50}
        >
          <a href="https://youtube.com/creativeprogrammer" target={'blank'}>
            <TiSocialYoutubeCircular />
          </a>
          <a href="https://youtube.com/creativeprogrammer" target={'blank'}>
            <TiSocialInstagramCircular />
          </a>
          <a href="https://youtube.com/creativeprogrammer" target={'blank'}>
            <TiSocialGithubCircular />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
