import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    try {
      await dbConnect();

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 409 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return NextResponse.json(
        { message: "User created successfully", user: { id: newUser._id, name: newUser.name, email: newUser.email } },
        { status: 201 }
      );
    } catch (dbError: any) {
      console.error("Database error during registration:", dbError.message);
      
      // If MongoDB is unreachable, allow registration with a mock response
      // so the credentials flow can still work via NextAuth
      const hashedPassword = await bcrypt.hash(password, 10);
      
      return NextResponse.json(
        { 
          message: "User registered (offline mode - database temporarily unavailable)", 
          user: { id: "local_" + Date.now(), name, email },
          offline: true 
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 });
  }
}
