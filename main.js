/* Selections */

let form = document.querySelector("form");
let inputLabelContainer = document.querySelectorAll(".input-label_container");
let amountInput = inputLabelContainer[0].querySelector("#amount");
let numberOfPeople = inputLabelContainer[2].querySelector("#numOfPeople");
console.log(numberOfPeople);

let amountError = inputLabelContainer[0].querySelector("p");
let numberOfPeopleError = inputLabelContainer[2].querySelector("p");

console.log(numberOfPeopleError);
let buttons = document
  .querySelector("#buttons_container")
  .querySelectorAll(".tip_button");
let customInput = document
  .querySelector("#buttons_container")
  .querySelector("#custom-input");
let results = document.querySelectorAll(".results");
let tipAmountResult = results[0].querySelector("#tip-amount");
let total = results[1].querySelector("#total");

let resetButton = document
  .querySelector(".results_container")
  .querySelector("#reset-button");

/* Main functions */
var calculateTips = (amount, tipPercentage, numberOfPeople) => {
  const tipAmountPerPerson = (amount * (tipPercentage / 100)) / numberOfPeople;

  const total = amount / numberOfPeople + tipAmountPerPerson;

  return [tipAmountPerPerson.toFixed(2), total.toFixed(2)];
};

function handleClick(e) {
  let tipPercentage = parseInt(e.target.value);
  let res = calculateTips(
    amountInput.value,
    tipPercentage,
    numberOfPeople.value
  );
  tipAmountResult.textContent = "$" + res[0];
  total.textContent = "$" + res[1];
}

var handleResetButtons = (e) => {
  amountInput.value = 0;
  numberOfPeople.value = 0;
  tipAmountResult.textContent = "$0.00";
  total.textContent = "$0.00";
};

/* events */
buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});
customInput.addEventListener("change", handleClick);

resetButton.addEventListener("click", handleResetButtons);

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

/* validations */
const validations = {
  bill: (value) => value >= 0,
  numOfPeople: (value) => value > 0,
  customInput: (value) => value >= 0 && value <= 100,
};

const dataIsValid = (key, value) => {
  return validations[key](value);
};

amountInput.addEventListener("change", () => {
  if (!dataIsValid("bill", amountInput.value)) {
    amountError.textContent = "Can't be negative";
    amountError.classList.remove("hidden");
    amountInput.classList.add("error_state");
  } else {
    amountError.classList.add("hidden");
    amountInput.classList.remove("error_state");
  }
});

numberOfPeople.addEventListener("change", () => {
  if (!dataIsValid("numOfPeople", numberOfPeople.value)) {
    numberOfPeopleError.textContent = "Can't be zero";
    numberOfPeopleError.classList.remove("hidden");
    numberOfPeople.classList.add("error_state");
  } else {
    numberOfPeopleError.classList.add("hidden");
    numberOfPeople.classList.remove("error_state");
  }
});
customInput.addEventListener("input", () => {
  if (!dataIsValid("customInput", customInput.value)) {
    customInput.value = 1;
  }
});
