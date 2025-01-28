'use client';
import { formatDate, truncateDescription } from "@/app/shared/helper";
import { FeedbackDetails } from "@/app/shared/types";
import Link from "next/link";
import { useState } from "react";
import FeedbackModal from "../dashboard/student/feedbackmodal";


function FeedbackList({ feedbackDetails }: { feedbackDetails: FeedbackDetails[] | undefined | null }) {


    const sortedFeedback = feedbackDetails?.slice().sort((a, b) => new Date(b.feedback_date).getTime() - new Date(a.feedback_date).getTime());

    const [selectedFeedback, setSelectedFeedback] = useState<FeedbackDetails | null>(null);

    const handleFeedbackClick = (feedback: FeedbackDetails) => {
        setSelectedFeedback(feedback);
    };

    const closeModal = () => {
        setSelectedFeedback(null);
    };

    return (
        <div>
            <h1 className="text-3xl py-4 font-bold">Full Feedback List</h1>
            {sortedFeedback?.map((feedback) => (
                <div
                    key={feedback.id}
                    className="relative pl-8 mb-4 cursor-pointer"
                    onClick={() => handleFeedbackClick(feedback)}
                >
                    <div className="flex items-center mb-2">
                        <div className="bg-blue-500 h-4 w-4 rounded-full border-2 border-white"></div>
                        <div className="ml-4 p-4 bg-gray-100 hover:bg-blue-500 hover:text-white group rounded-lg flex-grow max-w-5xl">
                            <p className="mb-2">
                                <span className='text-lg font-bold'>Feedback</span>
                                {`: ${truncateDescription(feedback.comment, 40)}`}
                            </p>
                            <p className="text-gray-400 group-hover:text-white">Student: {feedback.submission.student.name}</p>
                            <p className="mb-2">{`Feedback Date: ${formatDate(feedback.feedback_date)}`}</p>
                            <h2 className=""><span className="text-lg font-bold"> In reference to submission:</span>{truncateDescription(feedback.submission.description, 40)}</h2>
                            <Link href={feedback.submission.document_path} className="text-blue-500 group-hover:text-white underline">
                                View Document
                            </Link>
                        </div>
                    </div>
                </div>
            ))}


            {selectedFeedback && (
                <FeedbackModal feedback={selectedFeedback} onClose={closeModal} />
            )}
        </div>
    )
}
export default FeedbackList;