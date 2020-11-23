import {
  cleanup,
  render,
  fireEvent,
  getByText,
  screen,
  getAllByAltText,
} from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import CreateEmployee from "../components/CreateEmployee";

test("renders form with two inputs and a submit button", () => {
  render(<CreateEmployee addEmployee={() => {}} />);
  expect(
    screen.getByText(/Enter New Employee First Name/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/Enter New Employee Last Name/i)).toBeInTheDocument();
});
