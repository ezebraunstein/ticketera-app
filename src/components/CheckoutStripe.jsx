import axios from "axios";

const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC);

async function handleCheckoutStripe(cart, path) {

    const lineItems = convertCartToLineItems(cart);

    try {
        const response = await axios.post('https://okosjzzcwklkr22nb5wc3ksmlm0fjcey.lambda-url.us-east-1.on.aws/', {
            line_items: lineItems,
            success_url: `http://localhost:3000${path}?status=success`,
            cancel_url: `http://localhost:3000${path}?status=cancel`,
        });

        if (response.error) {
            throw new Error(response.error);
        }

        await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
    } catch (error) {
        console.error("Error redirecting to checkout:", error);
    }

    function convertCartToLineItems() {
        return cart.map((item) => {
            const updatedPrice = (item.priceTT * 1.15) / 1.75;
            return {
                price_data: {
                    currency: 'ars',
                    product_data: {
                        name: item.nameTT,
                    },
                    unit_amount: Math.round(updatedPrice * 100),
                },
                quantity: item.selectedQuantity,
            };
        });
    }
}

export default handleCheckoutStripe;