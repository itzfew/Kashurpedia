const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');
const marked = require('marked');
const hljs = require('highlight.js');

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
  const files = await fs.readdir(postsDir);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.md') || file.endsWith('.html'))
      .map(async (file) => {
        const filePath = path.join(postsDir, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        const slug = file.replace(/\.(md|html)$/, '');
        return {
          slug,
          title: data.title || slug.replace(/-/g, ' '),
          date: data.date || new Date().toISOString(),
          categories: data.categories || [],
          content: file.endsWith('.md') ? marked(content) : content,
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
    return {
      slug,
      title: data.title || slug.replace(/-/g, ' '),
      date: data.date || new Date().toISOString(),
      categories: data.categories || [],
      content: marked(content),
    };
  } catch (error) {
    return null;
  }
}

module.exports = { getAllPosts, getPostBySlug };
