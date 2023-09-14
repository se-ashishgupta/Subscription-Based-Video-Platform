import React, { useState } from 'react';
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
const Request = () => {
  const [email, setEmail] = useState(' ');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  return (
    <Container h={'92vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={16}>
        <Heading children="Request New Course" />
        <form
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
            <FormLabel htmlFor="course" children="Course" />
            <Textarea
              required
              id="course"
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="Explain the Course..."
              focusBorderColor="blue.400"
            />
          </Box>

          <Button my={4} colorScheme="blue" type="submit">
            Send Mail
          </Button>

          <Box my={4}>
            See Available Courses!{' '}
            <Link to={'/courses'}>
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

export default Request;
