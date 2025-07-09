import { useState, useEffect } from "react";

const CreditCardForm = () => {
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    cardNumber: "",
    cardholderName: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
  });

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate the field
    const valid = validateField(name, value);
    if (!valid) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle input blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // Validate a specific field
  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "cardNumber":
        if (!value) {
          newErrors.cardNumber = "Invalid Card Number";
        } else if (value.length !== 16 || !/^\d+$/.test(value)) {
          newErrors.cardNumber = "Invalid Card Number";
        } else {
          newErrors.cardNumber = "";
        }
        break;

      case "cardholderName":
        if (!value) {
          newErrors.cardholderName = "Invalid Card Name";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          newErrors.cardholderName = "Invalid Card Name";
        } else {
          newErrors.cardholderName = "";
        }
        break;

      case "expirationMonth":
        if (!value) {
          newErrors.expirationMonth = "Invalid Month";
        } else if (value.length !== 2) {
          newErrors.expirationMonth = "Invalid Month";
        } else {
          const month = parseInt(value, 10);
          if (month < 1 || month > 12) {
            newErrors.expirationMonth = "Invalid Month";
          } else {
            newErrors.expirationMonth = "";
          }
        }
        break;

      case "expirationYear":
        if (!value) {
          newErrors.expirationYear = "Invalid Year";
        } else if (value.length !== 4) {
          newErrors.expirationYear = "Invalid Year";
        } else {
          const year = parseInt(value, 10);
          if (year < currentYear || year > currentYear + 3) {
            newErrors.expirationYear = "Invalid Year";
          } else {
            newErrors.expirationYear = "";
          }
        }
        break;

      case "cvv":
        if (!value) {
          newErrors.cvv = "Invalid CVV";
        } else if (value.length !== 3 || !/^\d+$/.test(value)) {
          newErrors.cvv = "Invalid CVV";
        } else {
          newErrors.cvv = "";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);

    const isValid = !Object.values(newErrors).some((error) => error !== "");
    const allFieldsHaveValue =
      formData.cardNumber.length > 0 &&
      formData.cardholderName.length > 0 &&
      formData.expirationMonth.length > 0 &&
      formData.expirationYear.length > 0 &&
      formData.cvv.length > 0;

    setIsSubmitEnabled(isValid);

    return newErrors[fieldName];
  };

  // Validate all fields
  const validateAllFields = () => {
    validateField("cardNumber", formData.cardNumber);
    validateField("cardholderName", formData.cardholderName);
    validateField("expirationMonth", formData.expirationMonth);
    validateField("expirationYear", formData.expirationYear);
    validateField("cvv", formData.cvv);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    validateAllFields();

    if (isSubmitEnabled) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="layout-column mb-15">
      <div className="layout-column mb-15">
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Card Number"
          data-testid="cardNumberInput"
        />
        {errors.cardNumber && (
          <p className="invalid-text" data-testid="numberInputError">
            {errors.cardNumber}
          </p>
        )}
      </div>

      <div className="layout-column mb-15">
        <input
          type="text"
          name="cardholderName"
          value={formData.cardholderName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Name on Card"
          data-testid="nameInput"
        />
        {errors.cardholderName && (
          <p className="invalid-text" data-testid="nameInputError">
            {errors.cardholderName}
          </p>
        )}
      </div>

      <div className="flex justify-content-around align-items-center">
        <div className="layout-column mb-30">
          <input
            type="number"
            name="expirationMonth"
            value={formData.expirationMonth}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Expiry Month"
            data-testid="monthInput"
          />
          {errors.expirationMonth && (
            <p className="invalid-text" data-testid="monthInputError">
              {errors.expirationMonth}
            </p>
          )}
        </div>

        <div className="layout-column mb-30">
          <input
            type="number"
            name="expirationYear"
            value={formData.expirationYear}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Expiry Year"
            data-testid="yearInput"
          />
          {errors.expirationYear && (
            <p className="invalid-text" data-testid="yearInputError">
              {errors.expirationYear}
            </p>
          )}
        </div>

        <div className="layout-column mb-30">
          <input
            type="number"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="CVV"
            data-testid="cvvInput"
          />
          {errors.cvv && (
            <p className="invalid-text" data-testid="cvvInputError">
              {errors.cvv}
            </p>
          )}
        </div>
      </div>

      <button
        data-testid="submitButton"
        onClick={handleSubmit}
        disabled={!isSubmitEnabled}
      >
        Submit
      </button>
    </div>
  );
};

export default CreditCardForm;
