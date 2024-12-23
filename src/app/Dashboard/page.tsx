"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import zerodhaOperations from "@/services/zerodha";

interface Tab {
  id: number;
  label: string;
  content: string;
}

const tabs: Tab[] = [
  { id: 1, label: "Overview", content: "Overview content..." },
  { id: 2, label: "Settings", content: "Here you can update your settings." },
  { id: 3, label: "Analytics", content: "Check out your analytics data here." },
];

function DashboardContent() {
  const searchParams = useSearchParams();
  const requestToken = searchParams.get("request_token");
  const [activeTab, setActiveTab] = useState<number>(1);
  const [requestTokenState, setRequestTokenState] = useState<string | null>(null);
  const [isLoginInitiated, setIsLoginInitiated] = useState<boolean>(false);

  useEffect(() => {
    if (requestToken) {
      localStorage.setItem("requestToken", requestToken);
      setRequestTokenState(requestToken);

      const fetchAccessToken = async () => {
        try {
          const access = await zerodhaOperations.fetchAccessToken(requestToken);
          localStorage.setItem("accessToken", JSON.stringify(access.data.accessToken));
        } catch (error) {
          console.error("Error fetching access token:", error);
        }
      };

      fetchAccessToken();
    }
  }, [requestToken]);

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/zerodha/login");
      const { loginUrl } = await response.json();

      if (loginUrl) {
        setIsLoginInitiated(true);
        window.location.href = loginUrl;
      } else {
        console.error("Login URL not found");
      }
    } catch (error) {
      console.error("Error fetching login URL:", error);
    }
  };

  const handleAuthenticate = async () => {
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

  const handleFetch = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("No access token found in local storage");
        return;
      }

      const response = await fetch("/api/zerodha/fetchSymbols", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_token: accessToken,
          type: "EQ",
          exchange: "NSE",
        }),
      });

      const data = await response.json();
      console.log("Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
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

          <p>{requestTokenState}</p>
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
          <button
            className="bg-gray-800 text-white rounded-full px-8 py-3 hover:bg-gray-700 transition mt-5"
            onClick={handleFetch}
          >
            Fetch Data
          </button>
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