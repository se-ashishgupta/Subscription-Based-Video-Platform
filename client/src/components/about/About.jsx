import React from 'react';
import {
  Avatar,
  Container,
  Heading,
  Stack,
  VStack,
  Text,
  Button,
  Box,
  HStack,
} from '@chakra-ui/react';
import introVideo from '../../assets/videos/intro.mp4';
import { Link } from 'react-router-dom';
import { RiSecurePaymentFill } from 'react-icons/ri';
import termsAndCondition from '../../assets/docs/termsAndCondition';
const Founder = () => (
  <Stack direction={['column', 'row']} spacing={[4, 16]} padding={8}>
    <VStack>
      <Avatar boxSize={[40, 48]} />
      <Text children="Co Founder" opacity={0.7} />
    </VStack>
    <VStack justify={'center'} alignItems={['center', 'flex-start']}>
      <Heading children="Ashish Gupta" size={['md', 'lg']} />
      <Text
        children="Hi, I am Ashish Gupta I am a Full Stack Developer  and a teacher.
      Our misson is to provide quality content at reasonable price"
        textAlign={['center', 'left']}
      />
    </VStack>
  </Stack>
);

const VideoPlayer = () => (
  <Box>
    <video
      autoPlay
      muted
      loop
      controls
      controlsList="nodownload nofullscreen noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
      src={introVideo}
      // autoPlay
    ></video>
  </Box>
);

const TandC = ({ termsAndCondition }) => (
  <Box>
    <Heading
      size={'md'}
      children="Terms & Contition"
      textAlign={['center', 'left']}
      my={4}
    />
    <Box h={'sm'} p={4} overflowY={'scroll'}>
      <Text
        letterSpacing={'widest'}
        fontFamily={'heading'}
        textAlign={['center', 'left']}
      >
        {termsAndCondition}
      </Text>

      <Heading
        my={4}
        size={'xs'}
        children="Refund only applicable for Cancellation within 7 days."
      />
    </Box>
  </Box>
);

const About = () => {
  return (
    <>
      <Container maxW={'container.lg'} padding={16} boxShadow={['md', 'xl']}>
        <Heading children="About Us" textAlign={['center', 'left']} />
        <Founder />

        <Stack m={8} direction={['column', 'row']} alignItems={'center'}>
          <Text
            children="We are a video streaming platfrom with some premium courses available only fro premium user"
            fontFamily={'cursive'}
            m={8}
            textAlign={['center', 'left']}
          />

          <Link to={'/subscribe'}>
            <Button variant={'ghost'} colorScheme="blue">
              Checkout Our Plan
            </Button>
          </Link>
        </Stack>
        <VideoPlayer />
        <TandC termsAndCondition={termsAndCondition} />
        <HStack my={4} p={4}>
          <RiSecurePaymentFill />
          <Heading
            size={'xs'}
            fontFamily={'sans-serif'}
            textTransform={'uppercase'}
            children="Payment is secured by razorpay"
          />
        </HStack>
      </Container>
    </>
  );
};

export default About;
