Ensure you read the following instructions carefully:

- Choose 2 from easy, 1 from the medium, and 1 from hard and solve a total of 4 questions from the following
- Solve the following problems with Javascript only.

### EASY

1. Am I Perfect?

   - Write a function that tells if a given number is perfect or not. A number is called perfect if the sum of the factors of a number (excluding the number itself) is the number itself.
   - Output
     - Return “Perfect” if the number is perfect
     - if the sum of factors is greater than the input return “Abundant”
     - if the sum of factors is lesser than the input return “Deficient”.

   Example:

   ```js
   1) 6 -> factors(1,2,3) -> sum (1+2+3) = 6 (perfect number)
   2) 12 -> factors(1,2,3,4,6) -> sum(1+2+3+4+6) = 16 > 12 (Abundant)
   3) 8 -> factors(1,2,4) -> sum(1+2+4) = 7 < 8 (Deficient)
   ```

   function analyze(n) {
  let factorSum = 0;
  for (let i = 1; i < n; i++) {
    if (n % i === 0) {
      factorSum += i;
    }
  }

  if (factorSum === n) {
    return "Number is perfect.";
  } else if (factorSum > n) {
    return "Number is abundant.";
  } else {
    return "Number is deficient.";
  }
}

const input = 45;
console.log(analyze(input));


2. Shorten me!

   - Implement 2 functions, one that shortens a string of values by replacing consecutive data elements with just one data value and count of the consecutive values.
   - For Example, we can shorten the characters “AAAAAAAAAAABWWWWWWWWWWWBB” with “11AB11W2B”
   - The other function should take the shortened string and give back the original value
   - For example, we take the above-shortened characters “11AB11W2B” and get back “AAAAAAAAAAABWWWWWWWWWWWBB”

   - For simplicity, you can assume that the unencoded string will only contain the letters A through Z (either lower or upper case) and whitespace. This way data to be encoded will never contain any numbers and numbers inside data to be decoded always represent the count for the following character.

3. How many trails to 1?

   - Take a positive integer x. If x is even, divide x by 2 to get x / 2. If x is odd, multiply x by 3 and add 1 to get 3x + 1. Repeat the process indefinitely. No matter which number you start with, you will always reach 1 eventually during the process.
   - Given a number x, return the number of steps required to reach 1.

   Examples

   ```js
   Starting with x = 12, the steps would be as follows:

   12 - even (divide by 2)
   6 - even (divide by 2)
   3 - odd (3(3) + 1)
   10 - even (divide by 2)
   5 - odd (3(5) + 1)
   16 - even (divide by 2)
   8 - even (divide by 2)
   4 - even (divide by 2)
   2 - even (divide by 2)
   1 - stop

   We got to 1 in 9 steps. So for input x = 12, the return value would be 9.
   ```

   function countStepsToReachOne(startingNumber) {
  let stepsCount = 0;
  while (startingNumber !== 1) {
    if (startingNumber % 2 === 0) {
      startingNumber = startingNumber / 2;
    } else {
      startingNumber = 3 * startingNumber + 1;
    }
    stepsCount++;
  }
  return stepsCount;
}

### MEDIUM

1. Greater than and less than in a matrix

   - Detect values in a matrix that is greater than or equal to every element in its row and less than or equal to every element in its column.
   - So say you have a matrix-like so:

   ```js
       1  2  3
     |---------
   1 | 7  8  7
   2 | 5  4  2    value at column 1, row 2, with 5 (Ans)
   3 | 8  6  7
   ```

   - A matrix may have zero or more values like these which are greater than or equal and less than or equal.
   - Your code should be able to provide a list of all the values for any given matrix. If no values are found it should return an empty list.
   - The matrix can have a different number of rows and columns (Non-square matrix).

2. Hide that PIN!

   - Write a function that converts a given PIN to a series of texts that ensures it can be sent out in plain sight without anyone knowing it.
   - You first convert the given input number into binary and then use the table below to generate the string equivalent.

   ```js
   1 = pop
   10 = double rip
   100 = hide your mints
   1000 = fall
   10000 = reverse the order of the output.
   ```

   Examples:

   ```js
   3 -> binary 11 -> 1 + 10 -> output -> [“pop”,”double rip”]

   19 -> binary 10011 -> 1 + 10 + 10000 -> output -> [“double rip”,”pop”]
   ```

   - NOTE: Please note the reversal operation in the second example due to the presence of 10000

function findSpecialValues(matrix) {
  const specialValues = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const currentValue = matrix[row][col];
      let isSpecial = true;

      for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][col] < currentValue) {
          isSpecial = false;
          break;
        }
      }

      if (isSpecial) {
        for (let j = 0; j < matrix[0].length; j++) {
          if (matrix[row][j] > currentValue) {
            isSpecial = false;
            break;
          }
        }
      }

      if (isSpecial) {
        specialValues.push(currentValue);
      }
    }
  }

  return specialValues;
}


### HARD

1. Catch the fish

   - Long lost in the Viking village, you and 3 others are lost and looking for food. Lucky for you guys find a river that has plenty of fish. You gather around to catch and realize that everyone going together to catch is not an efficient way, since the fish moves downwards along with the flow of the river.
   - So you guys follow a pattern where every (Kth) fish is hit by the 2nd guy. Every (Lth) fish is hit by the 3rd guy, and every (Mth) fish gets hit by the 4th guy. Finally every (Nth) fish you hit it yourself.
   - So, your job is to find the efficiency of hitting fish, given the total number of fish and the pattern followed.
   - Write a function that takes k,l,m,n, total as input and returns how many fishes get hit by the above pattern.

   Example:

   ```js
   K: 1, L: 2, M: 3, N: 4, Total: 12
   Output: 12
   - Explanation: every Kth fish got hit by the 1st guy (k=1), the fish was still hit by other patterns but k=1 was sufficient to hit all fishes, so the output is 12.
   ```

   ```js
   K: 2, L: 3, M: 4, N: 5, Total: 24
   Output: 17
   Explanation:
   According to the pattern, fish numbers 1, 7, 11, 13, 17, 19, and 23 escape without getting hit by either of the 4 people.
   ```

2. n-Chai

   - You like chai very much and you want to drink exactly “n” cups of chai. You would be happy to drink more but you have exactly “n” chai bags, “g” of them are green, and “b” are black.
   - You would not like to drink the same chai (green or black) more than “k” times in a row.
   - Your task is to determine the order of making tea so that you will be able to drink “n” cups of tea, without drinking the same chai more than “k” times in a row, or to inform that it is impossible to do that with the given inputs. Each chai bag can be used exactly once.
   - Note: g + b is always equal to “n”. I.e number of green and black chai bags total is always equal to the number of times you want to drink chai.

   Example:

   ```js
   Input -> n: 5, k: 1, g: 3, b: 2
   Output -> [“Green”,”Black”,”Green”,”Black”,”Green”]

   Input -> n: 4, k: 3, g: 4, b: 0
   Output -> []
   ```
