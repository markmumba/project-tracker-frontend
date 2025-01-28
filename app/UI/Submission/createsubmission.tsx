import { useState } from 'react';
import Link from 'next/link';
import { CreateSubmissionFormData } from '@/app/shared/types';

function SubmissionForm({ formData, handleSubmit, handleChange }:
    {
        formData: CreateSubmissionFormData,
        handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
        handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    }) {


    return (
        <div className="max-w-md p-10 overflow-hidden md:max-w-5xl">
            <h2 className="text-3xl font-bold mb-4 text-center">Make Submission </h2>
            <form onSubmit={handleSubmit} className="space-y-4">


                <label className="block">
                    <span className="text-gray-700">Description:</span>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-6 bg-gray-100 rounded-lg focus:outline-none sm:text-sm"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Date:</span>
                    <input
                        type="datetime-local"
                        name="submission_date"
                        value={formData.submission_date}
                        onChange={handleChange}
                        required
                        readOnly
                        className="mt-1 block w-full px-3 py-4 bg-gray-100 rounded-lg focus:outline-none sm:text-sm"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Document Path:</span>
                    <input
                        type="input"
                        name="document_path"
                        value={formData.document_path}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-3 bg-gray-100 rounded-lg focus:outline-none sm:text-sm"
                    />
                </label>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                    Submit 
                </button>

            </form>
        </div>
    );
};

export default SubmissionForm;
