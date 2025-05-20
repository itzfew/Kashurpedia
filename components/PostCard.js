import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-xl font-semibold">{post.title}</h2>
      </Link>
      <p className="text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
      <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
    </div>
  );
}
