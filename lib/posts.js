import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js';

// Configure marked with highlight.js
marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return code;
  },
});

async function getAllPosts() {
  const postsDir = path.join(process.cwd(), 'posts');
  let files;
  try {
    files = await fs.readdir(postsDir);
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.md') || file.endsWith('.html'))
      .map(async (file) => {
        const filePath = path.join(postsDir, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        const slug = file.replace(/\.(md|html)$/, '');
        // Ensure date is a string
        const date = data.date instanceof Date ? data.date.toISOString() : data.date || new Date().toISOString();
        return {
          slug,
          title: data.title || slug.replace(/-/g, ' '),
          date, // Stringified date
          categories: data.categories || [],
          content: file.endsWith('.md') ? marked.parse(content) : content,
        };
      })
  );

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

async function getPostBySlug(slug) {
  const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    // Ensure date is a string
    const date = data.date instanceof Date ? data.date.toISOString() : data.date || new Date().toISOString();
    return {
      slug,
      title: data.title || slug.replace(/-/g, ' '),
      date, // Stringified date
      categories: data.categories || [],
      content: marked.parse(content),
    };
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
}

export { getAllPosts, getPostBySlug };
