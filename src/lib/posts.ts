import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), '_posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  author?: string;
  coverImage?: string;
  contentHtml: string;
  [key: string]: unknown; // Allow other frontmatter fields, safer than any
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /_posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md')) // Filter for markdown files
    .map((fileName) => {
      // Remove ".mdx" or ".md" from file name to get slug
      const slug = fileName.replace(/\.(mdx|md)$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug (contentHtml will be added later if needed for list view, or fetched individually)
      return {
        slug,
        ...(matterResult.data as { title: string; date: string; excerpt?: string; author?: string; coverImage?: string }),
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.(mdx|md)$/, ''),
        },
      };
    });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`); // Assume .mdx, can be adapted for .md too
  let fileContents;
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    // If .mdx not found, try .md
    const mdFullPath = path.join(postsDirectory, `${slug}.md`);
    try {
      fileContents = fs.readFileSync(mdFullPath, 'utf8');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_mdErr) {
      // If neither found, rethrow or handle as 404
      throw new Error(`Post with slug "${slug}" not found.`);
    }
  }


  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    ...(matterResult.data as { title: string; date: string; excerpt?: string; author?: string; coverImage?: string }),
  };
}
