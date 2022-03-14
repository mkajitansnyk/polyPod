import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BaseHtrtPopUp from "../../src/react-components/htrtPopUp/BaseHtrtPopUp";

/**
 * @jest-environment jsdom
 */
it("Creates an empty container with close button", () => {
  const res = render(<BaseHtrtPopUp />);
  expect(res.container).toBeTruthy();
  expect(res.queryByRole("button")).toBeTruthy();
});

it("Renders children", () => {
  const res = render(
    <BaseHtrtPopUp>
      <p>test</p>
    </BaseHtrtPopUp>
  );
  expect(res.getByText("test")).toBeTruthy();
});

it("Close button is functional", () => {
  const onOk = jest.fn();
  const res = render(<BaseHtrtPopUp okLabel="ok button" onOk={onOk} />);
  expect(res.getByText("ok button")).toBeTruthy();
  fireEvent.click(res.getByRole("button"));
  expect(onOk).toHaveBeenCalledTimes(1);
});

it("Container classes are computed correctly", () => {
  [undefined, "test"].forEach((className, i) => {
    const res = render(<BaseHtrtPopUp classes={className} />);
    expect(res.container.firstChild.classList.length).toEqual(i + 1);
    res.unmount();
  });
});
