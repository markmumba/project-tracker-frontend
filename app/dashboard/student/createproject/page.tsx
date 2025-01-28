'use client'
import CreateProjectForm from "@/app/UI/createprojectform";
import fetcher, { axiosInstance } from "@/app/fetcher/fetcher";
import { CreateProjectFormData, UserDetails } from "@/app/shared/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

function CreateProjectPage() {
    const router = useRouter();

    const { data: lecturersList, error: lecturerListError } = useSWR<UserDetails[]>('/users/lecturers', fetcher);

    if (lecturerListError) {
        console.log(lecturerListError.response?.data);
    }

    const [formData, setFormData] = useState<CreateProjectFormData>({
        title: '',
        lecturer_id: 0,
        description: '',
        start_date: '',
        end_date: '',
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'lecturer_id' ? parseInt(value, 10) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const requestBody = JSON.stringify(formData);
            console.log(requestBody)
            const response = await axiosInstance.post('/projects', requestBody, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            console.log('Project created successfully:', response.data);
            setFormData({
                title: '',
                lecturer_id: 0,
                description: '',
                start_date: '',
                end_date: '',
            });

            router.push('/dashboard');

        } catch (error) {
            console.error('Error creating project:', error);
        }
    };
    return (
        <div>
            <CreateProjectForm formData={formData} handleSubmit={handleSubmit} handleChange={handleChange} lecturersList={lecturersList} />
        </div>
    );
}

export default CreateProjectPage;