import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../redux/actions/profile';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');

  const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, message, error } = useSelector(state => state.profile);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
    navigate("/login");
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
          Reset Password
        </Heading>

        <VStack spacing={8}>
          <Input
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter New Password"
            type="password"
            focusBorderColor="blue.400"
          />

          <Button isLoading={loading} type="submit" w={'full'} colorScheme="blue">
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
