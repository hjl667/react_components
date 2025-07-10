import React from "react";
import { useState, useEffect } from "react";
import "./styles.css";

interface FormData {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
}

interface Errors {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
}

const EmployeeForm = () => {
  const [formData, setFormData] = useState<FormData>({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
  });

  const [errors, setErrors] = useState<Errors>({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
  });

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Validate the field
    validateField(name, value);
  };

  // Handle input blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // Validate a specific field
  const validateField = (fieldName: string, value: string) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "employeeId":
        if (!value) {
          newErrors.employeeId = "Employee ID is required";
        } else if (value.length < 3 || value.length > 10) {
          newErrors.employeeId = "Employee ID must be 3-10 characters";
        } else if (!/^[A-Z0-9]+$/.test(value)) {
          newErrors.employeeId = "Employee ID must contain only uppercase letters and numbers";
        } else {
          newErrors.employeeId = "";
        }
        break;

      case "firstName":
        if (!value) {
          newErrors.firstName = "First name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          newErrors.firstName = "First name must contain only letters";
        } else if (value.length < 2 || value.length > 20) {
          newErrors.firstName = "First name must be 2-20 characters";
        } else {
          newErrors.firstName = "";
        }
        break;

      case "lastName":
        if (!value) {
          newErrors.lastName = "Last name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          newErrors.lastName = "Last name must contain only letters";
        } else if (value.length < 2 || value.length > 20) {
          newErrors.lastName = "Last name must be 2-20 characters";
        } else {
          newErrors.lastName = "";
        }
        break;

      case "email":
        if (!value) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Invalid email format";
        } else {
          newErrors.email = "";
        }
        break;

      case "phone":
        if (!value) {
          newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
          newErrors.phone = "Phone number must be 10 digits";
        } else {
          newErrors.phone = "";
        }
        break;

      case "department":
        if (!value) {
          newErrors.department = "Department is required";
        } else {
          newErrors.department = "";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);

    const isValid = !Object.values(newErrors).some((error) => error !== "");
    const allFieldsHaveValue =
      formData.employeeId.length > 0 &&
      formData.firstName.length > 0 &&
      formData.lastName.length > 0 &&
      formData.email.length > 0 &&
      formData.phone.length > 0 &&
      formData.department.length > 0;

    setIsSubmitEnabled(isValid && allFieldsHaveValue);

    return newErrors[fieldName as keyof Errors];
  };

  // Validate all fields
  const validateAllFields = () => {
    validateField("employeeId", formData.employeeId);
    validateField("firstName", formData.firstName);
    validateField("lastName", formData.lastName);
    validateField("email", formData.email);
    validateField("phone", formData.phone);
    validateField("department", formData.department);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    if (e) e.preventDefault();
    validateAllFields();

    if (isSubmitEnabled) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="employee-form">
      <div className="layout-column mb-15">
        <input
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Employee ID"
          data-testid="employeeIdInput"
        />
        {errors.employeeId && (
          <p className="invalid-text" data-testid="employeeIdInputError">
            {errors.employeeId}
          </p>
        )}
      </div>

      <div className="layout-column mb-15">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="First Name"
          data-testid="firstNameInput"
        />
        {errors.firstName && (
          <p className="invalid-text" data-testid="firstNameInputError">
            {errors.firstName}
          </p>
        )}
      </div>

      <div className="layout-column mb-15">
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Last Name"
          data-testid="lastNameInput"
        />
        {errors.lastName && (
          <p className="invalid-text" data-testid="lastNameInputError">
            {errors.lastName}
          </p>
        )}
      </div>

      <div className="layout-column mb-15">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email Address"
          data-testid="emailInput"
        />
        {errors.email && (
          <p className="invalid-text" data-testid="emailInputError">
            {errors.email}
          </p>
        )}
      </div>

      <div className="layout-column mb-15">
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Phone Number"
          data-testid="phoneInput"
        />
        {errors.phone && (
          <p className="invalid-text" data-testid="phoneInputError">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="layout-column mb-15">
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          onBlur={handleBlur}
          data-testid="departmentSelect"
        >
          <option value="">Select Department</option>
          <option value="engineering">Engineering</option>
          <option value="marketing">Marketing</option>
          <option value="sales">Sales</option>
          <option value="hr">Human Resources</option>
          <option value="finance">Finance</option>
          <option value="operations">Operations</option>
        </select>
        {errors.department && (
          <p className="invalid-text" data-testid="departmentSelectError">
            {errors.department}
          </p>
        )}
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

export default EmployeeForm;
