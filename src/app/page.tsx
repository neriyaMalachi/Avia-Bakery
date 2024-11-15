"use client";
import Image from "next/image";
import { useState } from "react";
import logo from "@/app/assets/logo.png";
import Link from "next/link";
import { LoginService } from "./services/loginServices/loginService";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);  // מצב טוען
  const route = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // מתחילים טעינה

    const results = await LoginService(password, email);
    setLoading(false); // סיימנו טעינה

    if (results) {
      route.push("/pages/home_page");
    } else {
      alert("פרטי ההתחברות אינם נכונים. נסה שוב.");
      route.push("/");
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
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
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
            disabled={loading} // אם בטעינה, disable הכפתור
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="4"
                    d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"
                  ></path>
                </svg>
              </div>
            ) : (
              "התחבר"
            )}
          </button>
        </form>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
          <Link
            href="/pages/forget_password"
            className="text-sm text-blue-600 hover:underline"
          >
            ? שכחת סיסמה
          </Link>
          <Link
            href={"https://wa.link/7wjrj1"}
            className="text-sm text-blue-600 hover:underline"
          >
            יצירת קשר
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
