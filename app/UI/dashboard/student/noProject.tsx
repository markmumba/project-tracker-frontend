import { UserDetails } from "@/app/shared/types";
import Link from "next/link";


function NoProject({ userDetails }: { userDetails: UserDetails | null | undefined }) {
    return (
        <>
            <h1 className="text-2xl font-semibold text-gray-800">Welcome, {userDetails?.name}</h1>
            <p className="text-gray-600">You have not created any project yet.</p>
            <Link href="/dashboard/student/createproject">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Create Project
                </button>
            </Link>
        </>
    )
}
export default NoProject;