import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  try {
    const productKey = "prod_PdN2rLW6dPPROQ";
    const priceId = "price_1Oo6I7CMJPRiu1rA0aKBFrch";

    /* const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product: productKey,
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    }); */

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });

    return new NextResponse(session.url, { status: 200 });
  } catch (error: any) {
    console.error("Stripe error:", error.message);
    if (error.type) {
      console.error("Error type:", error.type);
    }
    if (error.statusCode) {
      console.error("Status code:", error.statusCode);
    }
    // 完全なエラーオブジェクトをログに出力する
    console.error("Full error:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
