const pizzaQty = document.getElementById("pizzaQty");
const shirtSize = document.getElementById("shirtSize");
const totalDisplay = document.getElementById("total");
const form = document.getElementById("orderForm");

const DONATION_LINK = "https://goodbricks.org/cause/potcsd.org/general-donations";
const ORDER_EMAIL = "laila@potcsd.org";

const toppingsList = [
  "Halal Pepperoni",
  "Halal Beef Bacon",
  "Basil",
  "Onions",
  "Spinach",
  "Green Peppers",
  "Pepperchinis",
  "Pineapple"
];

function calculateTotal() {
  const pizzas = Number(pizzaQty.value) || 0;
  const hasShirt = shirtSize.value !== "";

  let total = 0;

  if (pizzas > 0 && hasShirt) {
    total = 40 + (pizzas - 1) * 20;
  } else {
    total = pizzas * 20 + (hasShirt ? 25 : 0);
  }

  totalDisplay.textContent = total;
  return total;
}

function buildPizzaToppingSections() {
  let pizzaToppingsContainer = document.getElementById("pizzaToppingsContainer");

  if (!pizzaToppingsContainer) {
    pizzaToppingsContainer = document.createElement("div");
    pizzaToppingsContainer.id = "pizzaToppingsContainer";
    pizzaToppingsContainer.className = "pizza-toppings-container";

    pizzaQty.insertAdjacentElement("afterend", pizzaToppingsContainer);
  }

  pizzaToppingsContainer.innerHTML = "";

  const pizzas = Number(pizzaQty.value) || 0;

  for (let i = 1; i <= pizzas; i++) {
    const pizzaBox = document.createElement("div");
    pizzaBox.className = "pizza-topping-box";

    pizzaBox.innerHTML = `
      <h3>Pizza ${i} Toppings</h3>
      <div class="checkbox-grid">
        ${toppingsList
          .map(
            topping => `
              <label>
                <input type="checkbox" name="pizza${i}Toppings" value="${topping}">
                ${topping}
              </label>
            `
          )
          .join("")}
      </div>
    `;

    pizzaToppingsContainer.appendChild(pizzaBox);
  }
}

function getPizzaOrders() {
  const pizzas = Number(pizzaQty.value) || 0;
  const pizzaOrders = [];

  for (let i = 1; i <= pizzas; i++) {
    const toppings = [
      ...document.querySelectorAll(`input[name="pizza${i}Toppings"]:checked`)
    ].map(item => item.value);

    pizzaOrders.push({
      pizzaNumber: i,
      toppings: toppings.length ? toppings.join(", ") : "No toppings selected"
    });
  }

  return pizzaOrders;
}

pizzaQty.addEventListener("input", function () {
  if (Number(pizzaQty.value) > 10) pizzaQty.value = 10;
  if (Number(pizzaQty.value) < 0) pizzaQty.value = 0;

  buildPizzaToppingSections();
  calculateTotal();
});

shirtSize.addEventListener("change", calculateTotal);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const total = calculateTotal();
  const name = form.name.value;
  const phone = form.phone.value;
  const pizzas = Number(pizzaQty.value) || 0;
  const shirt = shirtSize.value || "No shirt";
  const pizzaOrders = getPizzaOrders();

  const pizzaDetails = pizzaOrders
    .map(order => `Pizza ${order.pizzaNumber}: ${order.toppings}`)
    .join("\n");

  const csvLines = pizzaOrders
    .map(order => `"${name}","${phone}","Pizza ${order.pizzaNumber}","${order.toppings}","${shirt}","$${total}"`)
    .join("\n");

  const subject = encodeURIComponent("New Pizza/Shirt Fundraiser Order");

  const body = encodeURIComponent(
`New fundraiser order:

Name: ${name}
Phone: ${phone}
Pizza Quantity: ${pizzas}

Pizza Toppings:
${pizzaDetails || "No pizzas ordered"}

Shirt Size: ${shirt}
Total: $${total}

CSV lines for Excel:
Name,Phone,Pizza,Toppings,Shirt Size,Total
${csvLines || `"${name}","${phone}","No pizza","No toppings","${shirt}","$${total}"`}

After sending this email, please complete payment here:
${DONATION_LINK}`
  );

  window.location.href = `mailto:${ORDER_EMAIL}?subject=${subject}&body=${body}`;

  setTimeout(function () {
    window.location.href = DONATION_LINK;
  }, 2500);
});

buildPizzaToppingSections();
calculateTotal();