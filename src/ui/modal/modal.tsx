import { ComponentProps, RefObject, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './styles.css';
import React from 'react';

export default function ModalDialog({
  open = false,
  ...props
}: Readonly<{
  open?: boolean;
}> &
  ComponentProps<typeof ModalDialogImpl>) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);
  
  if(!open) {
    return null;
  }

  return <ModalDialogImpl {...props} />;
}

function useOnClickOutside(
    elRef: RefObject<HTMLDivElement>,
    fn: () => void,
  ) {
    // Add event handling for close when clicking outside.
    useEffect(() => {
      function onClickOutside(
        event: MouseEvent | TouchEvent,
      ) {
        // No-op if clicked element is a descendant of element's contents.
        if (
          event.target instanceof Node &&
          elRef.current != null &&
          !elRef.current?.contains(event.target)
        ) {
          fn();
        }
      }

      document.addEventListener('mousedown', onClickOutside);
      document.addEventListener('touchstart', onClickOutside);
  
      return () => {
        document.removeEventListener(
          'mousedown',
          onClickOutside,
        );
        document.removeEventListener(
          'touchstart',
          onClickOutside,
        );
      };
    }, [fn]);
  }

function ModalDialogImpl({
  children,
  title,
  onClose,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}>) {

  const dialogRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dialogRef, onClose);
  
  return createPortal(
    <div className="modal-overlay">
      <div
        className="modal"
        ref={dialogRef}>
        <h1 className="modal-title">
          {title}
        </h1>
        <div>{children}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body,
  );
}