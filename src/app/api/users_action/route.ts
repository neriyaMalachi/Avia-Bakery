import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/lib/modules/user"; // ייבוא מודל המשתמש
import connectToDatabase from "@/app/lib/mongoDB/ConnectToData"; // חיבור ל-MongoDB

export async function POST(req: NextRequest) {
  try {
    // קריאת הנתונים מגוף הבקשה
    const { name, email, password } = await req.json();

    // בדיקת תקינות הקלט
    if (!name || !email || !password) {
      return NextResponse.json({
        message: "All fields are required",
        status: 400,
      });
    }

    // התחברות ל-Database
    await connectToDatabase();

    // בדיקה אם המשתמש כבר קיים
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
        status: 409, // Conflict
      });
    }

    // הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // יצירת משתמש חדש
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // שמירת המשתמש ב-Database
    await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
      error,
    });
  }
}
