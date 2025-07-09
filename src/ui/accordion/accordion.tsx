import React, { useState } from "react";

// 定义accordion section的接口
interface AccordionSection {
  value: string;
  title: string;
  contents: React.ReactNode;
}

// 定义Accordion组件的props接口
interface AccordionProps {
  sections: AccordionSection[];
}

export default function Accordion({ sections }: AccordionProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  return (
    <div className="accordion">
      {sections.map(({ value, title, contents }) => {
        const isExpanded = openSections.has(value);

        return (
          <div className="accordion-item" key={value}>
            <button
              className="accordion-item-title"
              type="button"
              onClick={() => {
                const newOpenSections = new Set(openSections);
                newOpenSections.has(value)
                  ? newOpenSections.delete(value)
                  : newOpenSections.add(value);
                setOpenSections(newOpenSections);
              }}
            >
              {title}
              <span
                className={[
                  "accordion-icon",
                  isExpanded && "accordion-icon--rotated",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            </button>
            <div className="accordion-item-contents" hidden={!isExpanded}>
              {contents}
            </div>
          </div>
        );
      })}
    </div>
  );
}