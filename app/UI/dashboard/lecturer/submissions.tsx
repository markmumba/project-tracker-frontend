import { useSubmissionStore } from '@/app/shared/store';
import { SubmissionDetails } from '@/app/shared/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from '../../spinner';
import { formatDate } from '@/app/shared/helper';

function Submissions({ lecturerSubmissions }: {
    lecturerSubmissions?: SubmissionDetails[] | undefined | null,
}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const setSelectedSubmissionId = useSubmissionStore((state) => state.setSelectedSubmissionId);
    const [showReviewed, setShowReviewed] = useState(false); // Toggle state

    // Separate submissions based on the reviewed field
    const reviewedFalseSubmissions = lecturerSubmissions?.filter(submission => !submission.reviewed) ?? [];
    const reviewedTrueSubmissions = lecturerSubmissions?.filter(submission => submission.reviewed) ?? [];

    // Sort both lists by submission_id


    const truncateDescription = (description: string, maxLength: number) => {
        if (description.length > maxLength) {
            return description.slice(0, maxLength) + '...';
        }
        return description;
    };

    const handleSubmissionClick = (submissionId: number) => {
        setIsLoading(true);
        setSelectedSubmissionId(submissionId);
        router.push('/dashboard/lecturer/submission');
    };

    return (
        <div className="relative">
            {/* Toggle Button */}
            <div className="flex items-center mb-4">
                <button
                    className={`mr-4 px-4 py-2 rounded-full focus:outline-none ${showReviewed ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setShowReviewed(!showReviewed)}
                >
                    {showReviewed ? 'Show Unreviewed' : 'Show Reviewed'}
                </button>
            </div>

            {/* Display submissions based on toggle state */}
            {showReviewed ?
                reviewedTrueSubmissions.map((submission) => (
                    <div
                        key={submission.id}
                        className="relative pl-8 mb-4 cursor-pointer"
                        onClick={() => handleSubmissionClick(submission.id)}
                    >
                        <div className=" bg-blue-500 h-4 w-4 rounded-full border-2 border-white"></div>
                        <div className="flex items-center mb-2 group">
                            <div className="ml-4 p-4 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-lg flex-grow max-w-4xl relative">
                                <p className="mb-2">
                                    <span className='text-lg font-bold'>Description:</span>
                                    {` ${truncateDescription(submission.description, 40)}`}
                                </p>
                                <p className="mb-2">{`Submission Date: ${formatDate(submission.submission_date)}`}</p>
                                <h2>{`Project: ${submission.project.title}`}</h2>
                                <h3 className="text-medium text-gray-400 group-hover:text-gray-100 ">{`Student: ${submission.student.name}`}</h3>
                                <Link href={submission.document_path} className="text-blue-500 underline group-hover:text-white  ">
                                    View Document
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
                :
                reviewedFalseSubmissions.map((submission) => (
                    <div
                        key={submission.id}
                        className="relative pl-8 mb-4 cursor-pointer"
                        onClick={() => handleSubmissionClick(submission.id)}
                    >
                        <div className="flex items-center mb-2 group">
                            <div className="animate-ping bg-blue-500 h-4 w-4 rounded-full border-2 border-white"></div>
                            <div className="ml-4 p-4 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-lg flex-grow max-w-4xl">
                                <p className="mb-2">
                                    <span className='text-lg font-bold'>Description:</span>
                                    {` ${truncateDescription(submission.description, 40)}`}
                                </p>
                                <p className="mb-2">{`Submission Date: ${formatDate(submission.submission_date)}`}</p>
                                <h2>{`Project: ${submission.project.title}`}</h2>
                                <h3 className="text-medium text-gray-400 group-hover:text-gray-100 ">{`Student: ${submission.student.name}`}</h3>
                                <Link href={submission.document_path} className="text-blue-500 underline group-hover:text-white  ">
                                    View Document
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }

            {isLoading &&
                <Spinner />}
        </div>
    );
};

export default Submissions;

