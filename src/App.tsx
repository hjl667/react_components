import "./App.css";
import * as React from "react";
import { images } from "./ui/carousel/images";
import Accordion from "./ui/accordion/accordion";
import CreditCardForm from "./ui/form/employee/employeeForm";
import PokemonCard from "./ui/cards/pokemonCard/pokemonCard";
import Tabs from "./ui/tabs/tabs";
import DataTable from "./ui/table/DataTable";
import FlightBooker from "./ui/flightbooker/flightBooker";
import Calculator from "./ui/calculator/calculator";
import ProgressBarContainer from "./ui/effects/progressBar1/progress";
import AnimatedTab from "./ui/animation/animatedTab";
import ImageCarousel from "./ui/carousel/carousel";
import Clock from "./ui/clock/clock";
import Modal from "./ui/modal/modal";
import GridLights from "./ui/states/gridLights/gridLights";
import TicTacToe from "./ui/states/ticTacToe/ticTacToe";
import FileExplorer from "./ui/directory/fileExplorer";
import { data } from "./ui/directory/data";

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
  const [open, setOpen] = React.useState(true);
  return (
    <React.Fragment>
      <Accordion sections={sections} />
      <CreditCardForm />
      <PokemonCard isLoading={false} data={{url: "https://i.ebayimg.com/images/g/oVsAAOSwuQdm6-AQ/s-l1600.webp", name: "Pikachu"}} error={null} />
      <Tabs defaultValue="section1" items={tabs} />
      <DataTable/>
      <FlightBooker/>
      <Calculator/>
      <ProgressBarContainer/>
      <AnimatedTab/>
      <ImageCarousel images={images}/>
      <Clock/>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal open={open} onClose={() => setOpen(false)}/>
      <GridLights/>
      <TicTacToe/>
      <FileExplorer data={data}/>
    </React.Fragment>
  );
}

export default App;