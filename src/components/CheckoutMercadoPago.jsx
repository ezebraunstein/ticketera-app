import axios from "axios";

async function handleCheckoutMP(data, path, cart, eventData) {

    const name = data.name;
    const surname = data.surname;
    const email = data.email;
    const dni = data.dni;
  
    try {
        const result = await axios.post('https://hs37nkozzmf2277yidvtyqowsa0enots.lambda-url.us-east-1.on.aws/', {
            name, surname, email, dni, cart, eventData, path
        });
        console.log('Checkout done', result);
        const preferenceId = result.data.id;
        redirectToMercadoPago(preferenceId);
    } catch (error) {
        console.error('Failed to checkout', error);
    }

    function redirectToMercadoPago(preference) {
        const url = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preference}`;
        window.open(url, '_blank');
    }
};

export default handleCheckoutMP;