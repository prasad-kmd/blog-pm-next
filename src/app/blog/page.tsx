import Layout from '@/components/Layout';

export default function BlogListPage() {
  return (
    <Layout>
      <div className="py-8 px-4 md:px-0">
        <h1 className="text-3xl font-bold mb-8 text-center">Blog Posts</h1>
        <div className="max-w-3xl mx-auto">
          {/* Placeholder for blog post listing */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-lg">
              Our latest articles and insights will appear here soon.
            </p>
            <p className="text-gray-500 mt-2">
              We're working on bringing you engaging content related to mechanical and
              mechatronics engineering. Check back later!
            </p>
            {/* Example of how a post item might look (very basic) */}
            <div className="mt-8 border-t pt-6 text-left">
              <h2 className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer">Sample Post Title</h2>
              <p className="text-sm text-gray-500 mt-1">Date | Category</p>
              <p className="text-gray-700 mt-2">This is a brief excerpt of a sample blog post to give an idea of the layout...</p>
            </div>
            <div className="mt-6 border-t pt-6 text-left">
              <h2 className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer">Another Interesting Article</h2>
              <p className="text-sm text-gray-500 mt-1">Date | Category</p>
              <p className="text-gray-700 mt-2">A short summary of what this other article will be about. Engineering is fascinating!</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
