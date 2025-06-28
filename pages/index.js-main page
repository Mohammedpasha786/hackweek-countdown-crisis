import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import COSCInfo from '../components/COSCInfo';
import ErrorBoundary from '../components/ErrorBoundary';

// Dynamically import CountdownTimer to prevent SSR hydration issues
const CountdownTimer = dynamic(() => import('../components/CountdownTimer'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-gray-200 h-32 rounded-lg flex items-center justify-center">
      <span className="text-gray-500">Loading countdown...</span>
    </div>
  )
});

export default function Home({ coscData, config }) {
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering client-specific content
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>{config?.eventName || 'COSC Hackweek Countdown'}</title>
        <meta 
          name="description" 
          content={config?.eventDescription || 'Live countdown to COSC Hackweek event'} 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={config?.eventName || 'COSC Hackweek Countdown'} />
        <meta property="og:description" content={config?.eventDescription || 'Live countdown to COSC Hackweek event'} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ErrorBoundary>
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                {config?.eventName || 'COSC Hackweek'}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {config?.eventDescription || 'Join us for an exciting week of coding, learning, and innovation'}
              </p>
            </header>

            {/* Countdown Timer */}
            <section className="mb-16" aria-label="Event countdown">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-700 mb-8">
                  Time Remaining
                </h2>
                {mounted && config?.hackweekEndDate ? (
                  <CountdownTimer targetDate={config.hackweekEndDate} />
                ) : (
                  <div className="animate-pulse bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Loading countdown...</span>
                  </div>
                )}
              </div>
            </section>

            {/* COSC Information */}
            <section aria-label="COSC Information">
              <COSCInfo data={coscData} />
            </section>

            {/* Footer */}
            <footer className="text-center mt-16 py-8 border-t border-gray-200">
              <p className="text-gray-600">
                Made with ❤️ by{' '}
                <a 
                  href="https://cbitosc.github.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  CBIT Open Source Community
                </a>
              </p>
            </footer>
          </div>
        </main>
      </ErrorBoundary>
    </>
  );
}

// Server-side data fetching with error handling
export async function getStaticProps() {
  try {
    // Load COSC data
    const coscData = await import('../data/cosc-info.json').then(module => module.default);
    
    // Load configuration
    const config = await import('../data/config.json').then(module => module.default);

    return {
      props: {
        coscData: coscData || null,
        config: config || null,
      },
      // Revalidate every hour in case data changes
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error loading data:', error);
    
    // Return fallback data
    return {
      props: {
        coscData: null,
        config: {
          hackweekEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
          eventName: 'COSC Hackweek',
          eventDescription: 'CBIT Open Source Community Hackweek'
        },
      },
    };
  }
}
