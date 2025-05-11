import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dialog from "./Dialog";

describe("Dialog Component", () => {
  const renderDialog = (isOpen = true, setIsOpen = jest.fn()) => {
    return render(
      <Dialog.Root isOpen={isOpen} setIsOpen={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay data-testid="overlay" />
          <Dialog.Content>
            <Dialog.Title>测试标题</Dialog.Title>
            <p>这里是内容</p>
            <Dialog.Footer>
              <Dialog.Close data-testid="close-button">关闭</Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  };

  it("should render title and content when open", () => {
    renderDialog();
    expect(screen.getByText("测试标题")).toBeTruthy();
    expect(screen.getByText("关闭")).toBeTruthy();
  });

  it("should call setIsOpen(false) when overlay is clicked", () => {
    const setIsOpen = jest.fn();
    renderDialog(true, setIsOpen);

    const overlay = screen.getByTestId("overlay");
    fireEvent.click(overlay);

    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  it("should call setIsOpen(false) when close button is clicked", () => {
    const setIsOpen = jest.fn();
    renderDialog(true, setIsOpen);

    const closeBtn = screen.getByTestId("close-button");
    fireEvent.click(closeBtn);

    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  it("should not render content when isOpen is false", () => {
    renderDialog(false);
    expect(screen.queryByText("测试标题")).toBeNull();
    expect(screen.queryByText("关闭")).toBeNull();
  });
});
