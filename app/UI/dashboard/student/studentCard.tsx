
import { ProjectDetails, UserDetails } from "@/app/shared/types";
import avatar from "/public/images/user.png"
import TimeRemaining from "./timeremaining";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import UploadAvatar from "../../uploadavatar";



function StudentCard({
  userDetails,
  projectDetails,
  submissionCount
}: {
  userDetails?: UserDetails | null | undefined;
  projectDetails?: ProjectDetails | null | undefined;
  submissionCount?: number | undefined;
}) {
  const avatarUrl = userDetails?.profile_image || avatar;



  return (
    <>
      <div className="flex flex-col p-4 rounded-lg">
        <div className="relative w-[120px] h-[120px] rounded-full mx-auto mb-4 overflow-hidden">
          <Image
            src={avatarUrl}
            width={120}
            height={120}
            alt="avatar"
            className="object-cover"
          />
        </div>
        {!userDetails?.profile_image && <UploadAvatar />}
        <div className="bg-gray-100 rounded-xl p-6">
          <div className="mb-1 p-4 rounded-xl">
            <div className="text-lg font-bold">Name</div>
            <div className="text-base">{userDetails?.name}</div>
          </div>
          <div className="mb-1 p-4 rounded-xl">
            <div className="text-lg font-bold">Project Title</div>
            <div className="text-base">{projectDetails?.title}</div>
          </div>
          <div className="mb-1 p-4 rounded-xl">
            <div className='text-lg font-bold '>Supervisor Name</div>
            <div className='text-base'>{projectDetails?.lecturer.name}</div>
          </div>
          <div className="mb-1 p-4 rounded-xl">
            <div className="text-lg font-bold">Submissions</div>
            <div className="text-base">{submissionCount}</div>
          </div>
        </div>
      </div>
      <TimeRemaining projectDetails={projectDetails} />
    </>
  );
}

export default StudentCard;
