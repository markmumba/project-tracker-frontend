'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, Clock, Users } from 'lucide-react';
import Link from 'next/link';

const ProjectTrackerHero = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
            {/* Floating shapes background animation */}
            <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            delay: i * 2,
                            ease: "easeInOut"
                        }}
                        style={{
                            left: `${30 + i * 30}%`,
                            top: `${20 + i * 20}%`
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pt-60 pb-16">
                <div className="text-center">
                    <motion.h1
                        className="text-5xl font-bold text-gray-900 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        ProjectTracker
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Bridging the Gap Between Students and Lecturers
                    </motion.p>
                </div>

                {/* Enhanced Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                    {[
                        {
                            icon: FileText,
                            title: "Progress Tracking",
                            description: "Submit and track project documentation seamlessly",
                            gradient: "from-blue-400 to-blue-600",
                            delay: 0
                        },
                        {
                            icon: MessageSquare,
                            title: "Direct Communication",
                            description: "Real-time feedback and discussions with lecturers",
                            gradient: "from-indigo-400 to-indigo-600",
                            delay: 0.1
                        },
                        {
                            icon: Clock,
                            title: "Timeline Management",
                            description: "Stay on schedule with milestone tracking",
                            gradient: "from-purple-400 to-purple-600",
                            delay: 0.2
                        },
                        {
                            icon: Users,
                            title: "Collaboration",
                            description: "Enhanced student-lecturer interaction",
                            gradient: "from-pink-400 to-purple-600",
                            delay: 0.3
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="group relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 + feature.delay }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r rounded-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 shadow-lg group-hover:shadow-xl"></div>
                            <div className={`relative h-full bg-gradient-to-r ${feature.gradient} rounded-xl p-6 transform group-hover:-translate-y-2 transition-transform duration-300`}>
                                <div className="bg-white/20 rounded-full p-3 w-16 h-16 mb-4">
                                    <feature.icon className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-white/90">
                                    {feature.description}
                                </p>
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="text-white/90 text-sm font-medium">
                                        Learn More →
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Link href="/register">
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
                            Get Started
                        </button>

                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectTrackerHero;