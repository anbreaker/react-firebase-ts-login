import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/authContext';
import { Alert } from './Alert';

export const Register = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { singUp }: any = useAuth();
  const navigate = useNavigate();

  const [error, setError]: any = useState();

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setError('');

    const { email, password } = user;

    try {
      await singUp(email, password);

      navigate('/');
    } catch (error: any) {
      console.log(error.code, '<-----');

      if (error.code === 'auth/internal-error')
        return setError('Email or Password Wrong');

      setError(error.message);
    }

    console.log(user);
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            type="email"
            placeholder="youremail@company.ltd"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2">
            password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            type="password"
            placeholder="Your Password"
            id="password"
            onChange={handleChange}
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Register
        </button>
      </form>

      <div className="my-4 text-sm flex justify-between px-3">
        <p> Already have an Account?</p>
        <Link to="/login" className="text-yellow-400 hover:text-yellow-600">
          Login
        </Link>
      </div>
    </div>
  );
};
