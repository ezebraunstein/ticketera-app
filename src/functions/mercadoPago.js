  // const handleCheckoutMP = async () => {
  //   try {
  //     const result = await axios.post('https://dyovo7ln67.execute-api.us-east-1.amazonaws.com/default/lambdcheckoutMP', {});
  //     console.log('Checkout done', result);
  //     const preferenceId = result.data.id;
  //     createCheckoutButton(preferenceId);
  //   } catch (error) {
  //     console.error('Failed to checkout', error);
  //   }
  // };

  // function redirectCheckout(preference) {
  //   var script = document.createElement("script");
  //   script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
  //   script.type = "text/javascript";
  //   script.dataset.preferenceId = preference;
  //   document.getElementById("checkout-btn").innerHTML = "";
  //   document.getElementById("checkout-btn").style.display = "block";
  //   document.querySelector("#checkout-btn").appendChild(script);

  // }