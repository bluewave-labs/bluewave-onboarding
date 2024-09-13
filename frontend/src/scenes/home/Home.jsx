import Dashboard from "../dashboard/Dashboard";
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/loginServices';
import Cookies from 'js-cookie';

const Home = () => {
  const initialFullName = Cookies.get('fullName') || 'John Doe';
  const [fullName, setFullName] = useState(initialFullName);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setFullName(user.surname ? user.name + " " + user.surname : user.name);
    };
    fetchUser();
  }, [fullName]);

  return (
    <Dashboard fullName={fullName} />
  );
};

export default Home;