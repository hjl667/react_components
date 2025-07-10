import React from "react";

import "./accrodion.css";


// icon change animation
 
interface Section {
  value: string;
  title: string;
  contents: string;
}

interface AccordionProps {
  sections: Section[]
}

const Accordion = ({sections}: AccordionProps) => {
  const [openSections, setOpenSections] = React.useState<Set<string>>(new Set());
  const handleClick = (value: string) => {
    const openSectionsCopy = new Set(openSections);
    if (openSectionsCopy.has(value)) {
      openSectionsCopy.delete(value);
    } else {
      openSectionsCopy.add(value);
    }
    setOpenSections(openSectionsCopy);
  }

  return (
    <div className="accordion">
      {sections.map(({title, contents, value})=>{
        const isOpen = openSections.has(value);
        return (
          <div className="accordion-item">
            <button className="accordion-item-title" onClick={() => handleClick(value)}>
              {title}
              <span className={`accordion-item-icon${isOpen ? " accordion-item-icon-rotated" : ""}`}>^</span>
            </button>
            {isOpen && <div className="accordion-item-contents">{contents}</div>}
          </div>
        )
      })}
    </div>
  )
}

export default Accordion;