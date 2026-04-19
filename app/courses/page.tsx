import dynamic from "next/dynamic";

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
        <main className="min-h-screen w-full">
            <Courses />
        </main>
    );
}