import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import "./Dialog.css";

// 创建对话框上下文
const DialogContext = createContext(null);

// 使用上下文的钩子
const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog组件必须在Dialog.Root内部使用");
  }
  return context;
};

// 实现滚动锁定
const useScrollLock = (isLocked) => {
  useEffect(() => {
    if (!isLocked) return;

    // 保存当前滚动位置和样式
    const scrollY = window.scrollY;
    const originalStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      paddingRight: document.body.style.paddingRight,
    };

    // 计算滚动条宽度
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // 应用锁定样式
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    // 添加padding以防止页面抖动
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      // 恢复原始样式
      document.body.style.overflow = originalStyles.overflow;
      document.body.style.position = originalStyles.position;
      document.body.style.top = originalStyles.top;
      document.body.style.width = originalStyles.width;
      document.body.style.paddingRight = originalStyles.paddingRight;

      // 恢复滚动位置
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
};

// 根组件
const DialogRoot = ({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  lockScroll = true,
}) => {
  // 支持受控和非受控模式
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  // 合并状态更新函数
  const setOpen = (value) => {
    if (!isControlled) {
      setInternalOpen(value);
    }

    if (onOpenChange) {
      onOpenChange(value);
    }
  };

  // 处理ESC键关闭
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, setOpen]);

  // 应用滚动锁定
  useScrollLock(isOpen && lockScroll);

  // 内容引用用于焦点管理
  const contentRef = useRef(null);

  // 焦点管理
  useEffect(() => {
    if (isOpen && contentRef.current) {
      // 保存当前焦点元素
      const previouslyFocused = document.activeElement;

      // 获取第一个可聚焦元素并聚焦
      const focusableElements = contentRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else {
        contentRef.current.focus();
      }

      return () => {
        // 恢复之前的焦点
        if (previouslyFocused) {
          previouslyFocused.focus();
        }
      };
    }
  }, [isOpen]);

  // 传递上下文值
  const contextValue = {
    isOpen,
    setOpen,
    contentRef,
  };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  );
};

// Portal组件 - 处理传送门
const DialogPortal = ({ children, container }) => {
  const { isOpen } = useDialogContext();
  const [mounted, setMounted] = useState(false);

  // 客户端挂载检测
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 未挂载或不可见时不渲染
  if (!mounted || !isOpen) return null;

  // 确定容器元素
  const portalContainer = container || document.body;

  // 创建传送门
  return createPortal(
    <div className="dialog-container">{children}</div>,
    portalContainer
  );
};

// 遮罩层组件
const DialogOverlay = ({ className, onClick, ...props }) => {
  const { setOpen } = useDialogContext();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      setOpen(false);
    }
  };

  return (
    <div
      className={`overlay ${className || ""}`}
      onClick={handleClick}
      aria-hidden="true"
      {...props}
    />
  );
};

// 内容容器
const DialogContent = React.forwardRef(
  (
    {
      children,
      className,
      onClick,
      role = "dialog",
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    forwardedRef
  ) => {
    const { contentRef } = useDialogContext();

    // 合并引用
    const mergedRef = (node) => {
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
      contentRef.current = node;
    };

    const handleClick = (e) => {
      // 阻止事件冒泡到遮罩层
      e.stopPropagation();

      if (onClick) {
        onClick(e);
      }
    };

    return (
      <div
        ref={mergedRef}
        className={`modal-inner ${className || ""}`}
        onClick={handleClick}
        role={role}
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1} // 使元素可聚焦但不在Tab序列中
        {...props}
      >
        {children}
      </div>
    );
  }
);

// 标题组件
const DialogTitle = React.forwardRef(
  ({ children, className, id, ...props }, ref) => {
    // 生成唯一ID用于可访问性
    const [titleId] = useState(
      () => id || `dialog-title-${Math.random().toString(36).substr(2, 9)}`
    );

    return (
      <div
        id={titleId}
        ref={ref}
        className={`modal-title ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// 描述组件
const DialogDescription = React.forwardRef(
  ({ children, className, id, ...props }, ref) => {
    // 生成唯一ID用于可访问性
    const [descId] = useState(
      () => id || `dialog-desc-${Math.random().toString(36).substr(2, 9)}`
    );

    return (
      <div
        id={descId}
        ref={ref}
        className={`modal-description ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// 主体内容
const DialogBody = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={`modal-content ${className || ""}`} {...props}>
        {children}
      </div>
    );
  }
);

// 页脚
const DialogFooter = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={`modal-footer ${className || ""}`} {...props}>
        {children}
      </div>
    );
  }
);

// 关闭按钮
const DialogClose = React.forwardRef(
  ({ children, className, onClick, ...props }, ref) => {
    const { setOpen } = useDialogContext();

    const handleClick = (e) => {
      if (onClick) {
        onClick(e);
      }
      setOpen(false);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={`closeButton ${className || ""}`}
        onClick={handleClick}
        aria-label="关闭对话框"
        {...props}
      >
        {children || "关闭"}
      </button>
    );
  }
);

// 触发器
const DialogTrigger = React.forwardRef(
  ({ children, asChild, onClick, ...props }, ref) => {
    const { setOpen } = useDialogContext();

    const handleClick = (e) => {
      if (onClick) {
        onClick(e);
      }
      setOpen(true);
    };

    // 如果asChild为true，克隆子元素并添加属性
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref,
        onClick: handleClick,
        ...props,
      });
    }

    // 否则渲染按钮
    return (
      <button ref={ref} type="button" onClick={handleClick} {...props}>
        {children}
      </button>
    );
  }
);

// 导出组合组件
const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
};

export default Dialog;
