"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useUserAuth } from "./_utils/auth-context";
import { FaGithub } from "react-icons/fa"; // Importing GitHub icon from react-icons

const UserAuthComponent = () => {
  // Use the useUserAuth hook to get the user object and the login and logout functions
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Trigger GitHub authentication when button is clicked
  const handleGitHubSignIn = async () => {
    try {
      // Sign in to Firebase with GitHub authentication
      await gitHubSignIn();
      setIsAuthenticated(true);
    } catch (error) {
      console.error("GitHub sign-in error:", error);
    }
  };

  // Sign out user when needed (optional)
  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="w-full max-w-sm p-8 bg-gray-400 shadow-xl rounded-xl border py-32">
          <p className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Login
          </p>
          {/* Button for GitHub sign-in */}
          <button
            onClick={handleGitHubSignIn}
            className="flex items-center justify-center w-full px-6 py-3 bg-gray-800 text-white rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300"
          >
            <FaGithub className="mr-2 text-xl" /> Sign in with GitHub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-sm p-8 bg-gray-400 shadow-xl rounded-xl py-20">
        <p className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Welcome, {user.displayName}
        </p>
        <p className="text-center text-gray-800 mb-6">{user.email}</p>
        {/* Button to sign out */}
        <button
          onClick={handleSignOut}
          className="w-full px-6 py-3 mb-6 bg-gray-800 text-white rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300"
        >
          Sign out
        </button>
        <Link href="/week-9/shopping-list">
          <button className="w-full px-6 py-3 bg-gray-800 text-white rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300">
            Go to Shopping List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserAuthComponent;
