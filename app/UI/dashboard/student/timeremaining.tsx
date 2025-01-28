import { ProjectDetails } from "@/app/shared/types";

function TimeRemaining({ projectDetails }: { projectDetails: ProjectDetails | null | undefined }) {

    function calculateTimeRemaining(projectDetails: ProjectDetails | null | undefined) {
        if (projectDetails) {
            const dueDate = new Date(projectDetails.end_date);
            const currentDate = new Date();
            const timeRemaining = dueDate.getTime() - currentDate.getTime();

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          
            return { days, hours };
        }
        return null; // Return null if projectDetails is undefined or null
    }

    const timeRemaining = calculateTimeRemaining(projectDetails);

    let backgroundColorClass = "bg-blue-300";
    if (timeRemaining && timeRemaining.days < 20) {
        backgroundColorClass = "bg-red-500";
    }

    return (
        <div className={`px-4 py-2 ml-4 rounded-full max-w-xs focus:outline-none justify-center ${backgroundColorClass}`}>
            {timeRemaining && (timeRemaining.days > 0 || timeRemaining.hours > 0 )
                ? `Time remaining to presentation: ${timeRemaining.days}d ${timeRemaining.hours}h`
                : "Time is up"}
        </div>
    );
}

export default TimeRemaining;
