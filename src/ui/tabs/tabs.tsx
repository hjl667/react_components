import React from "react";
import { useState } from "react";
import "./tabs2.css";

interface TabItem {
  label: string;
  value: string;
  panel: React.ReactNode;
}

interface TabsProps {
  defaultValue: string;
  items: TabItem[];
}

const Tabs: React.FC<TabsProps> =({ defaultValue, items }) => {
  const [value, setValue] = useState(defaultValue ?? items[0].value);

  return (
    <div className="tabs">
      <div className="tabs-list">
        {items.map(({ label, value: itemValue }) => {
          const isActiveValue = itemValue === value;
          return (
            <button
              key={itemValue}
              type="button"
              className={
                `tabs-list-item ${isActiveValue ? "tabs-list-item--active" : ""}`}
              onClick={() => {
                setValue(itemValue);
              }}
            >
              <span className="tabs-list-item-label">{label}</span>
            </button>
          );
        })}
      </div>
      <div>
        {items.map(({ panel, value: itemValue }) => (
          <div key={itemValue} hidden={itemValue !== value}>
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;