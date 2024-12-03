"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface Tab {
  id: number;
  label: string;
  content: string;
}

const tabs: Tab[] = [
  {
    id: 1,
    label: "Overview",
    content: "Overview content...",
  },
  { id: 2, label: "Settings", content: "Here you can update your settings." },
  { id: 3, label: "Analytics", content: "Check out your analytics data here." },
];

function DashboardContent() {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const requestToken = searchParams.get("request_token");
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isLoginInitiated, setIsLoginInitiated] = useState<boolean>(false);

  useEffect(() => {
    if (requestToken) {
      console.log("Request Token:", requestToken);
    }
  }, [requestToken]);

  const handleLogin = async (): Promise<void> => {
    setIsLoginInitiated(true);
    try {
      const response = await fetch("/api/zerodha/login", {
        method: "GET",
      });
      const { loginUrl } = await response.json();

      if (loginUrl) {
        window.location.href = loginUrl;
      } else {
        console.error("Login URL not found");
      }
    } catch (error) {
      console.error("Error fetching login URL:", error);
    }
  };

  const handleAuthenticate = async (): Promise<void> => {
    if (!requestToken) {
      console.error("No request token found in the query");
      return;
    }

    try {
      const response = await fetch("/api/zerodha/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestToken }),
      });

      const data = await response.json();
      if (data.accessToken) {
        console.log("Authentication successful. Access Token:", data.accessToken);
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <>
      {/* Tabs Navigation */}
      <nav className="flex justify-center gap-4 p-4 bg-black border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-full ${
              activeTab === tab.id
                ? "bg-orange-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            } transition`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <main className="flex-grow flex flex-col items-start justify-start bg-black">
        <div className="max-w-4xl w-full p-6 border border-gray-700 rounded-md bg-black mt-6 mx-auto">
          <h2 className="text-2xl font-bold text-orange-500 sm:truncate sm:text-3xl sm:tracking-tight">
            {tabs.find((tab) => tab.id === activeTab)?.label}
          </h2>
          <p className="text-lg text-gray-300 mt-5">
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </p>
          <button
            className="bg-orange-500 text-white rounded-full px-8 py-3 hover:bg-orange-600 transition mt-5"
            onClick={handleLogin}
          >
            Login
          </button>
          {isLoginInitiated && (
            <button
              className="bg-orange-500 text-white rounded-full px-8 py-3 hover:bg-orange-600 transition mt-5"
              onClick={handleAuthenticate}
            >
              Authenticate
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans">
      {/* Header */}
      <header className="p-6 border-b border-black bg-black">
        <h1 className="text-3xl font-bold text-center sm:text-left">
          <span className="text-orange-500">U</span>TBIZ Dashboard
        </h1>
      </header>

      <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
        <DashboardContent />
      </Suspense>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-500 border-t border-gray-700 bg-black">
        <p>
          © {new Date().getFullYear()} <span className="text-orange-500">UTBIZ</span>. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}