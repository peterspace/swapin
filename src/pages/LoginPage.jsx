import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import {
  SET_LOGIN,
  SET_NAME,
  SET_USER,
  // SetUserId
} from '../redux/features/auth/authSlice';
import { loginUser, validateEmail } from '../services/apiService';
// import { setOwnerId, selectOwnerId } from '../redux/features/auth/bookingSlice';
// import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState('');
  


  // const { setUser } = useContext(UserContext);

  const dispatch = useDispatch();

  async function handleLoginSubmit(ev) {
    ev.preventDefault();

    if (!email || !password) {
      return toast.error('All fields are required');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    const userData = {
      email,
      password,
    };

    try {
      const data = await loginUser(userData);
      console.log(data);
      dispatch(SET_USER({ user: data }));
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.name));
      setLoggedInUserId(data._id);
      console.log('loggedInUserId', loggedInUserId);
      // dispatch(setOwnerId({ownerId:data._id}))
      // dispatch(SetUserId({userId:data._id}))
      // console.log("activeOwnerId:", activeOwnerId);

      alert('Login successful');
      setRedirect(true);
    } catch (e) {
      alert('Login failed');
    }
  }

 

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{' '}
            <Link className="underline text-black" to={'/register'}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
