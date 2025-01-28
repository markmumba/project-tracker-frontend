import * as React from "react";

function Streamline() {
  return (
    <div className="flex flex-col justify-center px-16 py-20 bg-white max-md:px-5">
      <div className="mt-8 max-md:mr-1 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-base leading-6 text-black max-md:mt-10 max-md:max-w-full">
              <div className="font-semibold max-md:max-w-full">Simplify</div>
              <div className="mt-4 text-5xl font-bold leading-[58px] max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
                Streamline Communication and Project Progress
              </div>
              <div className="flex gap-5 justify-between items-start self-start pt-4 mt-8">
                <div className="px-6 py-3 border border-black border-solid max-md:px-5">
                  Get Started
                </div>
                <div className="flex gap-2 justify-center mt-3">
                  <div>Learn More</div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9742a420396e5caa7e429fdf2ccb9079b0158ce1d368acae84bfdb7e55682093?"
                    className="shrink-0 w-6 aspect-square"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-wrap">
                <div className="flex flex-col items-center pb-20">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa6119d5f81204fe6d3516d96540d57df07aacd17aae3a163ee6969b8454b114?"
                    className="w-12 aspect-square"
                  />
                </div>
                <div className="flex flex-col flex-1 self-start text-black max-md:max-w-full">
                  <div className="text-xl font-bold leading-7 max-md:max-w-full">
                    Efficient Collaboration
                  </div>
                  <div className="mt-4 text-base leading-6 max-md:max-w-full">
                    Our application provides a seamless platform for lecturers
                    and students to collaborate effectively.
                  </div>
                </div>
              </div>
              <div className="flex gap-5 mt-4 max-md:flex-wrap">
                <div className="flex flex-col items-center pb-20">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa6119d5f81204fe6d3516d96540d57df07aacd17aae3a163ee6969b8454b114?"
                    className="w-12 aspect-square"
                  />
                </div>
                <div className="flex flex-col flex-1 self-start text-black max-md:max-w-full">
                  <div className="text-xl font-bold leading-7 max-md:max-w-full">
                    Real-time Feedback
                  </div>
                  <div className="mt-4 text-base leading-6 max-md:max-w-full">
                    Lecturers can provide timely feedback on student's project
                    progress, ensuring continuous improvement.
                  </div>
                </div>
              </div>
              <div className="flex gap-5 mt-4 max-md:flex-wrap">
                <div className="flex flex-col items-center pb-20">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa6119d5f81204fe6d3516d96540d57df07aacd17aae3a163ee6969b8454b114?"
                    className="w-12 aspect-square"
                  />
                </div>
                <div className="flex flex-col flex-1 self-start text-black max-md:max-w-full">
                  <div className="text-xl font-bold leading-7 max-md:max-w-full">
                    Track Progress
                  </div>
                  <div className="mt-4 text-base leading-6 max-md:max-w-full">
                    Keep track of project milestones and monitor student's
                    progress towards completion.
                  </div>
                </div>
              </div>
              <div className="flex gap-5 mt-4 text-black max-md:flex-wrap">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa6119d5f81204fe6d3516d96540d57df07aacd17aae3a163ee6969b8454b114?"
                  className="shrink-0 self-start w-12 aspect-square"
                />
                <div className="flex flex-col flex-1 max-md:max-w-full">
                  <div className="text-xl font-bold leading-7 max-md:max-w-full">
                    Easy Communication
                  </div>
                  <div className="mt-4 text-base leading-6 max-md:max-w-full">
                    Effortlessly communicate with lecturers and fellow students,
                    fostering a collaborative environment.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Streamline
