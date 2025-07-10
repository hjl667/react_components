import React, { useState, createContext, useContext, ReactNode } from "react";

// follow up
// disable a collapse item
// allow multiple collapse items to be open
// defaultActiveKey

interface CollapseContextType {
  activeKey: string | null;
  setActiveKey: (key: string | null) => void;
}

// 创建Collapse上下文
const CollapseContext = createContext<CollapseContextType | null>(null);

// 定义Collapse组件的props接口
interface CollapseProps {
  children: ReactNode;
}

// 定义CollapseItem的props接口
interface CollapseItemProps {
  header: ReactNode;
  children: ReactNode;
  itemKey: string;
}

// Collapse主组件
export function Collapse({ children }: CollapseProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const contextValue: CollapseContextType = {
    activeKey,
    setActiveKey
  };

  return (
    <CollapseContext.Provider value={contextValue}>
      <div className="collapse">
        {children}
      </div>
    </CollapseContext.Provider>
  );
}

// CollapseItem子组件
export function CollapseItem({ 
  header, 
  children, 
  itemKey, 
}: CollapseItemProps) {
  const context = useContext(CollapseContext);
  
  if (!context) {
    throw new Error("CollapseItem must be used within a Collapse component");
  }

  const { activeKey, setActiveKey } = context;
  const isExpanded = activeKey === itemKey;

  const handleToggle = () => {
    setActiveKey(isExpanded ? null : itemKey);
  };

  return (
    <div className={"collapse-item"}>
      <button
        className="collapse-header"
        onClick={handleToggle}
      >
        <span className="collapse-header-content">{header}</span>
        <span
          className={`collapse-icon ${isExpanded ? 'expanded' : ''}`}
        >
          ▼
        </span>
      </button>
      
      <div
        id={`collapse-content-${itemKey}`}
        className={`collapse-content ${isExpanded ? 'expanded' : ''}`}
        hidden={!isExpanded}
      >
        <div className="collapse-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
}

// 导出默认组件
export default Collapse;