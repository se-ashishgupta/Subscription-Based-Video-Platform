import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/layout/header/Header';
import Courses from './components/courses/Courses';
import Footer from './components/layout/footer/Footer';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import ForgetPassword from './components/auth/forgetPassword/ForgetPassword';
import ResetPassword from './components/auth/resetPassword/ResetPassword';
import Contact from './components/contact/Contact';
import Request from './components/request/Request';
import About from './components/about/About';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from 'react';
import { loadUser } from './redux/actions/user';
import { ProtectedRoute } from "protected-route-react";

const App = () => {

  const { isAuthenticated, user, message, error } = useSelector(state => state.user);

  const dispatch = useDispatch();
  useEffect(() => {

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);



  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect={"/"}><Login /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request" element={<Request />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;
