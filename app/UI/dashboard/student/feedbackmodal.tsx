import { formatDate } from "@/app/shared/helper";
import { FeedbackDetails } from "@/app/shared/types";

function FeedbackModal({ feedback, onClose }: {
    feedback: FeedbackDetails;
    onClose: () => void;
}) {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center ">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative bg-gray-50 p-8 max-w-4xl rounded-lg shadow-lg z-10">
                    <h2 className="text-2xl font-bold mb-4">Feedback Details</h2>
                    <p className="mb-2"><span className='text-xl font-bold'>Feedback :</span> {feedback.comment}</p>
                    <p className="px-4 py-2 bg-gray-200 max-w-sm rounded-xl">
                        <span className="font-bold">Feedback Given on date:</span>
                        {formatDate(feedback.feedback_date)}</p>

                    <div className="m-10 p-5 rounded-xl bg-sky-200">
                        <h2 className="">
                            <span className="text-lg font-bold">In reference to submission:</span>
                            {feedback.submission.description}
                        </h2>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FeedbackModal;