import { SessionProvider } from 'next-auth/react';
import { Metadata } from 'next';
import '@/app/styles/globals.css';
import { captureException, init } from '@sentry/nextjs';
import { Tracing } from '@sentry/tracing';
import type { AppProps } from 'next/app';
import { useStore } from '@/app/store';
import { useEffect } from 'react';

init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Tracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

export const metadata: Metadata = {
  title: 'FitSphere',
  description: 'Track your fitness goals and connect with others!',
};

export default function App({ Component, pageProps }: AppProps) {
  const fetchGoals = useStore((state) => state.fetchGoals);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const goals = await fetch('/api/goals').then((res) => res.json());
        fetchGoals(goals);
      } catch (error) {
        captureException(error);
        console.error('Error fetching goals:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}