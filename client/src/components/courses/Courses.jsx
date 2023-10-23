import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import toast from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  const categories = [
    'Web Development',
    ' Artificial Inteligence',
    'Data Structure and Algorithm',
    'App Developemnt',
    'Data Science',
    'Game Development',
  ];

  const addToPlaylistHandler = (courseId) => {
    dispatch(addToPlaylist(courseId));
  };

  const { loading, courses, error, message } = useSelector(state => state.course);

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      dispatch(loadUser());
    }
  }, [dispatch, category, keyword, error, message]);

  return (
    <Container minH={'95vh'} maxW={'container.lg'} paddingY={8}>
      <Heading children="All Courses" m={8} />

      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search Courses..."
        type="text"
        focusBorderColor="blue.400"
      />
      <HStack
        overflowX={'auto'}
        paddingY={8}
        css={{
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={60}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>

      <Stack
        direction={['column', 'row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >

        {
          courses.length > 0 ? courses.map((item) => (
            <Course
              key={item._id}
              views={item.views}
              title={item.title}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              description={item.description}
              lectureCount={item.numOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
              loading={loading}
            />

          )) : <><Heading opacity={0.5} mt={4} children="Courses Not Found"></Heading></>
        }

      </Stack>
    </Container>
  );
};

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading
}) => {


  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize={60} objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW={'200px'}
        size={'sm'}
        fontFamily={'sans-serif'}
        noOfLines={3}
        children={title}
      />
      <Text noOfLines={2} children={description} />

      <HStack>
        <Text
          fontWeight={'bold'}
          textTransform={'uppercase'}
          children={'Creator'}
        />
        <Text
          fontFamily={'body'}
          textTransform={'uppercase'}
          children={creator}
        />
      </HStack>

      <Heading
        textAlign={'center'}
        size={'xs'}
        children={`Lectures - ${lectureCount}`}
        textTransform={'uppercase'}
      />
      <Heading
        size={'xs'}
        children={`Views - ${views}`}
        textTransform={'uppercase'}
      />

      <Stack direction={['column', 'row']} alignItems={'center'}>
        <Link to={`/course/${id}`}>
          <Button colorScheme="blue">Watch Now</Button>
        </Link>
        <Button
          isLoading={loading}
          variant={'ghost'}
          colorScheme="blue"
          onClick={() => addToPlaylistHandler(id)}
        >
          Add to Playlist
        </Button>
      </Stack>
    </VStack>
  );
};
export default Courses;
