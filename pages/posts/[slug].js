import Layout from '../../components/Layout';
import { getAllPosts, getPostBySlug } from '../../lib/posts';

export default function Post({ post }) {
  if (!post) {
    return <Layout><div>Post not found</div></Layout>;
  }

  return (
    <Layout>
      <article className="prose max-w-none">
        <h1>{post.title}</h1>
        <p className="text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return {
    paths,
    fallback: false, // 404 for non-existent slugs
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { notFound: true }; // Return 404 for missing posts
  }
  return { props: { post } };
}
