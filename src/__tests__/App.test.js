import {
  cleanup,
  render,
  fireEvent,
  getByText,
  screen,
  getAllByAltText,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import "@testing-library/jest-dom";

test("renders page with title", () => {
  render(<App />);
  setTimeout(() => {}, 500);
  expect(screen.getByText(/employees list/i)).toBeInTheDocument();
});
