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
import { useDispatch, useSelector } from 'react-redux';
import { courseRequest } from '../../redux/actions/other';
import toast from 'react-hot-toast';


const Request = () => {
  const [email, setEmail] = useState(' ');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');

  const { loading, error, message } = useSelector(state => state.other);
  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(courseRequest(name, email, course));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

  }, [dispatch, error, message,]);

  return (
    <Container h={'92vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={16}>
        <Heading children="Request New Course" />
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

          <Button my={4} isLoading={loading} colorScheme="blue" type="submit">
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
