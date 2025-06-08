import Layout from '@/components/Layout';
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts'; // Adjust path if necessary based on tsconfig

// Define a type for the post data we expect from getSortedPostsData for this page
// Note: getSortedPostsData currently doesn't return contentHtml, which is fine for the list page.
type PostSummary = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  author?: string;
};

export default function BlogListPage() {
  const posts: PostSummary[] = getSortedPostsData();

  return (
    <Layout>
      <div className="py-8 px-4 md:px-0">
        <h1 className="text-3xl font-bold mb-10 text-center">Blog Posts</h1>
        <div className="max-w-3xl mx-auto space-y-8">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No blog posts found. Check back soon!</p>
          ) : (
            posts.map(({ slug, title, date, excerpt, author }) => (
              <article key={slug} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <header>
                  <h2 className="text-2xl font-semibold mb-2">
                    <Link href={`/blog/${slug}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                      {title}
                    </Link>
                  </h2>
                  <div className="text-sm text-gray-500 mb-3">
                    <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    {author && <span className="mx-2">|</span>}
                    {author && <span>By {author}</span>}
                  </div>
                </header>
                {excerpt && (
                  <p className="text-gray-700 leading-relaxed">
                    {excerpt}
                  </p>
                )}
                <div className="mt-4">
                  <Link href={`/blog/${slug}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    Read more &rarr;
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

// Revalidate this page at most once per minute.
// This is optional and depends on how fresh you want the data.
// For a small blog with posts in git, this might not be strictly necessary
// if you rebuild on push, but good for demonstration.
// export const revalidate = 60;
