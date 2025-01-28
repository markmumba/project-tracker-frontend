// components/SubmissionModal.tsx

import { axiosInstance } from '@/app/fetcher/fetcher';
import { formatDate } from '@/app/shared/helper';
import { SubmissionDetails } from '@/app/shared/types';
import { useState } from 'react';
import { mutate } from 'swr';




function SubmissionModal({
    submission,
    onClose,
    onDelete,
    onUpdate
}: {
    submission: SubmissionDetails,
    onClose: () => void,
    onDelete: (id: number) => void
    onUpdate: (updatedSubmission: SubmissionDetails) => void
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedSubmission, setEditedSubmission] = useState(submission);

    const handleDelete = () => {
        console.log("delete button clicked ");
        onDelete(submission.id);
        onClose();
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedSubmission(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await axiosInstance.put(`/submissions/${submission.id}`, editedSubmission, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Update the SWR cache
            mutate('/submissions/student', async (currentData: any) => {
                return currentData.map((sub: SubmissionDetails) =>
                    sub.id === submission.id ? response.data : sub
                );
            }, false);

            onUpdate(response.data)
            setIsEditing(false);
            onClose();
        } catch (error) {
            console.error('Failed to update submission:', error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative bg-gray-100 p-8 max-w-6xl w-full rounded-lg shadow-lg z-10">
                <h2 className="text-2xl font-bold mb-4">Submission Details</h2>
                {isEditing ? (
                    <form className="w-full">
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="description">
                                Description:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={editedSubmission.description}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="submission_date">
                                Submission Date:
                            </label>
                            <input
                                type="datetime-local"
                                id="submission_date"
                                name="submission_date"
                                value={editedSubmission.submission_date.slice(0, 16)}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="document_path">
                                Document Path:
                            </label>
                            <input
                                type="text"
                                id="document_path"
                                name="document_path"
                                value={editedSubmission.document_path}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </form>
                ) : (
                    <>
                        <p className="mb-2"><span className='text-lg font-bold'>Description:</span> {submission.description}</p>
                        <p className="mb-2">Submission Date: {formatDate(submission.submission_date)}</p>
                    </>
                )}
                <div className="mt-4 flex justify-end">
                    {isEditing ? (
                        <button
                            className="bg-green-600 m-4 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
                            onClick={handleUpdate}
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            className="bg-blue-300 m-4 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-700"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                    )}
                    <button
                        className="bg-red-600 m-4 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-blue-600 m-4 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>

    );
}

export default SubmissionModal;
