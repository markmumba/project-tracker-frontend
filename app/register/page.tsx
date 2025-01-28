'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "../fetcher/fetcher";
import { useAuthStore } from "../shared/store";
import { registerFormData } from "../shared/types";
import RegisterForm from "../UI/authentication/registerForm";
import Spinner from "../UI/spinner";


function Register() {
  const router = useRouter();
  const setSuccessMessage = useAuthStore((state) => state.setSuccessMessage);
  const [formData, setFormData] = useState<registerFormData>({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    role_id: 2
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<registerFormData>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Partial<registerFormData> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { confirm_password, ...requestData } = formData;
      const requestBody = JSON.stringify(requestData);
      const response = await axiosInstance.post('/register', requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuccessMessage('Registration successful! Please log in.');
      router.push('/login');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <RegisterForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </>
  )
}

export default Register;