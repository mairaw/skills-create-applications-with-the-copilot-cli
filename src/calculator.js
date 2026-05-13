#!/usr/bin/env node

/*
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   + : Addition       - Adds two numbers
 *   - : Subtraction    - Subtracts the second number from the first
 *   * : Multiplication - Multiplies two numbers
 *   / : Division       - Divides the first number by the second
 */

const readline = require("readline");

// Addition: returns the sum of a and b
function add(a, b) {
  return a + b;
}

// Subtraction: returns the difference of a and b
function subtract(a, b) {
  return a - b;
}

// Multiplication: returns the product of a and b
function multiply(a, b) {
  return a * b;
}

// Division: returns the quotient of a and b
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

function calculate(num1, operator, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function prompt(question) {
    return new Promise((resolve) => rl.question(question, resolve));
  }

  console.log("=== Node.js CLI Calculator ===");
  console.log("Supported operations: + (add), - (subtract), * (multiply), / (divide)\n");

  const num1 = parseFloat(await prompt("Enter the first number: "));
  if (isNaN(num1)) {
    console.error("Error: Invalid number.");
    rl.close();
    process.exit(1);
  }

  const operator = (await prompt("Enter an operator (+, -, *, /): ")).trim();
  if (!["+", "-", "*", "/"].includes(operator)) {
    console.error("Error: Invalid operator. Please use +, -, *, or /.");
    rl.close();
    process.exit(1);
  }

  const num2 = parseFloat(await prompt("Enter the second number: "));
  if (isNaN(num2)) {
    console.error("Error: Invalid number.");
    rl.close();
    process.exit(1);
  }

  try {
    const result = calculate(num1, operator, num2);
    console.log(`\nResult: ${num1} ${operator} ${num2} = ${result}`);
  } catch (error) {
    console.error(`\nError: ${error.message}`);
  }

  rl.close();
}

// Export functions for testing
module.exports = { add, subtract, multiply, divide, calculate };

// Run the CLI only when executed directly
if (require.main === module) {
  main();
}
