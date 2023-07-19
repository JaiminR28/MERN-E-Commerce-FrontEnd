import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/orders/orderSlice";
import CheckoutForm from "./checkoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
	"pk_test_51NUvwHSAYLUWLv2l8GvWZV46ZQi71cR1tPWr5PdpoWpCiZ9w4WOTa4bCuYYYJvPoTTdzbYZMAxGuelqPxk7IGlVi00zQ3hvi4v"
);

export default function StripeCheckout() {
	const [clientSecret, setClientSecret] = useState("");
	const currentOrder = useSelector(selectCurrentOrder);

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("http://localhost:8000/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
			meta: {
				order_id: currentOrder.id, // this info will go to stripe => and then to our webhook
				// so we can conclude that payment was succesfull, even if client closes window after pay
			},
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className="Stripe">
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
}
