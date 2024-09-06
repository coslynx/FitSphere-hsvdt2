import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useStore } from '@/app/store';
import { getUser } from '@/app/utils/api';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const fetchUser = useStore((state) => state.fetchUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user?.email) {
          const fetchedUser = await getUser(session.user.email);
          fetchUser(fetchedUser);
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            FitSphere
          </Link>
          <div className="flex items-center space-x-6">
            {session ? (
              <>
                <div className="flex items-center space-x-2">
                  <img
                    src={user?.profilePicture || '/profile.png'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-800 font-medium">
                    {user?.username || session.user.name}
                  </span>
                </div>
                <Link href="/dashboard" className="text-gray-800 font-medium">
                  Dashboard
                </Link>
                <Link href="/api/auth/signout" className="text-gray-800 font-medium">
                  Logout
                </Link>
              </>
            ) : (
              <Link href="/login" className="text-gray-800 font-medium">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;