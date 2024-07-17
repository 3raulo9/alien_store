import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, selectUser } from '../reducers/getUserSlice';

const Test = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get the user ID from local storage or some other storage mechanism
    const userIdFromLocalStorage = localStorage.getItem('user_id');
    setUserId(userIdFromLocalStorage);
  }, []);

  const handleClick = () => {
    if (userId) {
      dispatch(getUser(userId));
    } else {
      console.log('No user ID found');
    }
  };

  useEffect(() => {
    if (user) {
      console.log('User data:', user);
    }
  }, [user]);

  return (
    <button onClick={handleClick}>Get User</button>
  );
};

export default Test;
