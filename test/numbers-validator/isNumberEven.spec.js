// Importing the 'expect' function from the 'chai' library to perform assertions
const { expect } = require('chai');

// Importing the NumbersValidator class from the relative path '../app/numbers-validator'
// so we can test its methods.
const NumbersValidator = require('../../app/numbers-validator');

// 'describe' is used to group related tests together into a test suite.
// Here, it describes a suite of tests for the 'isNumberEven' method of NumbersValidator class.
describe('isNumberEven', () => {
  // Declaring a variable 'validator' outside of the 'beforeEach' and 'it' blocks
  // to make it accessible throughout this describe block.
  let validator;

  // 'beforeEach' is a hook that runs before each test ('it' block) within this 'describe' block.
  // It's usually used for setting up the test environment.
  beforeEach(() => {
    // Instantiates a new NumbersValidator object before each test and assigns it to 'validator'
    validator = new NumbersValidator();
  });

  // 'afterEach' is a hook that runs after each test. It is often used for cleanup activities.
  afterEach(() => {
    // Sets the validator variable to null to clean up memory after each test
    validator = null;
  });

  // Additional tests would follow for different test cases, such as testing if an odd number
  // returns false or if passing a non-number throws an error.

describe("positive tests", () => {
  // 'it' is used for individual test cases - it includes the actual test.
  // The string argument describes what the test should do.
  it('should return true if number is even', () => {
    // Using 'expect' to assert that the 'isNumberEven' method returns true when
    // passed the even number 4. The '.to.be.equal(true)' is the actual assertion check.
    expect(validator.isNumberEven(4)).to.be.equal(true);
  });

  it('should return true if number is Integer', () => {
      expect(validator.isInteger(7)).to.be.equal(true);
  });

  });

describe("nigative tests", () => {
  it('should return false if number is non-even', () => {
    // Using 'expect' to assert that the 'isNumberEven' method returns true when
    // passed the even number 4. The '.to.be.equal(true)' is the actual assertion check.
    expect(validator.isNumberEven(5)).to.be.equal(false);
    });

    it('should throw an error when provided not a Number value', () => {
      const input = "four";
      const typeOfVariable = typeof input;

      expect(() => {
        validator.isNumberEven(input);
      }).to.throw(`[${input}] is not of type "Number" it is of type "${typeOfVariable}"`)
    });

    it('should throw an error when provided Integer not a Number value', () => {
      const n = "n";

      expect(() => {
        validator.isInteger(n);
      }).to.throw(`[${n}] is not a number`)
    });
    
  });
  
});

