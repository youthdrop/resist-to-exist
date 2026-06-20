const bbqQty = document.getElementById("bbqQty");
const shirtSize = document.getElementById("shirtSize");
const totalDisplay = document.getElementById("total");
const totalInput = document.getElementById("totalInput");
const orderSummary = document.getElementById("orderSummary");
const form = document.getElementById("orderForm");

const BBQ_PRICE = 20;
const SHIRT_PRICE = 25;

function calculateTotal() {
  const plates = Number(bbqQty.value) || 0;
  const hasShirt = shirtSize.value !== "";
  const total = plates * BBQ_PRICE + (hasShirt ? SHIRT_PRICE : 0);

  totalDisplay.textContent = total;
  totalInput.value = `$${total}`;
  orderSummary.value = `${plates} BBQ plate(s) at $20 each${hasShirt ? ` + 1 campaign shirt, size ${shirtSize.value}, at $25` : " + no shirt"}`;

  return total;
}

bbqQty.addEventListener("input", calculateTotal);
shirtSize.addEventListener("change", calculateTotal);

form.addEventListener("submit", function (event) {
  const plates = Number(bbqQty.value) || 0;
  const hasShirt = shirtSize.value !== "";

  if (plates === 0 && !hasShirt) {
    event.preventDefault();
    alert("Please order at least one BBQ plate or select a shirt size.");
    return;
  }

  calculateTotal();
});

calculateTotal();
