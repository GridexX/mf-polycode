import React from 'react';
import Home from '../components/home/HomePage';
import LandingPage from '../components/home/LandingPage';
import { useLoginContext } from '../lib/loginContext';

export default function Index() {
  const { user } = useLoginContext();

  // if user is logged in then show the home page

  if (user) return <Home />;

  // else show the landing page

  return <LandingPage />;
}
