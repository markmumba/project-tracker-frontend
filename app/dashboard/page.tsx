"use client";
import useSWR from "swr";
import fetcher from "../fetcher/fetcher";
import { DashboardSkeleton } from "../UI/skeletons";
import NoProject from "../UI/dashboard/student/noProject";
import Project from "../UI/dashboard/student/project";
import { useUserStore } from "../shared/store";
import StudentCard from "../UI/dashboard/student/studentCard";
import LecuturerCard from "../UI/dashboard/lecturer/lecturerCard";
import Submissions from "../UI/dashboard/lecturer/submissions";
import { useEffect } from "react";
import Feedbacks from "../UI/dashboard/student/feedbacks";
import {
  FeedbackDetails,
  ProjectDetails,
  SubmissionDetails,
  UserDetails,
} from "../shared/types";
import ProgressBar from "../UI/progresbar";

// TODO : can view due date of project
// TODO : be alerted if the submission are not enough
// TODO : middleware to check auth so no page can load without auth
// TODO : Adding the sekeletons to every page

function Dashboard() {
  const { user, setUser } = useUserStore();
  const {
    data: userDetails,
    isLoading: userLoading,
    error: userError,
  } = useSWR<UserDetails>("/users", fetcher);

  console.log(userDetails);

  

  useEffect(() => {
    if (userDetails && (!user || JSON.stringify(user) !== JSON.stringify(userDetails))) {
      setUser(userDetails);
    }
  }, [userDetails, setUser, user]);

  const shouldFetch = user && user.role !== "lecturer";
  const { data: projectDetails, error: projectError } = useSWR<ProjectDetails>(
    shouldFetch ? "/projects" : null,
    fetcher,
  );
  const { data: submissions, error: submissionError } = useSWR<
    SubmissionDetails[]
  >(shouldFetch ? "/submissions/student" : null, fetcher);
  const { data: students, error: studentError } = useSWR<UserDetails[]>(
    "/users/students",
    fetcher,
  );
  const { data: feedbackDetails, error: feedbackError } = useSWR<
    FeedbackDetails[]
  >("/feedbacks/student", fetcher);
  const { data: lecturerSubmissions, error: lecturerSubmissionError } = useSWR<
    SubmissionDetails[]
  >("/submissions/lecturer", fetcher);

  if (userLoading) {
    return <DashboardSkeleton />;
  }

  if (userError) {
    console.error(userError.response?.data);
    return <div>Error loading user data</div>;
  }

  if (projectError) {
    console.error(projectError);
  }

  if (submissionError) {
    console.error(submissionError);
  }

  if (studentError) {
    console.error(studentError);
  }
  if (feedbackError) {
    console.error(feedbackError);
  }

  if (lecturerSubmissionError) {
    console.error(lecturerSubmissionError);
  }

  const reviewedSumbissions = submissions?.filter((submission:any) => submission.reviewed == true);
  const submissionCount = reviewedSumbissions ? reviewedSumbissions.length : 0;


  if (!userDetails) {
    return <div>No user data available</div>;
  }

  if (userDetails.role === "lecturer") {
    return (
      <div className="w-full max-w-full overflow-x-hidden px-4">
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-3/4 p-4 bg-white rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold mb-4">
              Welcome back Lecturer {userDetails.name}
            </h1>
            <h1 className="text-2xl font-bold mb-4">Latest Submissions</h1>
            <div className="overflow-x-auto">
              <Submissions lecturerSubmissions={lecturerSubmissions} />
            </div>
          </div>
          <div className="w-full md:w-1/4 p-4 bg-white rounded-lg shadow-sm">
            <LecuturerCard userDetails={userDetails} students={students} />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-full overflow-x-hidden px-2 md:px-4">
      <ProgressBar submissionCount={submissionCount} maxSubmissions={8} />
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-3/4 bg-white rounded-lg shadow-sm p-4">
            {projectDetails ? (
              <div className="space-y-4">
                <Project
                  projectDetails={projectDetails}
                  userDetails={userDetails}
                />
                <Feedbacks feedbackDetails={feedbackDetails} />
              </div>
            ) : (
              <NoProject userDetails={userDetails} />
            )}
          </div>
          <div className="w-full md:w-1/4 bg-white rounded-lg shadow-sm p-4">
            <StudentCard
              userDetails={userDetails}
              projectDetails={projectDetails}
              submissionCount={submissionCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
