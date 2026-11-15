const form = document.querySelector("#donate-form");
const customAmount = document.querySelector("#custom-amount");
const message = document.querySelector("#donate-status");
const presets = form.querySelectorAll('input[name="amount"]');

customAmount.addEventListener("input", () => {
  customAmount.value = customAmount.value.replace(/\D/g, "").slice(0, 4);
  presets.forEach((preset) => {
    preset.checked = preset.value === customAmount.value;
  });
});

presets.forEach((preset) => {
  preset.addEventListener("change", () => {
    customAmount.value = preset.value;
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = Number(customAmount.value);
  const frequency = form.elements.frequency.value;

  if (!amount) {
    message.textContent = "Please choose or enter an amount first.";
    customAmount.focus();
    return;
  }

  message.textContent = `Thank you! Your ${frequency} gift of $${amount} will feed a friend.`;
});
