
import Image from "next/image";
import registerImage from "/public/images/Sandy_Bus-05_Single-08.jpg"
import Link from "next/link";
import { loginFormData, loginFormErrors } from "@/app/shared/types";
// TODO :Add a loading animation between login to Dashboard 

function LoginForm({ formData, handleChange, handleSubmit, errors }: {
  formData: loginFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: loginFormErrors;
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen ">
        <div className="md:w-1/2 bg-gray-200 flex items-center justify-center">
          <div className="max-w-md w-full p-8">
            <h2 className="text-4xl font-bold text-center">User</h2>
            <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
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
              <div className="mb-6">
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
              <button
                type="submit"
                className="w-full mb-4 bg-indigo-500 text-white py-3 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Login
              </button>
            </form>
            <Link href="/register">
              <p className="text-blue-500">Don&apos;t have an account ? Register</p>
            </Link>
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

export default LoginForm;