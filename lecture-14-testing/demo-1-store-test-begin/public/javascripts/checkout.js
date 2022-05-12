let totalCost = 0;

async function init(){
    await loadCart();

    if(totalCost > 0){
      document.getElementById("payment-div").style.display=""
      // call functions from Stripe Custom Flow tutorial: https://stripe.com/docs/payments/quickstart
      initialize();
      checkStatus();
    }
}

async function loadCart(){
    document.getElementById("yourcartdiv").innerHTML = "Loading...";

    //load items from server
    let response = await fetch("/items/getCart");
    let cartJson = await response.json();

    //display cart items

    let cartHTML = cartJson.map(itemInfo => {
        totalCost += itemInfo.price * itemInfo.itemCount;
        
        return `
        <hr>
        <div>
            <h3>Item: ${itemInfo.name}</h3>
            <strong>Price: </strong>$${itemInfo.price}<br>
            <strong>Count</strong> ${itemInfo.itemCount}
        </div>`
    }).join("<hr>")
    
    document.getElementById("yourcartdiv").innerHTML = cartHTML;
    document.getElementById("total_price").innerText = totalCost;
}


// From Stripe Custom Flow tutorial: https://stripe.com/docs/payments/quickstart

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = Stripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

// The items the customer wants to buy
const items = [{ id: "xl-tshirt" }];

let elements;



document
  .querySelector("#payment-form")
  .addEventListener("submit", handleSubmit);

// Fetches a payment intent and captures the client secret
async function initialize() {
  const response = await fetch("/items/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  const { clientSecret } = await response.json();

  const appearance = {
    theme: 'stripe',
  };
  elements = stripe.elements({ appearance, clientSecret });

  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: "http://localhost:3000/checkout.html",
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occured.");
  }

  setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageText.textContent = "";
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}