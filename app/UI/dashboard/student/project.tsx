import { ProjectDetails, UserDetails } from "@/app/shared/types";



function Project({ userDetails, projectDetails }:
    {
        userDetails?: UserDetails | null | undefined,
        projectDetails: ProjectDetails
    }) {
    return (
        <div className="">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome, {userDetails?.name}</h1>
            <div className=" rounded-md bg-gray-100 hover:bg-gray-200 p-4 mt-4">
                <h2 className="text-2xl font-semibold text-gray-800">Project: {projectDetails.title}</h2>
                <p className=" text-lg text-gray-600">Supervisor: {projectDetails.lecturer.name}</p>
                <p className="text-gray-600">Description: {projectDetails.description}</p>
            </div>
        </div>
    )

}
export default Project;