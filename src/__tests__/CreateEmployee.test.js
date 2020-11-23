import { render, screen } from "@testing-library/react";
import React from "react";

import CreateEmployee from "../components/CreateEmployee";

test("renders form with two inputs and a submit button", () => {
  render(<CreateEmployee addEmployee={() => {}} />);
  expect(
    screen.getByText(/Enter New Employee First Name/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/Enter New Employee Last Name/i)).toBeInTheDocument();
});
