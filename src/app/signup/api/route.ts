/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request: Request) => {
  try {
    const newUser = await request.json();

    const db = await connectDB();

    if (!db) {
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }

    const userCollection = db.collection("users");
    const exist = await userCollection.findOne({ email: newUser.email });
    console.log("Usuario existente:", exist);

    if (exist) {
      return NextResponse.json({ message: "User Exists" }, { status: 409 });
    }

    const hashedPassword = bcrypt.hashSync(newUser.password, 14);
    const resp = await userCollection.insertOne({
      ...newUser,
      password: hashedPassword,
    });

    return NextResponse.json({
      message: "User Created",
      user: {
        id: resp.insertedId.toString(),
        email: newUser.email,
        name: newUser.name
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Error en signup API:", error);
    return NextResponse.json(
      { message: "Something Went Wrong", error },
      { status: 500 }
    );
  }
};
