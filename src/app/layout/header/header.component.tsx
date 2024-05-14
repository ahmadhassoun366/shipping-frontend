import Link from "next/link";

export default function HeaderComponent() {
  return (
    <header className="border-b-2 bg-neutral-800">
      <nav className=" text-white p-8">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex  justify-center items-center gap-2">
            <i className="fa-regular fa-truck-ramp-couch fa-2xl"></i>
            <h1 className="text-4xl font-bold">
              <span className="text-red-500 text-4xl font-bold">UN</span>PACK
            </h1>
          </Link>
          <div className="flex items-center">
            <Link href="/">
              <h1 className="px-4 py-2 hover:bg-gray-700 rounded">HOME</h1>
            </Link>
            <Link href="/about">
              <h1 className="px-4 py-2 hover:bg-gray-700 rounded">ABOUT US</h1>
            </Link>
            <Link href="/service">
              <h1 className="px-4 py-2 hover:bg-gray-700 rounded">SERVICE</h1>
            </Link>
            {/* Dropdown functionality would require custom JS or a dedicated component */}
            <div className="relative group">
              <button className="px-4 py-2 hover:bg-gray-700 rounded inline-flex items-center">
                FEATURES
              </button>
              <div className="absolute hidden bg-white text-gray-900 group-hover:block">
                <Link href="/feature1">
                  <h1 className="px-4 py-2 block hover:bg-gray-100">
                    Feature 1
                  </h1>
                </Link>
                <Link href="/feature2">
                  <h1 className="px-4 py-2 block hover:bg-gray-100">
                    Feature 2
                  </h1>
                </Link>
                <Link href="/feature3">
                  <h1 className="px-4 py-2 block hover:bg-gray-100">
                    Feature 3
                  </h1>
                </Link>
              </div>
            </div>
            <Link href="/blog">
              <h1 className="px-4 py-2 hover:bg-gray-700 rounded">BLOG</h1>
            </Link>
            <Link href="/signin">
              <h1 className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-colors">
                Sign in
              </h1>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
