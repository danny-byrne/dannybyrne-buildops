import React, { useState } from "react";
import Skill from "./Skill";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  ButtonGroup,
  TextField,
  Avatar,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: "100%",
    // height: "100%",
  },
}));

let l = console.log;

const views = {
  view: "view",
  edit: "edit",
};

export default function Employee(props) {
  const classes = useStyles();
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
    <>
      <Avatar className={classes.large} src="/broken-image.jpg" />
      {/* {props.firstName.substring(0, 1)} */}

      <ButtonGroup>
        <h3>
          {props.firstName} {props.lastName}
        </h3>
        <Button onClick={() => setView(views.edit)}>Edit</Button>
        <Button onClick={() => deleteEmployeeHandler()}>Delete</Button>
      </ButtonGroup>
    </>
  );

  const editEmployee = (
    <>
      <Avatar className={classes.large} src="/broken-image.jpg" />
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
    </>
  );

  const employeeView = view === views.view ? viewEmployee : editEmployee;

  return (
    <div className="EmployeeContainer" key={props.id}>
      <div className="EmployeeBox">{employeeView}</div>
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
        <div className="SkillsContainer">
          <h3>
            {props.firstName} {props.lastName}'s Skills:
          </h3>
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
        </div>
      </div>
    </div>
  );
}
