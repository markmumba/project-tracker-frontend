'use client';
import FeedbackList from "@/app/UI/feedback/feedbacklist";
import fetcher from "@/app/fetcher/fetcher";
import { FeedbackDetails } from "@/app/shared/types";
import useSWR from "swr";


function FeedbackPage() {


    const { data: feedbackDetails, isLoading: feedbackLoading, error: feedbackError } = useSWR<FeedbackDetails[]>('/feedbacks/student', fetcher);


    if (feedbackLoading) {
        return <h1>Loading...</h1>;
    }

    if (feedbackError) {
        return <h1>Error loading your data </h1>;
    }

    return (
        <div>
            <FeedbackList feedbackDetails={feedbackDetails} />
        </div>
    );
}
export default FeedbackPage;