'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import heroImage from '/public/images/alvaro-reyes-qWwpHwip31M-unsplash.jpg';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners'; // Import the spinner component
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid';

function Hero() {
    const [isLoading, setIsLoading] = useState(false);

    const handleButtonClick = () => {
        setIsLoading(true);
    };

    return (
        <div className="relative h-screen w-full flex items-center justify-center">
            <Image
                src={heroImage}
                alt="Background Image"
                className="object-cover h-full w-screen"
            />
            <div className="absolute h-screen inset-0 bg-gradient-to-r from-black to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-white flex flex-col  items-center justify-center p-8 max-w-4xl text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">ProjectTracker: Bridging the Gap Between Students and Lecturers</h1>
                    <p className="text-lg md:text-xl mb-8">
                        An application designed to enhance communication between lecturers
                        and students during their final project period. Students submit progress
                        documents for lecturers to review and provide feedback, while the app tracks
                        all interactions and maintains a communication history.
                    </p>
                    <Link href="/register">
                        <button
                            onClick={handleButtonClick}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded flex items-center"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <ClipLoader size={24} color={"#fff"} loading={isLoading} />
                                    <span className="ml-2">Loading...</span>
                                </div>
                            ) : (
                                'Get Started'
                            )}
                        </button>
                    </Link>
                </div>
                <a href="#about" className="mt-8 flex items-center justify-center">
                    <ArrowDownCircleIcon className="w-12 text-white animate-bounce" />
                </a>
            </div>
        </div>
    );
}

export default Hero;
