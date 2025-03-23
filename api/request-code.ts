// api/request-code.ts
import { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./firebaseAdmin"
import crypto from "crypto";

export default async function handler(req: VercelRequest, res: VercelResponse) {

    console.log("ENV:", {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        hasKey: !!process.env.FIREBASE_PRIVATE_KEY
      });
      
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required." });

  // Check if user is subscribed
  const userRef = db.collection("users").doc(email);
  const userDoc = await userRef.get();

  if (!userDoc.exists || userDoc.data()?.subscriptionStatus !== "active") {
    return res.status(403).json({ error: "Subscription required." });
  }

  console.log("EMAIL:", req.body?.email);
console.log("ENV:", {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY
});

  // Generate a 6-digit code
  const code = crypto.randomInt(100000, 999999).toString();

  // Save to auth_codes with expiry
  await db.collection("auth_codes").doc(email).set({
    code,
    createdAt: Date.now(),
    expiresIn: 5 * 60 * 1000 // 5 minutes in milliseconds
  });

  

  return res.status(200).json({
    message: "Verification code generated.",
    code // include it in response for testing only (hide this in production!)
  });
}
