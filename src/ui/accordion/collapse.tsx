import React, { useState, createContext, useContext, ReactNode } from "react";

// 定义Collapse的上下文接口
interface CollapseContextType {
  activeKey: string | null;
  setActiveKey: (key: string | null) => void;
  allowMultiple?: boolean;
}

// 创建Collapse上下文
const CollapseContext = createContext<CollapseContextType | null>(null);

// 定义Collapse组件的props接口
interface CollapseProps {
  children: ReactNode;
  defaultActiveKey?: string | string[];
  allowMultiple?: boolean;
  className?: string;
}

// 定义CollapseItem的props接口
interface CollapseItemProps {
  header: ReactNode;
  children: ReactNode;
  itemKey: string;
  disabled?: boolean;
  className?: string;
}

// Collapse主组件
export function Collapse({ 
  children, 
  defaultActiveKey, 
  allowMultiple = false,
  className = ""
}: CollapseProps) {
  // 处理默认展开状态
  const getInitialActiveKey = (): string | null => {
    if (!defaultActiveKey) return null;
    
    if (allowMultiple) {
      // 多选模式：返回第一个key
      return Array.isArray(defaultActiveKey) ? defaultActiveKey[0] : defaultActiveKey;
    } else {
      // 单选模式
      return Array.isArray(defaultActiveKey) ? defaultActiveKey[0] : defaultActiveKey;
    }
  };

  const [activeKey, setActiveKey] = useState<string | null>(getInitialActiveKey());

  const contextValue: CollapseContextType = {
    activeKey,
    setActiveKey,
    allowMultiple
  };

  return (
    <CollapseContext.Provider value={contextValue}>
      <div className={`collapse ${className}`}>
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
  disabled = false,
  className = ""
}: CollapseItemProps) {
  const context = useContext(CollapseContext);
  
  if (!context) {
    throw new Error("CollapseItem must be used within a Collapse component");
  }

  const { activeKey, setActiveKey, allowMultiple } = context;
  const isExpanded = activeKey === itemKey;

  const handleToggle = () => {
    if (disabled) return;

    if (allowMultiple) {
      // 多选模式：切换当前项
      setActiveKey(isExpanded ? null : itemKey);
    } else {
      // 单选模式：如果当前项已展开则收起，否则展开当前项
      setActiveKey(isExpanded ? null : itemKey);
    }
  };

  return (
    <div className={`collapse-item ${className} ${disabled ? 'disabled' : ''}`}>
      <button
        className="collapse-header"
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-expanded={isExpanded}
        aria-controls={`collapse-content-${itemKey}`}
      >
        <span className="collapse-header-content">{header}</span>
        <span
          aria-hidden={true}
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
