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
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const avatarDimensions = "225px";
const useStyles = makeStyles((theme) => ({
  large: {
    width: avatarDimensions,
    height: avatarDimensions,
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
  const avatar = <Avatar className={classes.large} src="/broken-image.jpg" />;
  const viewEmployee = (
    <>
      {avatar}

      <ButtonGroup>
        <h3>
          {props.firstName} {props.lastName}
        </h3>
        <Button className="LeftButton" onClick={() => setView(views.edit)}>
          Edit
        </Button>
        <Button className="RightButton" onClick={() => deleteEmployeeHandler()}>
          Delete
        </Button>
      </ButtonGroup>
    </>
  );

  const editEmployee = (
    <>
      {avatar}
      <ButtonGroup>
        <TextField
          aria-describedby="wnter-first-name"
          onChange={(e) => setEditedFirstName(e.target.value)}
          value={editedFirstName}
        />
        <TextField
          aria-describedby="enter-last-name"
          onChange={(e) => setEditedLastName(e.target.value)}
          value={editedLastName}
        />
        <Button className="LeftButton" onClick={() => updateEmployeeHandler()}>
          Save
        </Button>
        <Button className="RightButton" onClick={() => setView(views.view)}>
          Cancel
        </Button>
      </ButtonGroup>
    </>
  );

  const employeeView = view === views.view ? viewEmployee : editEmployee;

  return (
    <div className="EmployeeContainer" key={props.id}>
      <div className="EmployeeBox">{employeeView}</div>
      <div className="AddSkillsBox">
        <Box>
          <FormControl>
            <InputLabel htmlFor="my-input"></InputLabel>
            <Input
              aria-describedby="skill-input"
              onChange={(e) => setSkill(e.target.value)}
              value={skill}
            />
            <FormHelperText id="employee-name-input">
              Enter New Employee Skill
            </FormHelperText>
          </FormControl>
          <br />
          <Button
            float="right"
            variant="outlined"
            color="primary"
            onClick={() => addSkillHandler()}
          >
            Add Skill
          </Button>
        </Box>
      </div>
      <div className="SkillsContainer">
        <Container>
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
        </Container>
      </div>
    </div>
  );
}
