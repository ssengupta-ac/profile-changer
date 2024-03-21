import ProfileForm from '../components/ProfileForm'; // Adjust path as necessary
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Mock authentication check function
// Replace this with your actual authentication logic
const isAuthenticated = () => {
  // Example: Check if a user token exists
  return localStorage.getItem("userToken") ? true : false;
};

const ProfilePage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("userToken");
    if (!email) {
      // If no email is stored, user is not logged in or something went wrong
      router.push('/'); // Adjust as necessary for your login route
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3001/profile?email=${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include any other headers your backend needs
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data); // Set the profile data to state
        } else {
          throw new Error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Handle error, maybe redirect to login
        router.push('/');
      }
    };

    fetchProfile();
    
    if (isAuthenticated()) {
      setLoggedIn(true);
    }
  }, [router]);

  const handleLogout = () => {
    // Perform logout operations like clearing the token or session
    localStorage.removeItem("userToken"); // Example: Clear user token. Adjust according to your auth method.
    router.push('/');
  };

  if (!profile) {
    return <div>Loading...</div>; // Adjust loading state as needed
  }

  if (!loggedIn) {
    return (
      <div className="text-center my-20">
        <p className="text-red-500 text-xl">You must be logged in to view this page.</p>
        <Link href="/" className="text-blue-500 underline">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        <button onClick={handleLogout} className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded-md">
          Logout
        </button>
      </div>
      <ProfileForm profile={profile} />
    </div>
  );
};

export default ProfilePage;
