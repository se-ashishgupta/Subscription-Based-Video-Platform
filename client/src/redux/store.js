import { configureStore } from '@reduxjs/toolkit';
import { subscriptionReducer, userReducer } from './reducers/userReducer';
import { profileReducer } from './reducers/profileReducer';
import { courseReducer } from "./reducers/courseReducer";
import { adminReducer } from './reducers/adminReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
    subscription: subscriptionReducer,
    admin: adminReducer
  },
});

export default store;

export const server = process.env.REACT_APP_SERVER_URI;