"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const route = useRouter();
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation for email format
    if (!email) {
      alert("אנא הזן כתובת אימייל");
      return;
    }

    setMessage(`קישור לאיפוס סיסמה נשלח לכתובת האימייל ${email}`);

    route.push("/pages/reset_password");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          שכחת סיסמה?
        </h2>
        <p className="text-center text-gray-600">
          הזן את כתובת האימייל שלך כדי לקבל קוד לאיפוס הסיסמה
        </p>

        <form onSubmit={handleForgotPassword} className="space-y-6 text-right">
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
              placeholder="example@domain.com"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            שלח לאיפוס סיסמה
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-green-600 text-center">{message}</p>
        )}

        <div className="flex items-center justify-center pt-4 mt-4 border-t border-gray-200">
          <a href="/" className="text-sm text-blue-600 hover:underline">
            חזרה לדף התחברות
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
