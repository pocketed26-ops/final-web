import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";

const Courses = dynamic(() =>
    import("@/components/layout/sections/courses/page").then((mod) => mod.Courses),
    {
        ssr: true, // Optional: keeping SSR enabled by default
        loading: () => (
            <div className="min-h-screen w-full flex items-center justify-center">
                <div className="animate-pulse text-2xl font-bold text-primary">Loading Courses...</div>
            </div>
        ),
    }
);

export default function CoursesPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar className="w-full bg-white border-b border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] sticky top-0 shrink-0 z-50" />
            
            <main className="flex-1 w-full">
                <Courses />
            </main>

            <footer className="w-full py-8 text-center text-gray-500 text-sm border-t border-gray-200 mt-auto bg-white">
                &copy; {new Date().getFullYear()} PocketEd. All rights reserved.
            </footer>
        </div>
    );
}
