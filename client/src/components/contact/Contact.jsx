import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { contactUs } from '../../redux/actions/other';
import toast from 'react-hot-toast';

const Contact = () => {
  const [email, setEmail] = useState(' ');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const { loading, error, message: otherMessage } = useSelector(state => state.other);
  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(contactUs(name, email, message));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (otherMessage) {
      toast.success(otherMessage);
      dispatch({ type: 'clearMessage' });
    }

  }, [dispatch, error, otherMessage,]);

  return (
    <Container h={'92vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={16}>
        <Heading children="Contact Us" />
        <form
          onSubmit={submitHandler}
          style={{
            width: '100%',
          }}
        >
          <Box my={4}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Abc"
              type="text"
              focusBorderColor="blue.400"
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type="email"
              focusBorderColor="blue.400"
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="message" children="Message" />
            <Textarea
              required
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Your Message..."
              focusBorderColor="blue.400"
            />
          </Box>

          <Button my={4} colorScheme="blue" type="submit" isLoading={loading}>
            Send Mail
          </Button>

          <Box my={4}>
            Request for a Course?{' '}
            <Link to={'/request'}>
              <Button colorScheme="blue" variant={'link'}>
                Click
              </Button>{' '}
            </Link>
            here
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Contact;
