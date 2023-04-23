import axios from "axios";

const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC);

async function handleCheckoutStripe(lineItems, path) {
    try {
        const response = await axios.post('https://okosjzzcwklkr22nb5wc3ksmlm0fjcey.lambda-url.us-east-1.on.aws/', {
            line_items: lineItems,
            success_url: `http://localhost:3000${path}`,
            cancel_url: `http://localhost:3000${path}`,
        });

        if (response.error) {
            throw new Error(response.error);
        }

        await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
    } catch (error) {
        console.error("Error redirecting to checkout:", error);
    }
}

export default handleCheckoutStripe;