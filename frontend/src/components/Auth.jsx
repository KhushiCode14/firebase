import { addDoc, collection } from "firebase/firestore";
import React, { useRef, useState, useEffect } from "react";
import { firestore, logout, signInWithGoogle } from "../firebase";
import {
  Sun,
  Moon,
  LogIn,
  UserPlus,
  User,
  Mail,
  Lock,
  LogOut,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [success, setSuccess] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  const registerRef = collection(firestore, "register");
  const loginRef = collection(firestore, "login");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleGoogleSignIn = async () => {
    const userData = await signInWithGoogle();
    setUser(userData);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const toggleForm = () => setIsRegister(!isRegister);
  const toggleTheme = () => setDarkMode(!darkMode);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await addDoc(registerRef, {
          email: formData.email,
          password: formData.password,
          username: formData.username,
          timestamp: new Date(),
        });
      } else {
        await addDoc(loginRef, {
          email: formData.email,
          password: formData.password,
          timestamp: new Date(),
        });
      }
      alert(`${isRegister ? "Registered" : "Logged In"} Successfully!`);
      setError(`${isRegister ? "Registered" : "Logged In"} Successfully!`);
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen transition-all duration-300 w-full ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      <div className="relative w-full max-w-md p-8 bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-[10px_10px_30px_rgba(0,0,0,0.2),-10px_-10px_30px_rgba(255,255,255,0.3)] border border-gray-300 dark:border-gray-700 transition-all">
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        <h2 className="text-center text-2xl font-semibold">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400">
          {isRegister ? "Sign up to get started" : "Login to continue"}
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        {!user ? (
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 py-3 mt-4 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition duration-300"
          >
            <FcGoogle size={20} />
            Sign In with Google
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 mt-4 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 transition duration-300"
          >
            <LogOut size={20} />
            Logout
          </button>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          {isRegister && (
            <div className="relative mb-4 flex items-center">
              <User
                className="absolute left-3 text-gray-500 dark:text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                ref={usernameRef}
                onChange={handleInputChange}
                className="w-full pl-10 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-200 border rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <div className="relative mb-4 flex items-center">
            <Mail
              className="absolute left-3 text-gray-500 dark:text-gray-400"
              size={20}
            />
            <input
              type="email"
              ref={emailRef}
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              className="w-full pl-10 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-200 border rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="relative mb-4 flex items-center">
            <Lock
              className="absolute left-3 text-gray-500 dark:text-gray-400"
              size={20}
            />
            <input
              type="password"
              ref={passwordRef}
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              className="w-full pl-10 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-200 border rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 mt-4 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition duration-300"
          >
            {isRegister ? <UserPlus size={20} /> : <LogIn size={20} />}
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <span
            className="text-blue-500 cursor-pointer ml-1"
            onClick={toggleForm}
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
