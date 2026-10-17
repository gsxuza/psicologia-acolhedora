import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextResponse, type NextRequest } from "next/server";
import { sql } from "@/lib/db";

// Vincula a conta recém-criada a um paciente já cadastrado pela psicóloga
// com o mesmo e-mail (o cadastro só existe porque ela convidou essa pessoa —
// ver app/actions/patients.ts). Sem isso o paciente nunca teria acesso ao
// /portal, já que o user_id nunca era preenchido automaticamente.
export async function POST(request: NextRequest) {
  let event;
  try {
    event = await verifyWebhook(request);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "user.created") {
    const user = event.data;
    const email = user.email_addresses?.[0]?.email_address;

    if (email) {
      await sql`
        UPDATE patients
        SET user_id = ${user.id}, updated_at = now()
        WHERE lower(email) = lower(${email}) AND user_id IS NULL
      `;
    }
  }

  return NextResponse.json({ received: true });
}
