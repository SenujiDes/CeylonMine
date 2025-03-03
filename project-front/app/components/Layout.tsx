import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" suppressHydrationWarning>
      {/* Header */}
      <header className="bg-[var(--foreground)] text-[var(--background)] p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            CeylonMine Admin
          </Link>
          <nav className="space-x-4">
            <Link href="/applications" className="hover:opacity-80 transition-opacity">
              Applications
            </Link>
            <Link href="/royalty" className="hover:opacity-80 transition-opacity">
              Royalty
            </Link>
            <Link href="/status" className="hover:opacity-80 transition-opacity">
              Status
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[var(--foreground)] text-[var(--background)] p-4 mt-auto">
        <div className="container mx-auto text-center text-sm opacity-80">
          © {new Date().getFullYear()} CeylonMine. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 