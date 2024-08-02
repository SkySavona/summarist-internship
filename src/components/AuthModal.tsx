import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  getRedirectResult,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FaGoogle, FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          window.location.href = "https://summarist.vercel.app/for-you";
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    handleRedirectResult();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "signup") {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      window.location.href = "https://summarist.vercel.app/for-you";
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      window.location.href = "https://summarist.vercel.app/for-you";
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        return;
      }
      setError(error.message);
    }
  };

  const handleGuestLogin = () => {
    signInWithEmailAndPassword(auth, "guest@gmail.com", "guest123")
      .then(() => {
        window.location.href = "https://summarist.vercel.app/for-you";
      })
      .catch((error) => setError(error.message));
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <IoMdClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === "login" ? "Login to Summarist" : "Sign up for Summarist"}
        </h2>
        <div className="space-y-4">
          {mode === "login" ? (
            <>
              <button
                onClick={handleGuestLogin}
                className="w-full bg-[#032b41] text-white py-3 rounded-md flex items-center justify-center transition-colors duration-200 hover:bg-slate-600"
              >
                <FaUser className="mr-2" /> Login as a Guest
              </button>
              <button
                onClick={handleGoogleAuth}
                className="w-full bg-[#032b41] border-gray-300 text-white py-3 rounded-md hover:bg-slate-600 duration-200 flex items-center justify-center transition-colors"
              >
                <FaGoogle className="mr-2" /> Login with Google
              </button>
            </>
          ) : (
            <button
              onClick={handleGoogleAuth}
              className="w-full bg-[#032b41] border-gray-300 text-white py-3 rounded-md hover:bg-slate-600 duration-200 flex items-center justify-center transition-colors"
            >
              <FaGoogle className="mr-2" /> Sign up with Google
            </button>
          )}
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 bg-white">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address *"
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password *"
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {mode === "signup" && (
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password *"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-green-500 text-[#032b41] py-3 rounded-md hover:bg-green-600 transition-colors duration-200"
            >
              {mode === "login" ? "Login" : "Sign Up"}
            </button>
          </form>
          {mode === "login" && (
            <p className="text-center text-sm">
              <button
                onClick={() => setMode("forgot")}
                className="text-green-500 hover:underline"
              >
                Forgot your password?
              </button>
            </p>
          )}
          <p className="text-center text-sm text-gray-600">
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={toggleMode}
              className="text-green-500 hover:underline"
            >
              {mode === "login" ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;