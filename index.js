function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function power(a, b) {
    let result = 1;
    for (let i = 0; i < b; i++) {
        result *= a;
    }
    return result;
}

function modulus(a, b) {
    return a % b;
}

function stringLength(str) {
    return str.length;
}

function concatenate(str1, str2) {
    return str1 + str2;
}

function toUpperCase(str) {
    return str.toUpperCase();
}

function toLowerCase(str) {
    return str.toLowerCase();
}

function average(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}

function max(arr) {
    let maxVal = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    return maxVal;
}

function min(arr) {
    let minVal = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < minVal) {
            minVal = arr[i];
        }
    }
    return minVal;
}

function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

function isPrime(n) {
    if (n <= 1) {
        return false;
    }
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reverseString(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

function countVowels(str) {
    let count = 0;
    let vowels = 'aeiouAEIOU';
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            count++;
        }
    }
    return count;
}

let num1 = 10;
let num2 = 20;
let resultAdd = add(num1, num2);
let resultSub = subtract(num1, num2);
let resultMul = multiply(num1, num2);
let resultDiv = divide(num1, num2);

let str1 = "Hello";
let str2 = "World";
let resultConcat = concatenate(str1, str2);
let resultUpper = toUpperCase(str1);
let resultLower = toLowerCase(str2);
let resultLength = stringLength(str1);

let numbers = [1, 2, 3, 4, 5];
let resultAvg = average(numbers);
let resultMax = max(numbers);
let resultMin = min(numbers);

let num3 = 5;
let resultFactorial = factorial(num3);
let resultIsPrime = isPrime(num3);

let randomNum = randomInRange(1, 100);
let resultReverseStr = reverseString(str1);
let resultCountVowels = countVowels(str1);
