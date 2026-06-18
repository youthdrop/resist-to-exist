const bbqQty = document.getElementById("bbqQty");
const shirtSize = document.getElementById("shirtSize");
const totalDisplay = document.getElementById("total");
const form = document.getElementById("orderForm");

const BBQ_PRICE = 20;
const SHIRT_PRICE = 25;

function calculateTotal() {
  const plates = Number(bbqQty.value) || 0;
  const hasShirt = shirtSize.value !== "";
  const total = plates * BBQ_PRICE + (hasShirt ? SHIRT_PRICE : 0);

  totalDisplay.textContent = total;
}

bbqQty.addEventListener("input", calculateTotal);
shirtSize.addEventListener("change", calculateTotal);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  alert("Order submitted. Please continue to payment.");
});

calculateTotal();