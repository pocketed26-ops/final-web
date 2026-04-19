import Image from "next/image";
import { SubstackPost } from "../lib/substack";
import BlogEntryHeader from "./BlogEntryHeader";

export default function BlogList({ posts }: { posts: SubstackPost[] }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800">No posts found</h2>
        <p className="text-gray-500 mt-2">Check back later for more updates.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <BlogEntryHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative h-56 md:h-64 w-full overflow-hidden bg-gray-100">
              {post.cover_image ? (
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-yellow-50">
                  <span className="text-[var(--primary-blue)] font-bold text-xl opacity-50">PocketEd</span>
                </div>
              )}
            </div>

            <div className="flex flex-col flex-grow p-6 sm:p-8">
              <time className="text-sm font-semibold text-[var(--primary-yellow)] uppercase tracking-wider mb-3">
                {new Date(post.post_date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
              
              <h2 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-gray-900 mb-4 line-clamp-2">
                {post.title}
              </h2>

              <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-3">
                {post.description}
              </p>

              <div className="mt-auto">
                <a 
                  href={post.canonical_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-bold text-[var(--primary-blue)] hover:text-[#013b8a] transition-colors group"
                >
                  Read More
                  <svg 
                    className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
