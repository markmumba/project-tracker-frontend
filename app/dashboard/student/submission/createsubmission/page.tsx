'use client';
import SubmissionForm from "@/app/UI/Submission/createsubmission";
import fetcher, { axiosInstance } from "@/app/fetcher/fetcher";
import { CreateSubmissionFormData, ProjectDetails } from "@/app/shared/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

// TODO : Get also the time at which the submission is made 

function Submission() {
    const router = useRouter();

    const { data: project, error: projectError } = useSWR<ProjectDetails>("/projects", fetcher);


    if (projectError) {
        console.log(projectError.response?.data);
    }
    console.log(project);

    const [formData, setFormData] = useState<CreateSubmissionFormData>({
        project_id: 0,
        reviewed: false,
        student_id: 0,
        submission_date: '',
        document_path: '',
        description: '',
    });
    console.log(formData);

    useEffect(() => {
        const currentDate = new Date().toISOString().slice(0, 16);
        if (project) {
            setFormData({
                project_id: project?.id ?? 0,
                student_id: project?.student?.id ?? 0,
                reviewed: false,
                submission_date: currentDate,
                document_path: '',
                description: '',
            });
        } else {
            setFormData(prev => ({
                ...prev,
                submission_date: currentDate,
            }));
        }
    }, [project]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const requestBody = JSON.stringify(formData);
            console.log(requestBody)
            const response = await axiosInstance.post('/submissions', requestBody, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Project created successfully:', response.data);
            setFormData({
                project_id: 0,
                reviewed: false,
                student_id: 0,
                submission_date: '',
                document_path: '',
                description: '',
            });

            mutate('/submissions/student', async (currentData) => {
                return currentData ? [...currentData, response.data] : [response.data];
            }, false);
            router.push('/dashboard/student/submission');
            mutate('/submissions/student');
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <>
            <SubmissionForm formData={formData} handleSubmit={handleSubmit} handleChange={handleChange} />
        </>
    );
}

export default Submission;
