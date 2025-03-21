import Link from 'next/link';
import Layout from './components/Layout';

export default function AdminDashboard() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-float">
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Welcome, Admin
          </h1>
          <p className="text-lg text-[var(--foreground)] opacity-80 max-w-2xl mx-auto">
            Manage mining license applications efficiently with our comprehensive dashboard tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'View Applications',
              description: 'Check and review all applications',
              href: '/applications',
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              ),
            },
            {
              title: 'Calculate Royalty',
              description: 'Compute royalty fees based on mining data',
              href: '/royalty',
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
            {
              title: 'Complaints',
              description: 'Manage and resolve user complaints',
              href: '/complaints',
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              ),
            },
            {
              title: 'Users',
              description: 'Manage user accounts',
              href: '/users',
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
            {
              title: 'Contact Responses',
              description: 'View all contact responses',
              href: '/contact',
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
            },
            {
              title: 'Map',
              description: 'Add new mining areas',
              href: '/mapLocations',
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-18h18v18zm-2-2H5v-14h10v14zm2-13.328V6h-2v.672a8 8 0 00-4 6.656v.672m4-6.656v6.656a8 8 0 01-4 6.656v.672m8-11.328V6h-2v.672a8 8 0 00-4 6.656v.672m0 0v6.656a8 8 0 01-4-6.656v-.672M16 16v1a4 4 0 11-8 0v-1" />
                </svg>
              ),
            },
          ].map((card, index) => (
            <Link key={card.href} href={card.href} className="group">
              <div 
                className="card-hover bg-gradient-to-br from-[var(--card-bg)] to-[var(--background)] p-8 rounded-xl"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="mb-4 group-hover:animate-bounce">
                  {card.icon}
                </div>
                <h2 className="text-2xl font-bold text-center mb-3 group-hover:gradient-text">
                  {card.title}
                </h2>
                <p className="text-center opacity-90">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
