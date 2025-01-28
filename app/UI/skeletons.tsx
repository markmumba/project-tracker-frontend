// Loading animation
const shimmer = 'relative overflow-hidden before:absolute before:inset-0 before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:-translate-x-full';


export function UserCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-lg p-4 shadow-sm bg-gray-100">
      <div className="flex flex-col items-center">
        <div className={`${shimmer} w-40 h-40 rounded-full bg-gray-200 mb-4`} />
        <div className="w-full bg-gray-300 rounded-xl p-6">
          <div className="mb-1 p-4">
            <div className={`${shimmer} h-6 w-20 rounded-md bg-gray-200 mb-2`} />
            <div className={`${shimmer} h-4 w-full rounded-md bg-gray-200`} />
          </div>
          <div className="mb-1 p-4">
            <div className={`${shimmer} h-6 w-20 rounded-md bg-gray-200 mb-2`} />
            <div className={`${shimmer} h-4 w-full rounded-md bg-gray-200`} />
          </div>
          <div className="mb-1 p-4">
            <div className={`${shimmer} h-6 w-20 rounded-md bg-gray-200 mb-2`} />
            <div className={`${shimmer} h-4 w-full rounded-md bg-gray-200`} />
          </div>
          <div className="mb-1 p-4">
            <div className={`${shimmer} h-6 w-20 rounded-md bg-gray-200 mb-2`} />
            <div className={`${shimmer} h-4 w-full rounded-md bg-gray-200`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}>
      <div className=" p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Project: <span className="h-8 w-60 rounded-md bg-gray-200 inline-block" />
        </h2>
        <p className="mt-2 text-gray-600">
          Supervisor: <span className="h-6 w-40 rounded-md bg-gray-200 inline-block" />
        </p>
        <p className="mt-2 text-gray-600">
          Description: <span className="h-6 w-96 rounded-md bg-gray-200 inline-block" />
        </p>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className=" p-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0 md:w-3/4  p-4 flex-grow">
          <ProjectSkeleton />
        </div>
        <div className="md:w-1/4  p-4">
          <UserCardSkeleton />
        </div>
      </div>
    </div>
  );
}


export function LecturerDashboardSkeleton() {
  return (
    <div className=" p-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0 md:w-3/4  p-4 flex-grow">
          <ProjectSkeleton />
        </div>
        <div className="md:w-1/4  p-4">
          <UserCardSkeleton />
        </div>
      </div>
    </div>
  );
}