import React, { useState } from "react";
import Skill from "./Skill";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Box,
  Button,
  ButtonGroup,
  TextField,
} from "@material-ui/core";

let l = console.log;

const views = {
  view: "view",
  edit: "edit",
};

export default function Employee(props) {
  const [view, setView] = useState(views.view);
  const [skill, setSkill] = useState("");
  const [editedFirstName, setEditedFirstName] = useState(props.firstName);
  const [editedLastName, setEditedLastName] = useState(props.lastName);

  const addSkillHandler = () => {
    let curVariables = {
      employeeId: props.id,
      name: skill,
    };
    props.skillHandlers.addSkill({
      variables: {
        input: curVariables,
      },
    });
    setSkill("");
  };

  const updateSkillHandler = (skillParams) => {
    let curVariables = { ...skillParams };
    props.skillHandlers.updateSkill({
      variables: {
        input: curVariables,
      },
    });
  };

  const deleteSkillHandler = (skillParams) => {
    let curVariables = { ...skillParams };
    props.skillHandlers.deleteSkill({
      variables: {
        input: curVariables,
      },
    });
  };

  const updateEmployeeHandler = () => {
    let curVariables = {
      firstname: editedFirstName,
      lastname: editedLastName,
      id: props.id,
    };
    props.employeeHandlers.updateEmployee({
      variables: {
        input: curVariables,
      },
    });
    setView(views.view);
  };

  const deleteEmployeeHandler = () => {
    let curVariables = { id: props.id };
    props.employeeHandlers.deleteEmployee({
      variables: {
        input: curVariables,
      },
    });
  };

  const viewEmployee = (
    <ButtonGroup>
      <h3>
        {props.firstName} {props.lastName}
      </h3>
      <Button onClick={() => setView(views.edit)}>Edit</Button>
      <Button onClick={() => deleteEmployeeHandler()}>Delete</Button>
    </ButtonGroup>
  );

  const editEmployee = (
    <ButtonGroup>
      <TextField
        aria-describedby="my-helper-text"
        onChange={(e) => setEditedFirstName(e.target.value)}
        value={editedFirstName}
      />
      <TextField
        aria-describedby="my-helper-text"
        onChange={(e) => setEditedLastName(e.target.value)}
        value={editedLastName}
      />
      <Button onClick={() => updateEmployeeHandler()}>Save</Button>
      <Button onClick={() => setView(views.view)}>Cancel</Button>
    </ButtonGroup>
  );

  const employeeView = view === views.view ? viewEmployee : editEmployee;

  return (
    <div className="EmployeeContainer" key={props.id}>
      {employeeView}
      <div className="SkillsBox">
        <FormControl>
          <InputLabel htmlFor="my-input"></InputLabel>
          <Input
            aria-describedby="my-helper-text"
            onChange={(e) => setSkill(e.target.value)}
            value={skill}
          />
          <FormHelperText id="my-helper-text">
            Enter New Employee Skill
          </FormHelperText>
        </FormControl>
        <br />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => addSkillHandler()}
        >
          Add Skill
        </Button>
        <h3>
          {props.firstName} {props.lastName}'s Skills:
        </h3>
        <ul>
          {props.skills !== null &&
            props.skills.map((skill) => {
              return (
                <Skill
                  key={skill.id}
                  skill={skill}
                  updateSkillHandler={updateSkillHandler}
                  deleteSkillHandler={deleteSkillHandler}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
}
