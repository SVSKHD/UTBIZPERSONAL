"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use the correct router import for Next.js 13+
import { googleLogin } from "@/utils/auth"; // Ensure this path is correct
import Image from "next/image";

interface User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const loggedInUser = await googleLogin();
      setUser({
        displayName: loggedInUser.displayName,
        email: loggedInUser.email,
        photoURL: loggedInUser.photoURL,
      });
      router.push("/Dashboard");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-8 w-full max-w-md">
        {/* H1 Title */}
        <h1 className="text-4xl sm:text-6xl font-bold text-center w-full">
          <span className="text-orange-500">U</span>TBIZ
        </h1>

        {/* Display user info if logged in */}
        {user ? (
          <div className="text-center">
            <Image
  src={user.photoURL || ""}
  alt={user.displayName || "User"}
  width={64} // Adjust the size as needed
  height={64}
  className="rounded-full mx-auto mb-2"
/>
            <p className="text-lg font-semibold">{user.displayName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        ) : (
          <p className="text-gray-500">Not signed in</p>
        )}

        {/* Google Button */}
        {!user ? (
          <>
   <button
   className="rounded-full border border-solid border-gray-300 dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-orange-100 dark:hover:bg-orange-900 hover:border-transparent text-sm sm:text-base h-12 px-6 w-full max-w-md gap-2"
   onClick={handleLogin}
 >
  <Image
  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
  alt="Google Icon"
  width={20} // Adjust the size as needed
  height={20}
/>
   <span>Sign in with Google</span>
 </button>
 </>
        ):(
          <>
<button className="rounded-full border border-solid border-gray-300 dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-orange-100 dark:hover:bg-orange-900 hover:border-transparent text-sm sm:text-base h-12 px-6 w-full max-w-md gap-2">
  Move to Dashboard
</button>
</>
        )}
     
      </main>
    </div>
  );
}