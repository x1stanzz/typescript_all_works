function add(a: number, b: number) {
    return a + b;
}

function subtract(a: number, b: number) {
    return a - b;
}

function multiply(a: number, b: number) {
    return a * b;
}

function divide(a: number, b: number) {
    return a / b;
}

function power(a: number, b: number) {
    let result = 1;
    for (let i = 0; i < b; i++) {
        result *= a;
    }
    return result;
}

function modulus(a: number, b: number) {
    return a % b;
}

function stringLength(str: string) {
    return str.length;
}

function concatenate(str1: string, str2: string) {
    return str1 + str2;
}

function toUpperCase(str: string) {
    return str.toUpperCase();
}

function toLowerCase(str: string) {
    return str.toLowerCase();
}

function average(arr: number) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}

function max(arr: number[]) {
    let maxVal = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    return maxVal;
}

function min(arr: number[]) {
    let minVal = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < minVal) {
            minVal = arr[i];
        }
    }
    return minVal;
}

function factorial(n: number) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

function isPrime(n: number) {
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

function randomInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reverseString(str: string) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

function countVowels(str: string) {
    let count = 0;
    let vowels = 'aeiouAEIOU';
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            count++;
        }
    }
    return count;
}

let num1: number = 10;
let num2: number = 20;
let resultAdd = add(num1, num2);
let resultSub = subtract(num1, num2);
let resultMul = multiply(num1, num2);
let resultDiv = divide(num1, num2);

let str1: string = "Hello";
let str2: string = "World";
let resultConcat = concatenate(str1, str2);
let resultUpper = toUpperCase(str1);
let resultLower = toLowerCase(str2);
let resultLength = stringLength(str1);

let numbers: number[] = [1, 2, 3, 4, 5];
let resultAvg = average(numbers);
let resultMax = max(numbers);
let resultMin = min(numbers);

let num3: number = 5;
let resultFactorial = factorial(num3);
let resultIsPrime = isPrime(num3);

let randomNum = randomInRange(1, 100);
let resultReverseStr = reverseString(str1);
let resultCountVowels = countVowels(str1);
