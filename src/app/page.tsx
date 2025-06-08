import Layout from '@/components/Layout'; // Assuming @ is configured for src

export default function HomePage() {
  return (
    <Layout>
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to PrasadM&apos;s Blog!</h1>
        <p className="text-lg text-gray-700 mb-8">
          Sharing educational and inspiring content for mechanical and mechatronics engineers.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
          {/* Placeholder for recent posts */}
          <div className="border border-gray-200 p-4 rounded-lg">
            <p className="text-gray-500">Recent blog posts will appear here soon. Stay tuned!</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
