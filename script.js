// Array of special characters to be included in password
var specialCharacters = [
  '@', 
  '%', 
  '+', 
  '\\', 
  '/', 
  "'", 
  '!', 
  '#', 
  '$', 
  '^', 
  '?', 
  ':', 
  ',', 
  ')', 
  '(', 
  '}', 
  '{', 
  ']', 
  '[', 
  '~', 
  '-', 
  '_', 
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
] 
 

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a', 
  'b', 
  'c', 
  'd', 
  'e', 
  'f', 
  'g', 
  'h', 
  'i', 
  'j', 
  'k', 
  'l', 
  'm', 
  'n', 
  'o', 
  'p', 
  'q', 
  'r', 
  's', 
  't', 
  'u', 
  'v', 
  'w', 
  'x', 
  'y', 
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
       'A',
       'B',
       'C',
       'D',
       'E',
       'F',
       'G',
       'H', 
       'I', 
       'J', 
       'K', 
       'L', 
       'M', 
       'N', 
       'O', 
       'P', 
       'Q', 
       'R', 
       'S', 
       'T', 
       'U', 
       'V', 
       'W', 
       'X', 
       'Y', 
       'Z'
];

// Function to prompt user for password options
function getPasswordOptions() {
  var characterLength = parseInt(prompt("How many characters do you want your password to be? (8 - 128 characters)"));

  if (isNaN(characterLength) || characterLength < 8 || characterLength > 128) {
    alert("Character length has to be a number, 8 - 128 digits. Please try again");
    return null;
  }

  var includeLowercase = confirm("Do you want to include lowercase characters?");
  var includeUppercase = confirm("Do you want to include uppercase characters?");
  var includeNumeric = confirm("Do you want to include numeric characters?");
  var includeSpecial = confirm("Do you want to include special characters?");

  if (!includeLowercase && !includeUppercase && !includeNumeric && !includeSpecial) {
    alert("At least one character type must be selected. Please try again.");
    return null;
  }

  return {
    characterLength: characterLength,
    includeLowercase: includeLowercase,
    includeUppercase: includeUppercase,
    includeNumeric: includeNumeric,
    includeSpecial: includeSpecial
  };
}

// Function for getting a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Function to generate password with user input
function generatePassword() {
  var options = getPasswordOptions();

  if (!options) return ""; // If user cancels the prompt or provides invalid input

  var possibleCharacters = [];
  var guaranteedCharacters = [];

  if (options.includeLowercase) {
    possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
    guaranteedCharacters.push(getRandom(lowerCasedCharacters));
  }
  if (options.includeUppercase) {
    possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
    guaranteedCharacters.push(getRandom(upperCasedCharacters));
  }
  if (options.includeNumeric) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }
  if (options.includeSpecial) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

  var generatedPassword = "";

  for (var i = 0; i < options.characterLength; i++) {
    if (guaranteedCharacters.length > 0) {
      generatedPassword += guaranteedCharacters.shift();
    } else {
      generatedPassword += getRandom(possibleCharacters);
    }
  }

  return generatedPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
