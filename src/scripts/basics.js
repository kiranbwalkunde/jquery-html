/**
 * Create function that takes integer parameter as input and returns factorial of that number.
 */
function calculateFatorialOfANumber(value) {
  var result = 1;
  while (value !== 0) {
    result = result * value;
    value --;
  }
  console.log('The factorial is: ', result);
}

calculateFatorialOfANumber(10);