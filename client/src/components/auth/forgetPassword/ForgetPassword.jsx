import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../../redux/actions/profile';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  return (
    <Container h={'90vh'} py={16}>
      <form onSubmit={submitHandler}>
        <Heading
          my={16}
          textAlign={['center', 'left']}
          textTransform={'uppercase'}
        >
          Forget Password
        </Heading>

        <VStack spacing={8}>
          <Input
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            type="email"
            focusBorderColor="blue.400"
          />

          <Button isLoading={loading} type="submit" w={'full'} colorScheme="blue">
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
