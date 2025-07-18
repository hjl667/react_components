import "./App.css";
import * as React from "react";
import Accordion from "./ui/accordion/accordion";
import CreditCardForm from "./ui/form/employee/employeeForm";
import PokemonCard from "./ui/cards/pokemonCard/pokemonCard";
import Tabs from "./ui/tabs/tabs";
import DataTable from "./ui/table/DataTable";
import FlightBooker from "./ui/flightbooker/flightBooker";
import Calculator from "./ui/calculator/calculator";

function App() {
  const sections = [
    {
      value: "section1",
      title: "Section 1",
      contents: "This is the content for section 1",
    },
  ];
  const tabs = [
    {
      value: "section1",
      label: "Section 1",
      panel: <div>This is the content for section 1</div>,
    },
    {
      value: "section2",
      label: "Section 2",
      panel: <div>This is the content for section 2</div>,
    },
  ];
  return (
    <React.Fragment>
      <Accordion sections={sections} />
      <CreditCardForm />
      <PokemonCard isLoading={false} data={{url: "https://i.ebayimg.com/images/g/oVsAAOSwuQdm6-AQ/s-l1600.webp", name: "Pikachu"}} error={null} />
      <Tabs defaultValue="section1" items={tabs} />
      <DataTable/>
      <FlightBooker/>
      <Calculator/>
    </React.Fragment>
  );
}

export default App;