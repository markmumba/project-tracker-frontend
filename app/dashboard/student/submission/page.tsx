'use client';
import Submissions from "@/app/UI/Submission/submissions";
import fetcher from "@/app/fetcher/fetcher";
import { ProjectDetails, SubmissionDetails } from "@/app/shared/types";
import useSWR from "swr";

// TODO 1: get the submissions that belong to current user 
// TODO 2: display in list view 
// TODO 3: add pagination
// TODO 4: latest being at the top 
// TODO 5: have a create submission button at the top 
// TODO 6: add a search bar to filter submissions (future feature)

function SubmissionPage() {

  const { data: submissions, isLoading: submissionLoading, error: submissionError } = useSWR<SubmissionDetails[]>(
    '/submissions/student',
    fetcher,
    { revalidateOnFocus: true } 
  );

  const { data: project, error: projectError } = useSWR<ProjectDetails>(
    '/projects',
    fetcher
  );

  if (submissionLoading) {
    return <p>Loading...</p>;
  }
  if (submissionError) {
    console.log(submissionError.response?.data);
  }

  return (
    <div>
      <Submissions submissions={submissions} project={project} />
    </div>
  );
}

export default SubmissionPage;