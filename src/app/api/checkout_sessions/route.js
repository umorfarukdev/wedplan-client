import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getSession } from "@/lib/core/server";
import { stripe } from "@/app/lib/stripe";

export async function POST() {
  try {
    const userSession = await getSession();

    if (!userSession?.user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const headersList = await headers();
    const origin = headersList.get("origin");

    const plan = "premium";

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.PRICE_ID,
          quantity: 1,
        },
      ],

      mode: "payment",

      customer_email: userSession.user.email,

      metadata: {
        vendorId: userSession.user.id,
        plan,
      },

      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/checkout?canceled=true&plan=${plan}`,
      integration_identifier: process.env.INTEGRATION_ID,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
