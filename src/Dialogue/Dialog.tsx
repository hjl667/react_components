import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { RemoveScroll } from "react-remove-scroll";
import FocusLock from "react-focus-lock";
import { createPortal } from "react-dom";
import "./Dialog.css";

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface DialogCloseProps {
  children?: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

interface DialogPortalProps {
  children: ReactNode;
  container?: HTMLElement;
}

interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

interface DialogTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const DialogContext = createContext<DialogContextType | null>(null);

interface DialogRootProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const useDialogContext = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error(
      "Dialog child components must be used within the Dialog.Root"
    );
  }
  return context;
};

const DialogRoot: React.FC<DialogRootProps> = ({
  children,
  isOpen,
  setIsOpen,
}) => {
  const contextValue = {
    isOpen,
    setIsOpen,
  };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  );
};

const DialogPortal: React.FC<DialogPortalProps> = ({ children, container }) => {
  const { isOpen } = useDialogContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isOpen) return null;

  const portalContainer = container || document.body;

  return createPortal(
    <div className="dialog-container">{children}</div>,
    portalContainer
  );
};

const DialogOverlay: React.FC<DialogOverlayProps> = ({
  className,
  onClick,
  ...props
}) => {
  const { setIsOpen } = useDialogContext();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
    } else {
      setIsOpen(false);
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

const DialogContent: React.FC<DialogContentProps> = ({
  children,
  className,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <RemoveScroll>
      <FocusLock returnFocus={true}>
        <div className={`modal-inner ${className || ""}`} onClick={handleClick}>
          {children}
        </div>
      </FocusLock>
    </RemoveScroll>
  );
};

const DialogTitle: React.FC<DialogTitleProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`modal-title ${className || ""}`} {...props}>
      {children}
    </div>
  );
};

const DialogFooter: React.FC<DialogFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`modal-footer ${className || ""}`} {...props}>
      {children}
    </div>
  );
};

const DialogClose: React.FC<DialogCloseProps> = ({
  children,
  className,
  onClick,
}) => {
  const { setIsOpen } = useDialogContext();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick(e);
    }
    setIsOpen(false);
  };

  return (
    <button
      type="button"
      data-testid="close-button"
      className={`closeButton ${className || ""}`}
      onClick={handleClick}
    >
      {children || "Close"}
    </button>
  );
};

const Dialog = {
  Root: DialogRoot,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Title: DialogTitle,
  Footer: DialogFooter,
  Close: DialogClose,
};

export default Dialog;
