const upperCase = document.querySelector("#upperCase");
const numbers = document.querySelector("#num");
const rangeOfArray = document.querySelector("#range");
const lowerCase = document.querySelector("#lowerCase");
const submit = document.querySelector("#submit");
const symbols = document.querySelector("#symbols");

const lengthDisplay = document.querySelector("#length");

const checkboxInputs = document.querySelector("#checkbox-inputs");

const inputsWithCheckBox = Array.from(checkboxInputs.querySelectorAll("input"));
const passwordStrength = document.querySelector("#password-strength");
const passwordStrengthDivs = passwordStrength.querySelectorAll("div");

const parent = document.querySelector("#parent");

let mainArray = [];

const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const lowLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const capLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const specials = [
  "!",
  "”",
  "#",
  "$",
  "%",
  "&",
  "’",
  "(",
  ")",
  "*",
  "+",
  "-",
  "/",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "[",
  "]",
  "^",
  "_",
  "`",
  "{",
  "|",
  "}",
  "~",
  ".",
];

//check if at least one checkbox is checked
const checkIfAtLeastOneOptionIsChecked = () => {
  return inputsWithCheckBox.some((element) => {
    return element.checked === true;
  });
};

rangeOfArray.addEventListener("input", () => {
  lengthDisplay.textContent = rangeOfArray.value;
});

//console.log(upperCase.value);

const getLowerCaseLetters = () => {
  if (lowerCase.checked) {
    mainArray = mainArray.concat(lowLetters);
  }
};

const getCapLetters = () => {
  if (upperCase.checked) {
    mainArray = mainArray.concat(capLetters);
  }
};

const getNumbers = () => {
  if (numbers.checked) {
    mainArray = mainArray.concat(num);
  }
};

const getSymbols = () => {
  if (symbols.checked) {
    mainArray = mainArray.concat(specials);
  }
};

const getPasswordLength = () => {
  return rangeOfArray.value;
};

//Fisher-Yates algorithm
// shuffle = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// };

//main

let passwordBox = null;

submit.addEventListener("click", () => {
  if (passwordBox) {
    passwordBox.remove();
  }
  if (!checkIfAtLeastOneOptionIsChecked() && getPasswordLength() < 20) {
    alert("You must choose a correct option");
    return;
  }

  let password = "";
  const passwordLength = getPasswordLength();
  console.log(passwordLength);
  getNumbers();
  getSymbols();
  getCapLetters();
  getLowerCaseLetters();
  setPasswordStrengh(passwordLength);

  //shuffle(mainArray);

  numbers.checked = false;
  symbols.checked = false;
  lowerCase.checked = false;
  upperCase.checked = false;

  //console.log(mainArray[Math.floor(Math.random() * mainArray.length)]);

  do {
    password =
      password + mainArray[Math.floor(Math.random() * mainArray.length)];
  } while (password.length < passwordLength);

  console.log(password);

  passwordBox = document.createElement("div");
  let passwordText = document.createElement("p");
  parent.appendChild(passwordBox);
  passwordBox.appendChild(passwordText);

  passwordBox.classList.add(
    "w-50",
    "pass-gen-text-color",
    "m-auto",
    "text-center",
    "mt-2",
    "d-flex",
    "align-items-center",
    "justify-content-between"
  );
  passwordText.classList.add("px-4", "py-3", "fw-bold", "fs-3", "fw-bold");

  let fontAwesomeCopyElement = document.createElement("i");
  passwordBox.appendChild(fontAwesomeCopyElement);
  fontAwesomeCopyElement.classList.add(
    "fa-solid",
    "fa-copy",
    "fa-2xl",
    "pb-2",
    "pe-3",
    "cursor-pointer"
  );
  fontAwesomeCopyElement.addEventListener("click", () => {
    navigator.clipboard.writeText(password);
  });

  passwordText.textContent = password;
  rangeOfArray.value = 0;
  lengthDisplay.textContent = 0;
});

const setPasswordStrengh = (password) => {
  let index = 0;
  inputsWithCheckBox.forEach((element) => {
    if (element.checked === true) {
      index++;
    }
  });

  for (let i = 0; i < passwordStrengthDivs.length; i++) {
    passwordStrengthDivs[i].classList.remove("password-strength");
  }

  for (let i = 0; i < index; i++) {
    if (password > 5 && index >= 2) {
      passwordStrengthDivs[i].classList.add("password-strength");
    }
    if (password < 5) {
      passwordStrengthDivs[0].classList.add("password-strength");
    }
  }
};
