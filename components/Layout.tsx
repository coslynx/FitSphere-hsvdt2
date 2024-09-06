import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';
import { useStore } from '@/app/store';
import { getGoals } from '@/app/utils/api';
import { useEffect } from 'react';

export const metadata: Metadata = {
  title: 'FitSphere',
  description: 'Track your fitness goals and connect with others!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchGoals = useStore((state) => state.fetchGoals);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const goals = await getGoals();
        fetchGoals(goals);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}