import { Suspense } from "react";
import BlogList from "../../components/BlogList";
import { fetchSubstackPosts } from "../../lib/substack";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import Link from "next/link";

// Using Node fetching implies server side
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await fetchSubstackPosts("siddharthgadhia.substack.com", 15);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar className="w-full bg-white border-b border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] sticky top-0" />

      <main className="flex-1 w-full bg-gray-50">
         {/* Render the Blog List properly separated out  */}
        <Suspense fallback={
          <div className="flex justify-center items-center h-64 w-full">
            <div className="w-8 h-8 rounded-full border-4 border-[var(--primary-yellow)] border-t-[var(--primary-blue)] animate-spin"></div>
          </div>
        }>
          <BlogList posts={posts} />
        </Suspense>
      </main>

      <footer className="w-full py-8 text-center text-gray-500 text-sm border-t border-gray-200 mt-auto bg-white">
        &copy; {new Date().getFullYear()} PocketEd. All rights reserved.
      </footer>
    </div>
  );
}
