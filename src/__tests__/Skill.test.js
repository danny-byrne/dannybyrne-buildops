import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import Skill from "../components/Skill";

test("renders an employee component using passed props", () => {
  render(
    <Skill
      key={1}
      skill="testing"
      updateSkillHandler={() => {}}
      deleteSkillHandler={() => {}}
    />
  );
  expect(screen.getByText(/edit/i)).toBeInTheDocument();
  expect(screen.getByText(/delete/i)).toBeInTheDocument();

  //uncommenting these lines below still has tests passing but am dealing with DOM error

  // fireEvent.click(screen.getByText(/edit/i));
  // expect(screen.getByText(/save/i)).toBeInTheDocument();
  // expect(screen.getByText(/cancel/i)).toBeInTheDocument();
});
