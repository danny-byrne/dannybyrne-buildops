import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import Employee from "../components/Employee";

test("renders an employee component using passed props", () => {
  render(<Employee skills={[]} />);
  expect(screen.getByText(/edit/i)).toBeInTheDocument();
  expect(screen.getByText(/delete/i)).toBeInTheDocument();
  // fireEvent.click(screen.getByText(/edit/i));
  // expect(screen.getByText(/save/i)).toBeInTheDocument();
  // expect(screen.getByText(/cancel/i)).toBeInTheDocument();
});
