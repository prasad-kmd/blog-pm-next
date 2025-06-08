import Layout from '@/components/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <div className="py-8 px-4 md:px-0">
        <h1 className="text-3xl font-bold mb-6 text-center">About PrasadM&apos;s Blog</h1>
        <div className="max-w-2xl mx-auto text-gray-700 space-y-4">
          <p>
            Welcome to PrasadM&apos;s Blog, a dedicated space for individuals passionate about engineering,
            with a special focus on Mechanical and Mechatronics Engineering.
          </p>
          <p>
            Our mission is to share educational and inspiring content that not only enlightens
            but also empowers engineers at all stages of their careers. Whether you&apos;re a student
            just starting, a professional looking to deepen your knowledge, or an enthusiast
            curious about the latest advancements, you&apos;ll find valuable insights here.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-3">What We Cover</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>In-depth articles on core engineering principles.</li>
            <li>Tutorials and practical guides on relevant tools and technologies.</li>
            <li>Case studies of innovative projects and solutions.</li>
            <li>Discussions on industry trends and future outlooks.</li>
            <li>Career advice and inspirational stories from the field.</li>
          </ul>
          <p>
            This blog aims to be a hub for learning, discussion, and inspiration. We believe in
            the power of shared knowledge to drive innovation and personal growth within the
            engineering community.
          </p>
          <p>
            Thank you for joining us on this journey!
          </p>
        </div>
      </div>
    </Layout>
  );
}
