


function ProgressBar({ submissionCount, maxSubmissions }: { submissionCount: number, maxSubmissions: number }) {
    const progress = Math.min((submissionCount / maxSubmissions) * 100, 100);

    return (
        <div className="flex flex-col relative md:flex-row justify-between">
            <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-green-500 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="mt-2 md:mt-0 md:ml-4 text-sm font-medium text-gray-700">
                {submissionCount} / {maxSubmissions} Submissions
            </div>
        </div>
    );
};

export default ProgressBar;