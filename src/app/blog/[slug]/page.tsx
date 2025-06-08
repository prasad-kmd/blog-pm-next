import Layout from '@/components/Layout';
import Image from 'next/image';
import { getAllPostSlugs, getPostData, PostData } from '@/lib/posts'; // Adjust path if necessary
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Define the Props interface for the main page component
interface Props {
  params: { slug: string };
  // searchParams?: { [key: string]: string | string[] | undefined }; // Include if searchParams are ever used
}

// Define a separate type for generateMetadata's parameters
type GenerateMetadataProps = {
  params: { slug: string };
  // searchParams?: { [key: string]: string | string[] | undefined }; // Add if searchParams are used in metadata generation
};


// This function is needed for Next.js to know which slugs to pre-render at build time.
// In App Router, this is how you generate static paths.
export async function generateStaticParams() {
  const paths = getAllPostSlugs(); // This returns an array like [{ params: { slug: '...' } }, ...]
  return paths.map(p => ({ slug: p.params.slug })); // We need to return [{ slug: '...' }]
}

// This function generates metadata for the page (title, description for SEO)
// Using the new GenerateMetadataProps type
export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  try {
    const post = await getPostData(params.slug);
    return {
      title: post.title,
      description: post.excerpt || 'A post from PrasadM Blog', // Fallback description
      // openGraph: { // Example for social media sharing
      //   title: post.title,
      //   description: post.excerpt,
      //   images: post.coverImage ? [{ url: post.coverImage }] : [],
      // },
    };
  } catch {
    // Post not found, metadata can reflect that or be generic
    return {
      title: 'Post Not Found',
      description: 'This post could not be found.',
    };
  }
}

export default async function PostPage({ params }: Props) {
  let post: PostData;
  try {
    post = await getPostData(params.slug);
  } catch {
    // If getPostData throws (e.g., file not found), trigger a 404 page.
    notFound();
  }

  return (
    <Layout>
      <article className="max-w-3xl mx-auto py-8 px-4 md:px-0">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{post.title}</h1>
          <div className="text-sm text-gray-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            {post.author && <span className="mx-2">|</span>}
            {post.author && <span>By {post.author}</span>}
          </div>
          {post.coverImage && (
            <div className="mt-6 w-full rounded-lg shadow-md overflow-hidden" style={{ maxHeight: '400px' }}> {/* Container for aspect ratio and max height */}
              <Image
                src={post.coverImage}
                alt={`${post.title} cover image`}
                width={700}  // Intrinsic width of the image file (or desired render width)
                height={350} // Intrinsic height of the image file (or desired render height)
                className="object-cover w-full h-full" // Make image fill the container while maintaining aspect ratio
              />
            </div>
          )}
        </header>

        {/* Render the HTML content from Markdown */}
        {/* We'll apply prose styling in the next step */}
        <div
          className="prose lg:prose-xl max-w-none" // Placeholder for prose styling
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Consider adding tags, categories, or social share buttons here later */}
      </article>
    </Layout>
  );
}

// Revalidate this page at most once per minute (optional)
// export const revalidate = 60;
