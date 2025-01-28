// components/Submissions.tsx

import { useCallback, useState } from 'react';
import { ProjectDetails, SubmissionDetails } from '@/app/shared/types';
import Link from 'next/link';
import SubmissionModal from './submissionmodal';
import { formatDate, truncateDescription } from '@/app/shared/helper';
import { axiosInstance } from '@/app/fetcher/fetcher';
import { mutate } from 'swr';

function Submissions({ submissions: initialSubmissions, project }: {
  submissions: SubmissionDetails[] | null | undefined,
  project: ProjectDetails | null | undefined
}) {
  const [submissions, setSubmissions] = useState<SubmissionDetails[] | null | undefined>(initialSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionDetails | null>(null);

  // Filter and sort submissions
  const unreviewed = submissions?.filter(submission => submission.reviewed === false) ?? [];
  const sortedSubmissions = unreviewed.sort((a, b) => {
    const dateA = new Date(a.submission_date);
    const dateB = new Date(b.submission_date);
    return dateA.getTime() - dateB.getTime();
  });

  const handleSubmissionClick = (submission: SubmissionDetails) => {
    setSelectedSubmission(submission);
  };

  const deleteSubmission = async (submissionId: number) => {
    try {
      await axiosInstance.delete(`/submissions/${submissionId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Update local state after successful deletion
      setSubmissions(prevSubmissions =>
        prevSubmissions ? prevSubmissions.filter(sub => sub.id !== submissionId) : null
      );

      // Update the SWR cache
      mutate('/submissions/student',
        async (currentData: any) => {
          return currentData ? currentData.filter((sub: any) => sub.id !== submissionId) : [];
        }, false);

      // Close the modal if the deleted submission was selected
      if (selectedSubmission?.id === submissionId) {
        setSelectedSubmission(null);
      }
    } catch (error) {
      console.error('Failed to delete submission:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleUpdate = useCallback((updatedSubmission: SubmissionDetails) => {
    setSubmissions((prevSubmissions) =>
      prevSubmissions?.map((sub) =>
        sub.id === updatedSubmission.id ? updatedSubmission : sub
      ) ?? null
    );

    // Update the SWR cache
    mutate('/submissions/student', (currentData: SubmissionDetails[] | undefined) =>
      currentData?.map((sub) =>
        sub.id === updatedSubmission.id ? updatedSubmission : sub
      ),
      false
    );

    setSelectedSubmission(null);
  }, []);

  const closeModal = () => {
    setSelectedSubmission(null);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Unreviewed Submissions</h1>
        <Link href="/dashboard/student/submission/createsubmission">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
            Create Submission
          </button>
        </Link>
      </div>
      <div className="relative">
        <div className="absolute left-2 top-0 bottom-0 border-l-2 border-gray-300"></div>
        {sortedSubmissions.length > 0 ? (
          sortedSubmissions.map((submission) => (
            <div
              key={submission.id}
              className="relative pl-8 mb-4 cursor-pointer"
              onClick={() => handleSubmissionClick(submission)}
            >
              <div className="flex items-center mb-2">
                <div className="bg-blue-500 h-4 w-4 rounded-full border-2 border-white"></div>
                <div className="ml-4 p-4 bg-blue-500/20 backdrop-blur-xl hover:bg-blue-500 hover:text-white group rounded-lg flex-grow max-w-5xl">
                  <p className="mb-2">
                    <span className='text-lg font-bold'>Description</span>
                    {`: ${truncateDescription(submission.description, 40)}`}
                  </p>
                  <p className="mb-2">{`Submission Date: ${formatDate(submission.submission_date)}`}</p>
                  <h2 className="">{`Project: ${project?.title}`}</h2>
                  <Link href={submission.document_path} className="text-blue-500 group-hover:text-white underline">
                    View Document
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No unreviewed submissions found.</p>
        )}
      </div>
      {selectedSubmission && (
        <SubmissionModal
          submission={selectedSubmission}
          onClose={closeModal}
          onDelete={() => deleteSubmission(selectedSubmission.id)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default Submissions;