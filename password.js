// clear the console every refresh
console.clear(); 

// Range Slider Properties
const sliderProps = {
    fill: "#0b1edf",
    background: "rgba(255,255,255,0.214)"
}

// Selecting the range slider container which will effect the Length property of the password

const slider = document.querySelector(".range-slider"); 

//Text which will show the values of the range slider 
const sliderValue = document.querySelector(".length-title"); 

// Using EventListener here 
slider.querySelector("input").addEventListener("input", event =>{ 
  sliderValue.setAttribute("data-length",event.target.value); 
  applyFill(event.target);
}); 

// Selecting the range input and passing it in the applyFill function 
applyFill(slider.querySelector("input")); 

function applyFill(slider) { 
  const presentage = 100 * (slider.value - slider.min) / (slider.max - slider.min);
  const bg = `linear-gradient(90deg, ${sliderProps.fill} ${presentage}%, 
  ${sliderProps.background} ${presentage + 0.1}%)`;
    slider.style.background = bg;
    sliderValue.setAttribute("data-length", slider.value); 
}

  // Object of all the function names that we will use to create random letter of passwords

  const randomFunc = {
    lower: getRandomLower, 
    upper: getRandomUpper,
    number: getRandomNumber, 
    symbol: getRandomSymbol
  }; 

  // Random Secure Value 
  function secureMathRandom(){
    return (window.crypto.getRandomValues(new Uint32Array(1))[0]/ (Math.pow (2,32) -1)); 
  }

// Genrerator FUnctions 
function getRandomLower(){
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97); 

}

function getRandomUpper(){
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65); 
  
}

function getRandomNumber(){
  return String.fromCharCode(Math.floor(secureMathRandom() * 10) + 48); 
  
}

function getRandomSymbol(){
  const symbol = '~!@#$%^&*()_+}{|":?><\'-=[];/.,'; 
  return symbol[Math.floor(Math.random() * symbol.length)]; 
}

// The box where will the result will be shown
const resultE1 = document.getElementById('result'); 

// The input slider, will be used for the change the length of the password 
const lengthE1 = document.getElementById("slider"); 

// checkboxes representing the option that is responsible for generating different types of password
const uppercaseE1 = document.getElementById("uppercase"); 
const lowercaseE1 = document.getElementById("lowercase"); 
const numberE1 = document.getElementById("number"); 
const symbolE1 = document.getElementById("symbol"); 

// Button to generate the password 
const generateBtn = document.getElementById("generate"); 

//Result Box container 
const resultContainer = document.querySelector(".result");

// Update CSS Property of copy button 
let resultContainerBound = {
  left: resultContainer.getBoundingClientRect().left,
  top: resultContainer.getBoundingClientRect().top
}

window.addEventListener("resize", e => {
  resultContainerBound = {
    left : resultContainer.getBoundingClientRect().left,
    top : resultContainer.getBoundingClientRect().top
  };
}); 

generateBtn.addEventListener("click", () => {
  const length = +lengthE1.value; 
  const haslower = lowercaseE1.checked; 
  const hasUpper = uppercaseE1. checked; 
  const hasNumber = numberE1.checked; 
  const hasSymbol = symbolE1.checked; 

  console.log("Generate password button clicked");

  resultE1.innerText = generatePassword (length, haslower, hasUpper, hasNumber, hasSymbol); 

}); 

//Function to generate password and returning it
function generatePassword(length, lower, upper, number, symbol){
  let generatedPassword = ""; 
  const typesCount = length + lower + upper + number + symbol; 
  const typesArr = [ { lower }, { upper } , { number } , { symbol } ].filter(item => Object.values(item)[0]); 
  console.log("in generate password");
  if (typesCount === 0) {
    return; 
  }

  for (let i = 0; i < length; i++){
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0]; 
      generatedPassword += randomFunc[funcName](); 
      
    });
  }

  return generatedPassword.slice(0, length);
}