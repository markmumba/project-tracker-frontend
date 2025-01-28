'use client';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import React, { useState, useEffect } from 'react';
import { useSubmissionStore } from '@/app/shared/store';
import { CreateFeedbackFormData, FeedbackDetails, SubmissionDetails } from '@/app/shared/types';
import fetcher, { axiosInstance } from '@/app/fetcher/fetcher';
import { formatDate } from '@/app/shared/helper';


function SubmissionDetail() {
    const router = useRouter();
    const selectedSubmissionId = useSubmissionStore((state) => state.selectedSubmissionId);
    const [isLoading, setIsLoading] = useState(false);
    const [feedbackComment, setFeedbackComment] = useState('');
    const [feedback, setFeedback] = useState<FeedbackDetails | null>(null);

    console.log(feedback);

    const { data: submission, error: submissionError, mutate: mutateSubmission } = useSWR<SubmissionDetails>(
        selectedSubmissionId ? `/submissions/${selectedSubmissionId}` : null,
        fetcher
    );

    useEffect(() => {
        if (!selectedSubmissionId) {
            router.push('/dashboard');
        }
    }, [selectedSubmissionId, router]);

    useEffect(() => {
        async function fetchFeedback() {
            if (submission && submission.reviewed) {
                try {
                    console.log('Fetching feedback for submission ID:', selectedSubmissionId);
                    const response = await axiosInstance.get(`/feedbacks/submission/${selectedSubmissionId}`, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.status === 200) {
                        setFeedback(response.data);
                        setFeedbackComment(response.data.comment);
                    } else if (response.status === 404) {
                        console.log('No feedback found for this submission');
                    }
                } catch (error) {
                    console.error('Error fetching feedback:', error);
                }
            }
        }
        fetchFeedback();
    }, [submission, selectedSubmissionId]);

    if (submissionError) return <div>Error loading submission details</div>;
    if (!submission) return <div>Loading...</div>;

    async function handleFeedbackSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const feedbackData = {
                comment: feedbackComment,
                submission_id: selectedSubmissionId,
                feedback_date: new Date().toISOString(),
            };

            if (submission?.reviewed) {
                if (feedback?.id) {
                    // Update existing feedback
                    console.log('Updating feedback with ID:', feedback.id);
                    await axiosInstance.put(`/feedbacks/${feedback.id}`, feedbackData, {
                        withCredentials: true,
                        headers: { 'Content-Type': 'application/json' },
                    });
                } else {
                    console.error('Feedback ID is undefined');
                }
            } else {
                // Create new feedback
                await axiosInstance.post('/feedbacks', feedbackData, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' },
                });

                // Update submission to mark as reviewed
                await axiosInstance.put(`/submissions/${selectedSubmissionId}`,
                    { ...submission, reviewed: true },
                    {
                        withCredentials: true,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            }

            mutateSubmission();
            router.push('/dashboard');
        } catch (error) {
            console.error('Error submitting feedback:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="p-5 max-w-6xl">
            <h1 className="text-3xl font-bold mb-4">Submission Details</h1>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p><strong>Description:</strong> {submission.description}</p>
                <p><strong>Submission Date:</strong> {formatDate(submission.submission_date)}</p>
                <p><strong>Project:</strong> {submission.project.title}</p>
                <p><strong>Student:</strong> {submission.student.name}</p>
                <a href={submission.document_path} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                    View Document
                </a>
            </div>

            <form onSubmit={handleFeedbackSubmit}>
                <div className="mb-4">
                    <label htmlFor="feedback" className="block text-lg font-medium text-gray-700">
                        {submission.reviewed ? 'Update Feedback' : 'Feedback'}
                    </label>
                    <textarea
                        id="feedback"
                        name="feedback"
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        rows={4}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : (submission.reviewed ? 'Update Feedback' : 'Submit Feedback')}
                </button>
            </form>
        </div>
    );
}

export default SubmissionDetail;