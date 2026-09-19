/* eslint-disable @typescript-eslint/no-unused-vars */

import { connectDB } from "@/lib/connectDB";
import {
  getSecurityClientIp,
  writeSecurityLog,
} from "@/lib/securityLogger";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

interface User {
  id: string;
  email: string;
  name?: string;
}

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials, req) {
        const ip = getSecurityClientIp(req.headers);

        const userAgent =
          typeof req.headers?.["user-agent"] === "string"
            ? req.headers["user-agent"]
            : undefined;

        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";

        const password =
          typeof credentials?.password === "string"
            ? credentials.password
            : "";

        const endpoint = "/api/auth/callback/credentials";

        // --------------------------------------------------
        // Validación inicial
        // --------------------------------------------------

        if (!email || !password) {
          await writeSecurityLog({
            event: "login_failed",
            email: email || undefined,
            ip,
            reason: "missing_credentials",
            endpoint,
            userAgent,
          });

          throw new Error("Email and password are required");
        }

        // --------------------------------------------------
        // Conexión a MongoDB
        // --------------------------------------------------

        let db;

        try {
          db = await connectDB();
        } catch (error) {
          await writeSecurityLog({
            event: "login_error",
            email,
            ip,
            reason: "database_connection_failed",
            endpoint,
            userAgent,
          });

          throw new Error("Database connection failed");
        }

        // --------------------------------------------------
        // Búsqueda del usuario
        // --------------------------------------------------

        const currentUser = await db
          .collection("users")
          .findOne({ email });

        if (!currentUser) {
          await writeSecurityLog({
            event: "login_failed",
            email,
            ip,
            reason: "user_not_found",
            endpoint,
            userAgent,
          });

          throw new Error(
            "No user found with the provided email"
          );
        }

        // --------------------------------------------------
        // Verificación de contraseña
        // --------------------------------------------------

        const passwordMatched = await bcrypt.compare(
          password,
          currentUser.password
        );

        if (!passwordMatched) {
          await writeSecurityLog({
            event: "login_failed",
            email,
            ip,
            reason: "invalid_password",
            endpoint,
            userAgent,
          });

          throw new Error("Incorrect password");
        }

        // --------------------------------------------------
        // Login exitoso
        // --------------------------------------------------

        await writeSecurityLog({
          event: "login_success",
          email: currentUser.email,
          ip,
          reason: "valid_credentials",
          endpoint,
          userAgent,
        });

        return {
          id: currentUser._id.toString(),
          email: currentUser.email,
          name: currentUser.name,
        };
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      const { name, email, image } = user;

      if (account?.provider === "github") {
        console.log("GitHub user data:", user);

        if (!email) {
          console.log("GitHub user has no email.");
          return "/login?error=github_error_email";
        }
      }

      try {
        const db = await connectDB();
        const userCollection = db?.collection("users");

        const userExist = await userCollection?.findOne({
          email,
        });

        if (!userExist) {
          await userCollection?.insertOne({
            name,
            email,
            image,
            provider: account ? account.provider : undefined,
          });

          console.log("New user inserted");
        } else {
          console.log(
            "User already exists:",
            userExist
          );
        }

        return true;
      } catch (error) {
        console.log(
          "Error during signIn:",
          error
        );

        return false;
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export const runtime = "nodejs";

export { handler as GET, handler as POST };
