'use client';
import Image from "next/image";
import { useState } from "react";
import logo from '@/app/assets/logo.png'
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // בקשת אימות מדומה
    if (email === "user@bakeryavia.com" && password === "password123") {
      const mockToken = "mocked-jwt-token";
      setToken(mockToken);
      alert("התחברת בהצלחה! טוקן: " + mockToken);
    } else {
      alert("פרטי ההתחברות אינם נכונים. נסה שוב.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        {/* לוגו */}
        <div className="flex justify-center mb-6">
          <Image
            src={logo} // עדכן את המסלול ללוגו שלך
            alt="לוגו של מאפיית אביה"
            className="h-16"
            width={300}
            height={300}
          />
        </div>

        <form onSubmit={handleLogin} className="space-y-6 text-right">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              כתובת אימייל
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded-md border-gray-300"
              placeholder="user@gmail.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              סיסמה
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded-md border-gray-300"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            התחבר
          </button>
        </form>

        {token && (
          <p className="mt-4 text-sm text-green-600">
            התחברת בהצלחה! טוקן: {token}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
          <Link href="/pages/forget_password" className="text-sm text-blue-600 hover:underline">
          ? שכחת סיסמה
          </Link>
          <Link href={"https://wa.link/7wjrj1"} className="text-sm text-blue-600 hover:underline">
            יצירת קשר
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
