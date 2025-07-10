import "./App.css";
import * as React from "react";
import Accordion from "./ui/accordion/accordion";
import CreditCardForm from "./ui/form/employee/employeeForm";

function App() {
  const sections = [
    {
      value: "section1",
      title: "Section 1",
      contents: "This is the content for section 1",
    },
  ];
  return (
    <>
      <Accordion sections={sections} />
      <CreditCardForm />
    </>
  );
}

export default App;
