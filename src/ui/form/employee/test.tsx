import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreditCardForm from "./employeeForm";

const TEST_IDS = {
  cardNumberInput: "cardNumberInput",
  nameInput: "nameInput",
  yearInput: "yearInput",
  monthInput: "monthInput",
  cvvInput: "cvvInput",
  submitButton: "submitButton",
  numberInputError: "numberInputError",
  nameInputError: "nameInputError",
  monthInputError: "monthInputError",
  yearInputError: "yearInputError",
  cvvInputError: "cvvInputError",
};

// Helper function to generate random number of specified length
const generateNumber = (len) => {
  let number = "";
  for (let i = 0; i < len; i++) {
    number += Math.floor(Math.random() * 10);
  }
  return number;
};

describe("Payment Validation", () => {
  let getByTestId;
  let queryByTestId;
  let cardNumberInput;
  let nameInput;
  let yearInput;
  let monthInput;
  let cvvInput;
  let submitButton;
  let numberInputError;
  let nameInputError;
  let monthInputError;
  let yearInputError;
  let cvvInputError;

  beforeEach(() => {
    const app = render(<CreditCardForm />);
    getByTestId = app.getByTestId;
    queryByTestId = app.queryByTestId;

    cardNumberInput = getByTestId(TEST_IDS.cardNumberInput);
    nameInput = getByTestId(TEST_IDS.nameInput);
    monthInput = getByTestId(TEST_IDS.monthInput);
    yearInput = getByTestId(TEST_IDS.yearInput);
    cvvInput = getByTestId(TEST_IDS.cvvInput);
    submitButton = getByTestId(TEST_IDS.submitButton);
  });

  afterEach(() => {
    cleanup();
  });

  it("Should have the correct input type for all fields", () => {
    expect(cardNumberInput).toHaveAttribute("type", "text");
    expect(nameInput).toHaveAttribute("type", "text");
    expect(monthInput).toHaveAttribute("type", "number");
    expect(yearInput).toHaveAttribute("type", "number");
    expect(cvvInput).toHaveAttribute("type", "number");
  });

  it("Should validate the card number correctly", () => {
    let correctCardNumber = generateNumber(16);
    fireEvent.change(cardNumberInput, {
      target: {
        value: correctCardNumber,
      },
    });
    numberInputError = queryByTestId(TEST_IDS.numberInputError);
    expect(numberInputError).toBeNull();

    let wrongCardNumber = correctCardNumber;
    wrongCardNumber = wrongCardNumber.slice(0, 14);
    wrongCardNumber += "Z";
    fireEvent.change(cardNumberInput, {
      target: {
        value: wrongCardNumber,
      },
    });
    numberInputError = queryByTestId(TEST_IDS.numberInputError);
    expect(numberInputError).not.toBeNull();

    // Test invalid card number (too long)
    wrongCardNumber = wrongCardNumber.slice(0, 14);
    wrongCardNumber += "12345"; // Make it too long
    fireEvent.change(cardNumberInput, {
      target: {
        value: wrongCardNumber,
      },
    });
    numberInputError = queryByTestId(TEST_IDS.numberInputError);
    expect(numberInputError).not.toBeNull();

    // Test empty card number
    fireEvent.change(cardNumberInput, {
      target: {
        value: "",
      },
    });
    numberInputError = queryByTestId(TEST_IDS.numberInputError);
    expect(numberInputError).not.toBeNull();
  });

  it("Should validate the name correctly", () => {
    // Test valid name
    //John1#
    const correctName = "John";
    fireEvent.change(nameInput, {
      target: {
        value: correctName,
      },
    });
    nameInputError = queryByTestId(TEST_IDS.nameInputError);
    expect(nameInputError).toBeNull();

    // Test invalid name (with numbers)
    let wrongName = correctName;
    wrongName += "1#";
    fireEvent.change(nameInput, {
      target: {
        value: wrongName,
      },
    });
    nameInputError = queryByTestId(TEST_IDS.nameInputError);
    expect(nameInputError).not.toBeNull();

    // Test empty name
    fireEvent.change(nameInput, {
      target: {
        value: "",
      },
    });
    nameInputError = queryByTestId(TEST_IDS.nameInputError);
    expect(nameInputError).not.toBeNull();
  });

  it("Should validate the month correctly", () => {
    // Test valid month (October)
    const correctMonth = "10";
    fireEvent.change(monthInput, {
      target: {
        value: correctMonth,
      },
    });
    monthInputError = queryByTestId(TEST_IDS.monthInputError);
    expect(monthInputError).toBeNull();

    // Test valid month (July)
    const anotherCorrectMonth = "07";
    fireEvent.change(monthInput, {
      target: {
        value: anotherCorrectMonth,
      },
    });
    monthInputError = queryByTestId(TEST_IDS.monthInputError);
    expect(monthInputError).toBeNull();

    // Test invalid month (too large)
    const wrongMonth = "123";
    fireEvent.change(monthInput, {
      target: {
        value: wrongMonth,
      },
    });
    monthInputError = queryByTestId(TEST_IDS.monthInputError);
    expect(monthInputError).not.toBeNull();

    // Test empty month
    fireEvent.change(monthInput, {
      target: {
        value: "",
      },
    });
    monthInputError = queryByTestId(TEST_IDS.monthInputError);
    expect(monthInputError).not.toBeNull();
  });

  it("Should validate the year correctly", () => {
    const currentYear = new Date().getFullYear();

    // Test valid year (current year)
    const correctYear = currentYear.toString();
    fireEvent.change(yearInput, {
      target: {
        value: correctYear,
      },
    });
    yearInputError = queryByTestId(TEST_IDS.yearInputError);
    expect(yearInputError).toBeNull();

    // Test valid year (current year + 2)
    const anotherCorrectYear = (currentYear + 2).toString();
    fireEvent.change(yearInput, {
      target: {
        value: anotherCorrectYear,
      },
    });
    yearInputError = queryByTestId(TEST_IDS.yearInputError);
    expect(yearInputError).toBeNull();

    // Test invalid year (too far in future - current year + 4)
    const tooFarYear = (currentYear + 4).toString();
    fireEvent.change(yearInput, {
      target: {
        value: tooFarYear,
      },
    });
    yearInputError = queryByTestId(TEST_IDS.yearInputError);
    expect(yearInputError).not.toBeNull();

    // Test invalid year (past year)
    const pastYear = (currentYear - 1).toString();
    fireEvent.change(yearInput, {
      target: {
        value: pastYear,
      },
    });
    yearInputError = queryByTestId(TEST_IDS.yearInputError);
    expect(yearInputError).not.toBeNull();

    // Test empty year
    fireEvent.change(yearInput, {
      target: {
        value: "",
      },
    });
    yearInputError = queryByTestId(TEST_IDS.yearInputError);
    expect(yearInputError).not.toBeNull();
  });

  it("Should validate the CVV correctly", () => {
    // Test valid CVV
    const correctCVV = "123";
    fireEvent.change(cvvInput, {
      target: {
        value: correctCVV,
      },
    });
    cvvInputError = queryByTestId(TEST_IDS.cvvInputError);
    expect(cvvInputError).toBeNull();

    // Test invalid CVV (too short)
    const shortCVV = "12";
    fireEvent.change(cvvInput, {
      target: {
        value: shortCVV,
      },
    });
    cvvInputError = queryByTestId(TEST_IDS.cvvInputError);
    expect(cvvInputError).not.toBeNull();

    // Test invalid CVV (too long)
    const longCVV = "1234";
    fireEvent.change(cvvInput, {
      target: {
        value: longCVV,
      },
    });
    cvvInputError = queryByTestId(TEST_IDS.cvvInputError);
    expect(cvvInputError).not.toBeNull();

    // Test invalid CVV (non-numeric)
    const nonNumericCVV = "12A";
    fireEvent.change(cvvInput, {
      target: {
        value: nonNumericCVV,
      },
    });
    cvvInputError = queryByTestId(TEST_IDS.cvvInputError);
    expect(cvvInputError).not.toBeNull();

    // Test empty CVV
    fireEvent.change(cvvInput, {
      target: {
        value: "",
      },
    });
    cvvInputError = queryByTestId(TEST_IDS.cvvInputError);
    expect(cvvInputError).not.toBeNull();
  });

  it("Should have disabled submit button initially", () => {
    expect(submitButton).toBeDisabled();
  });

  it("Should enable submit button when all fields are valid", () => {
    // Fill in all fields with valid values
    const currentYear = new Date().getFullYear();

    fireEvent.change(cardNumberInput, {
      target: { value: generateNumber(16) },
    });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(monthInput, { target: { value: "10" } });
    fireEvent.change(yearInput, { target: { value: currentYear.toString() } });
    fireEvent.change(cvvInput, { target: { value: "123" } });

    // Check if submit button is enabled
    expect(submitButton).not.toBeDisabled();

    // Make one field invalid and check if button becomes disabled again
    fireEvent.change(cardNumberInput, { target: { value: "123" } }); // Invalid length
    expect(submitButton).toBeDisabled();
  });
});
