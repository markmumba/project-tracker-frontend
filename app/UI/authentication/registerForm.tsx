import React, { useState } from 'react';
import Image from 'next/image';
import registerImage from '/public/images/Sandy_Bus-05_Single-08.jpg';
import { useRouter } from 'next/navigation';
import Spinner from '../spinner';
import { registerFormData } from '@/app/shared/types';


function RegisterForm({ formData, handleChange, handleSubmit, errors }:
  {
    formData: registerFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    errors: Partial<registerFormData>;
  }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoginClick = () => {
    setIsLoading(true);
    router.push('/login');
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen ">
        <div className="md:w-1/2 bg-gray-200 flex items-center justify-center">
          <div className="max-w-md w-full p-8">
            <h2 className="text-4xl font-bold text-center">User</h2>
            <h2 className="text-3xl font-bold mb-6 text-center">Registration</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="confirm_password">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
                {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>}
              </div>
              <button
                type="submit"
                className="w-full mb-4 bg-indigo-500 text-white py-3 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Register
              </button>
            </form>
            <button
              onClick={handleLoginClick}
              className="text-blue-500 w-full py-3 px-4 rounded focus:outline-none"
            >
              {isLoading ? <Spinner /> : 'Already have an account? Go to Login'}
            </button>
          </div>
        </div>
        <div className="md:w-1/2 bg-white flex items-center justify-center">
          <div className="w-full h-full">
            <Image
              src={registerImage}
              alt="Register Image"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default RegisterForm;