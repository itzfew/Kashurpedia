import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { getAllPosts } from '../lib/posts';

export default function Home({ posts }) {
  return (
    <Layout>
      <div className="prose max-w-none">
        <h1>Welcome to Kashurpedia</h1>
        <p>A community-driven encyclopedia for Kashmiri villages and culture.</p>
        {posts.length === 0 ? (
          <p>No posts available. Create a new post to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  return { props: { posts } };
}
