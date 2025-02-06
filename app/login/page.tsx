'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "../fetcher/fetcher";
import { useAuthStore } from "../shared/store";
import { loginFormData, loginFormErrors } from "../shared/types";
import LoginForm from "../UI/authentication/loginForm";
import Spinner from "../UI/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DEMO_CREDENTIALS = {
  name: "Matthew Thiongo",
  email: "matthewthiongo@gmail.com",
  role: "lecturer",
};

function Login() {
  const router = useRouter();
  const successMessage = useAuthStore(state => state.successMessage);
  const setSuccessMessage = useAuthStore(state => state.setSuccessMessage);
  const [showCredentials, setShowCredentials] = useState(false);
  const [formData, setFormData] = useState<loginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<loginFormErrors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
  

    // Check if this is the user's first visit
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      setShowCredentials(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, [router]);

  const handleDemoLogin = () => {
    setFormData({
      email: DEMO_CREDENTIALS.email,
      password: 'qwerty1234' // You'll need to replace this with the actual demo password
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: loginFormErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const requestBody = JSON.stringify(formData);
      
      const response = await axiosInstance.post('/login', requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Store token in localStorage
      const token = response.data.token;
      localStorage.setItem('token', token);
  
      // Set token in Axios for future requests
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
      setErrors({ email: 'Invalid email or password' });
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  }, [successMessage, setSuccessMessage]);

  return (
    <div className="space-y-6">
      {loading && <Spinner />}
      {successMessage && (
        <div className="bg-green-500 text-white text-center p-3">
          {successMessage}
        </div>
      )}
      
      {showCredentials && (
        <Alert className="mb-6">
          <AlertTitle>Demo Lecturer Credentials</AlertTitle>
          <AlertDescription>
            <div className="mt-2 space-y-2">
              <p><strong>Name:</strong> {DEMO_CREDENTIALS.name}</p>
              <p><strong>Email:</strong> {DEMO_CREDENTIALS.email}</p>
              <p><strong>Role:</strong> {DEMO_CREDENTIALS.role}</p>
              <button
                onClick={handleDemoLogin}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Use Demo Credentials
              </button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <LoginForm 
        formData={formData} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        errors={errors}
      />
    </div>
  );
}

export default Login;
