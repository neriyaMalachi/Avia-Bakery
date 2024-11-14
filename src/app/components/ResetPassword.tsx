'use client';
import { useState } from "react";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      alert("הסיסמאות לא תואמות. אנא בדוק ונסה שוב.");
      return;
    }

    // Simulate password reset process
    setTimeout(() => {
      setMessage("הסיסמה שלך שונתה בהצלחה! תוכל כעת להתחבר עם הסיסמה החדשה.");
    }, 1000);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          איפוס סיסמה
        </h2>
        <p className="text-center text-gray-600">
          הזן סיסמה חדשה כדי להשלים את התהליך
        </p>

        <form onSubmit={handleResetPassword} className="space-y-6 text-right">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              סיסמה חדשה
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded-md border-gray-300"
              placeholder="הזן סיסמה חדשה"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              אשר סיסמה חדשה
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded-md border-gray-300"
              placeholder="הזן שוב את הסיסמה החדשה"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            שמור סיסמה חדשה
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-green-600 text-center">
            {message}
          </p>
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

export default ResetPassword;
