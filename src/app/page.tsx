'use client';

import { useAuth } from "@/contexts/AuthContext";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-lg text-gray-600">Loading ReMagik...</div>
      </div>
    );
  }

  return <LandingPage />;
}
