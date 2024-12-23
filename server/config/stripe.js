import Stripe from "stripe";
import "dotenv/config";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);