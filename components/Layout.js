import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold">Kashurpedia</h1>
          </Link>
          <SearchBar />
        </div>
      </header>
      <div className="container mx-auto flex mt-4">
        <aside className="w-1/4 bg-white p-4 shadow mr-4">
          <h2 className="font-bold mb-2">Navigation</h2>
          <ul>
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li><Link href="/categories" className="text-blue-600 hover:underline">Categories</Link></li>
            <li><Link href="/about" className="text-blue-600 hover:underline">About</Link></li>
          </ul>
        </aside>
        <main className="w-3/4 bg-white p-6 shadow">{children}</main>
      </div>
    </div>
  );
}
