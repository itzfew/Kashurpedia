const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const { title, content, format = 'md' } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const filePath = path.join(process.cwd(), 'posts', `${slug}.${format}`);
    const frontMatter = `---
title: "${title}"
date: "${new Date().toISOString()}"
categories: []
---
${content}`;

    await fs.writeFile(filePath, frontMatter);
    res.status(200).json({ message: 'Post created', slug });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post', details: error.message });
  }
});

module.exports = app;
