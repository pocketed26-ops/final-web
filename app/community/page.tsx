"use client";

import Navbar from "../../components/Navbar";
import { Users, Calendar, Heart, Plane, Trophy, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Mock Data
const MOCK_MOMENTS = [
  {
    id: 1,
    title: "Mindful Living Workshop",
    category: "Workshop",
    date: "May 20, 2024",
    image: "/comm_4.png",
    video: "/comm_1_video.mp4",
    attendees: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    ],
    extraAttendees: 12,
    span: "col-span-1 md:col-span-2 lg:col-span-2",
  },
  {
    id: 2,
    title: "Building Better Habits",
    category: "Talk Session",
    date: "May 18, 2024",
    image: "/comm_2.png",
    attendees: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=faces",
    ],
    extraAttendees: 8,
    span: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  {
    id: 3,
    title: "Creative Ideas Flow",
    category: "Brainstorm",
    date: "May 16, 2024",
    video: "/comm_3_video.mp4",
    attendees: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
    ],
    extraAttendees: 6,
    span: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  {
    id: 4,
    title: "Morning Yoga Flow",
    category: "Wellness",
    date: "May 19, 2024",
    image: "/comm_1.png",
    attendees: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces",
    ],
    extraAttendees: 10,
    span: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  {
    id: 5,
    title: "Open Talk Circle",
    category: "Discussion",
    date: "May 17, 2024",
    video: "/comm_2_video.mp4",
    attendees: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    ],
    extraAttendees: 9,
    span: "col-span-1 md:col-span-2 lg:col-span-2",
  },
  {
    id: 6,
    title: "Design Thinking 101",
    category: "Guest Session",
    date: "May 15, 2024",
    image: "/comm_3.png",
    video: "/comm_4_video.mp4",
    attendees: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
    ],
    extraAttendees: 7,
    span: "col-span-1 md:col-span-1 lg:col-span-1",
  },
];

export default function CommunityPage() {
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [activeTab, setActiveTab] = useState("All");

  const loadMore = () => {
    setVisiblePosts((prev) => Math.min(prev + 6, MOCK_MOMENTS.length));
  };

  const tabs = [
    { name: "All", icon: <LayoutGrid className="w-4 h-4 mr-2" /> },
    { name: "Demo Session", icon: <Calendar className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      <Navbar className="w-full bg-white border-b border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] sticky top-0 shrink-0 z-50" />

      <main className="flex-1 w-full flex flex-col items-center pb-20">
        {/* Header Section */}
        <section className="pt-20 pb-12 w-full flex flex-col items-center text-center px-6">
          <div className="flex items-center text-sm font-semibold text-[#5a5a5a] mb-4 uppercase tracking-wider">
            <Users className="w-4 h-4 mr-2 text-[#014AAC]" />
            OUR COMMUNITY
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Community Moments
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Real moments. Real people. Real connections.
          </p>
        </section>

        {/* Filters */}
        <div className="w-full max-w-7xl px-6 mb-12 flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2 bg-white p-1.5 rounded-full shadow-sm border border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`relative flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${activeTab === tab.name
                  ? "text-white"
                  : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {activeTab === tab.name && (
                  <motion.div
                    layoutId="community-active-tab"
                    className="absolute inset-0 bg-[#014AAC] rounded-full shadow-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center">
                  {activeTab === tab.name ? (
                    tab.icon
                  ) : (
                    <span className="text-gray-400">{tab.icon}</span>
                  )}
                  {tab.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Sessions Section */}
        <div className="w-full max-w-7xl px-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-1">
                <Users className="w-6 h-6 mr-3 text-[#014AAC]" />
                Sessions
              </h2>
              <p className="text-sm text-gray-500 ml-9">
                Highlights from our recent sessions
              </p>
            </div>

            <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button className="flex items-center px-4 py-2 bg-white text-[#014AAC] rounded-lg shadow-sm text-sm font-medium border border-[#014AAC]/10">
                <LayoutGrid className="w-4 h-4 mr-2" />
                Masonry
              </button>
              <button className="flex items-center px-4 py-2 text-gray-500 hover:text-gray-900 rounded-lg text-sm font-medium transition-colors">
                <List className="w-4 h-4 mr-2" />
                List view
              </button>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]">
            {MOCK_MOMENTS.slice(0, visiblePosts).map((moment) => (
              <div
                key={moment.id}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${moment.span}`}
                onMouseEnter={(e) => {
                  if (moment.image && moment.video) {
                    const video = e.currentTarget.querySelector('video');
                    if (video) video.play();
                  }
                }}
                onMouseLeave={(e) => {
                  if (moment.image && moment.video) {
                    const video = e.currentTarget.querySelector('video');
                    if (video) {
                      video.pause();
                      video.currentTime = 0;
                    }
                  }
                }}
              >
                {moment.image && (
                  <Image
                    src={moment.image}
                    alt={moment.title}
                    fill
                    priority={moment.id <= 4}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className={`object-cover transition-transform duration-700 ${moment.video ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
                  />
                )}
                {moment.video && (
                  <video
                    src={moment.video}
                    loop
                    muted
                    playsInline
                    preload={moment.image ? "none" : "auto"}
                    autoPlay={!moment.image}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${moment.image ? 'opacity-0 group-hover:opacity-100' : 'opacity-100 group-hover:scale-105 transition-transform'}`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-start">
                    <span className="px-3 py-1 bg-[#014AAC]/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {moment.category}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-white text-xl font-bold mb-1 drop-shadow-md">
                      {moment.title}
                    </h3>
                    <span className="text-white/80 text-sm font-medium drop-shadow-sm">
                      {moment.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visiblePosts < MOCK_MOMENTS.length && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={loadMore}
                className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-full text-sm hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm flex items-center"
              >
                Load More
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full py-8 text-center text-gray-500 text-sm border-t border-gray-200 mt-auto bg-white">
        &copy; {new Date().getFullYear()} PocketEd. All rights reserved.
      </footer>
    </div>
  );
}
