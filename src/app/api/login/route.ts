import connectToDatabase from "@/app/lib/mongoDB/ConnectToData";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/app/lib/modules/user"; // ייבוא מודל המשתמש

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey"; // המפתח הסודי ליצירת ה-JWT

export async function POST(req: NextRequest) {
  const { password, email } = await req.json();

  try {
    console.log("Received login request:", { email, password });

    // חיבור ל-Database
    await connectToDatabase();

    // חיפוש משתמש לפי אימייל
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "Invalid credentials",
        status: 401,
      });
    }

    // אימות הסיסמה
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({
        message: "Invalid credentials",
        status: 401,
      });
    }

    // יצירת JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "2h" } // תוקף ה-Token לשעה
    );

    // הגדרת Cookie עם ה-Token
    const response = NextResponse.json({
      message: "Login successful",
      status: 200,
      token,
    });
    response.cookies.set("authToken", token, {
      httpOnly: true, // מונע גישה ל-Cookie מהקליינט
      //   secure: process.env.NODE_ENV === "production", // מאובטח רק ב-HTTPS
      sameSite: "strict", // מניעת שליחה מאתרים חיצוניים
      maxAge: 60 * 60 * 2, // תוקף של שעה
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof Error) {
      return NextResponse.json({
        message: "Login failed",
        status: 400,
        error: error.message,
      });
    } else {
      return NextResponse.json({
        message: "Not found",
        status: 404,
      });
    }
  }
}
