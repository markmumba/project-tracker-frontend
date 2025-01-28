'use client';
import fetcher from "@/app/fetcher/fetcher";
import { FeedbackDetails } from "@/app/shared/types"
import FeedbackList from "@/app/UI/feedback/feedbacklist";
import useSWR from "swr"


function Feedbacks() {
    const { data: feedbacks, isLoading: loadingFeedbacks, error: feedbacksError } = useSWR<FeedbackDetails[]>("/feedbacks/lecturer", fetcher);

    if (loadingFeedbacks) {
        return <div>Loading the feedbacks</div>
    }
    if (feedbacksError) {
        console.log("error loading data ",feedbacksError);
    }

    return (
        <>
        <FeedbackList feedbackDetails={feedbacks}/>
        </>
    )
}


export default Feedbacks;