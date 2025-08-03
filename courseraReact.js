// const makeFancyString = (s) => {
//   let n = 1;
//   let c = null;
//   let a = Array.from(s);
//   let b = [];
//   for (let i = 0; i < a.length; i++) {
//     if (a[i] !== c) {
//       n = 1;
//       c = s[i];
//     } else {
//       n++;
//     }
//     if (n < 3) {
//       b.push(a[i]);
//     }
//   }
//   return b.join("");
// };
// console.log(makeFancyString("aabaaaa"));

// const maximumUniqueSubarray = (a) => {
//   const cA = new Set();
//   let bS = 0;
//   let cS = 0;
//   let l = 0;
//   for (let r = 0; r < a.length; r++) {
//     while (cA.has(a[r])) {
//       cA.delete(a[l]);
//       cS -= a[l];
//       l++;
//     }
//     cA.add(a[r]);
//     cS += a[r];

//     bS = Math.max(bS, cS);
//   }
//   return bS;
// };

// const maximumGain = (s, x, y) => {
//   const a = /ab/g;
//   const b = /ba/g;
//   let score = 0;
//   const calculateResult = (regex1, maxPoints, regex2, minPoints) => {
//     let stringArray = [];
//     let updatedString = null;
//     let matchArr = [];

//     function addIndexesAndPoints(reg, arr, points) {
//       let match;
//       reg.lastIndex = 0;
//       while ((match = reg.exec(arr)) !== null) {
//         matchArr.push(match.index);
//         score += points;
//       }
//       stringArray = Array.from(arr);

//       for (let i = matchArr.length - 1; i >= 0; i--) {
//         stringArray.splice(matchArr[i], 2);
//       }

//       updatedString = stringArray.join("");
//       matchArr = [];
//       return updatedString;
//     }

//     addIndexesAndPoints(regex1, s, maxPoints);
//     addIndexesAndPoints(regex2, updatedString, minPoints);

//     while (true) {
//       const newString1 = addIndexesAndPoints(regex1, updatedString, maxPoints);
//       const newString2 = addIndexesAndPoints(regex2, newString1, minPoints);

//       if (newString2 === updatedString) {
//         console.log(newString2);
//         break;
//       }

//       updatedString = newString2;
//     }
//   };
//   // If x > y, find all instances of a in s. For each, score += x, then delete from biggest index, to smallest. Then run again with b & y;
//   x > y ? calculateResult(a, x, b, y) : calculateResult(b, y, a, x);
//   return score;
// };

// console.log(maximumGain("aabbaaxybbaabb", 5, 4));

// function fib(n) {
//   // Base Cases
//   if (n === 0) return 0;
//   if (n === 1) return 1;
//   // Recursive Case
//   return fib(n - 1) + fib(n - 2);
// }

// console.log(fib(5));
// console.log(fib(12));
// /**
//  * If there is a match with this, delete the match and add the number
//  */

// const maxSum = (nums) => {
//   let array = [];
//   for (let i = nums.length - 1; i >= 0; i--) {
//     if (!array.includes(nums[i]) && nums[i] > 0) {
//       array.push(nums[i]);
//     }
//   }
//   if (nums.length > 0 && array.length == 0) {
//     array.push(Math.max(...nums));
//   }
//   if (array.length > 0) return array.reduce((a, b) => a + b);
//   return;
// };

// console.log(maxSum([-17, -15]));

// // Task 1: Build a function-based console log message generator
// function consoleStyler(color, background, fontSize, txt) {
//   // Declare a variable for the message
//   var message = "%c" + txt;

//   // Declare a variable for the style
//   var variable = `color: ${color};`;

//   // Append background style to the style variable
//   var style;
//   style += `background: ${background};`;

//   // Append font size style to the style variable
//   style += `font-size: ${fontSize};`;

//   // Log the message with the applied style
//   console.log(message, style);
// }

// // Task 2: Build another console log message generator
// function celebrateStyler(reason) {
//   // Declare a fontStyle variable with default styles
//   var fontStyle = "color: tomato; font-size: 50px;";

//   // Check if the reason is "birthday"
//   if (reason == "birthday") {
//     console.log(`%cHappy birthday`, fontStyle);
//   }

//   // If reason is "champions", log a congrats message
//   else if (reason == "champions") {
//     console.log(`%cCongrats on the title!`, fontStyle);
//   }

//   // For any other reason, log a default message
//   else {
//     console.log("%cFind something to celebrate", fontStyle);
//   }
// }

// // Task 3: Run both the consoleStyler and the celebrateStyler functions
// // Call the consoleStyler function with appropriate arguments
// consoleStyler("#1d5c63", "#ede6db", "40px", "Congrats!");

// // Call the celebrateStyler function with an appropriate argument
// celebrateStyler("birthday");

// // Task 4: Insert a congratulatory and custom message
// function styleAndCelebrate(color, background, fontSize, txt, reason) {
//   // Call consoleStyler with the first four arguments
//   consoleStyler(color, background, fontSize, txt);

//   // Call celebrateStyler with the last argument
//   celebrateStyler(reason);
// }

// // Call styleAndCelebrate with appropriate arguments
// styleAndCelebrate("ef7c8e", "fae8e0", "30px", "You made it!", "champions");

/**
 * Hills and valleys
 */

// Given array nums, find hills and valleys and sum them.

// index i is part of a hill or a valley if the closest non-equal neighbors of i are smaller than nums[i] or larger than nums[i]

/** nums[i] = c
 * if !nums[i], continue
 * loop through array backwards to find non-equal number and report if smaller or larger
 * loop through the array forwards to do same
 * if back and front are both big or small, increase score
 * i++
 */

/**
 * Approach 2
 * index 0 is always not a hill or valley.
 * is bigger or smaller than index 1?
 * log bigger/smaller.
 * if index 1 is smaller than index 2, increase point, log bigger
 * else, continue.
 * index array.length - 1 is always not a hill or a valley.
 */
// const countHillValley = (n) => {
//   let p = null,
//     c = null,
//     sh = null,
//     sc = 0;
//   for (let i = 0; i < n.length; i++) {
//     if (i === 0) continue;
//     c = n[i];
//     p = n[i - 1];
//     if (p > c) {
//       if (sh && sh !== "b") {
//         sc++;
//       }
//       sh = "b";
//     } else if (p < c) {
//       if (sh && sh !== "s") {
//         sc++;
//       }
//       sh = "s";
//     }
//   }
//   return sc;
// };

// console.log(countHillValley([2, 4, 1, 1, 6, 5]));
// console.log(countHillValley([6, 6, 5, 5, 4, 1]));
// console.log(countHillValley([0]));
// console.log(countHillValley([]));

// class Animal {
//   constructor(lg) {
//     this.legs = lg;
//   }
// }

// class Dog extends Animal {
//   constructor() {
//     super(4);
//   }
// }

// var result = new Dog();
// console.log("Legs:", result.legs);

// class Animal {}

// class Cat extends Animal {
//   constructor() {
//     super();
//     this.noise = "meow";
//   }
// }

// var result = new Animal();
// console.log(result.noise);
// function testBracketsDynamicAccess() {
//   var dynamicKey;
//   if (Math.random() > 0.5) {
//     dynamicKey = "speed";
//   } else {
//     dynamicKey = "color";
//   }

//   var drone = {
//     speed: 15,
//     color: "orange",
//   };

//   console.log(drone[dynamicKey]);
// }
// testBracketsDynamicAccess();
// Task 1
var dairy = [
  "cheese",
  "sour cream",
  "milk",
  "yogurt",
  "ice cream",
  "milkshake",
];

const animal = {
  canJump: true,
};

const bird = Object.create(animal);
bird.canFly = true;
bird.hasFeathers = true;

// WRITE YOUR CODE HERE - Create the logDairy function and use a for...of loop to log each item in the dairy array
function logDairy() {
  for (item of dairy) {
    console.log(item);
  }
}
// Task 2
// WRITE YOUR CODE HERE - Create the birdCan function and use a for...of loop to log bird object's own properties
function birdCan() {
  for ([key, value] of Object.entries(bird)) {
    console.log(`${key}: ${value}`);
  }
}
// Task 3
// WRITE YOUR CODE HERE - Create the animalCan function and use a for...in loop to log all bird properties, including inherited ones
function animalCan() {
  for (let [prop, value] in bird) {
    console.log(prop, value);
  }
}

logDairy();
birdCan();
animalCan();

let obj = {
  key: 1,
  value: 4,
};

let output = { ...obj };
output.value -= obj.key;

console.log(output.value);
