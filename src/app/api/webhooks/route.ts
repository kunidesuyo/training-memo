import { prisma } from "@/prisma";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
  console.log("webhook received");
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env",
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // イベントタイプに応じた処理
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    // プライマリメールアドレスを取得
    const primaryEmail = email_addresses.find(
      (email) => email.id === evt.data.primary_email_address_id,
    );

    if (!primaryEmail) {
      return new Response("No primary email found", { status: 400 });
    }

    // DBにユーザーを作成
    try {
      await prisma.user.create({
        data: {
          clerkId: id,
          email: primaryEmail.email_address,
          name: `${first_name || ""} ${last_name || ""}`.trim() || null,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error creating user", { status: 500 });
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    // プライマリメールアドレスを取得
    const primaryEmail = email_addresses.find(
      (email) => email.id === evt.data.primary_email_address_id,
    );

    if (!primaryEmail) {
      return new Response("No primary email found", { status: 400 });
    }

    // DBのユーザーを更新
    try {
      await prisma.user.update({
        where: { clerkId: id },
        data: {
          email: primaryEmail.email_address,
          name: `${first_name || ""} ${last_name || ""}`.trim() || null,
        },
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return new Response("Error updating user", { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    // DBからユーザーを削除
    try {
      await prisma.user.delete({
        where: { clerkId: id },
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      return new Response("Error deleting user", { status: 500 });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
