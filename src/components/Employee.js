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

//size for styling Avatar component
const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 150,
    height: 150,
    left: 7,
    top: 7,
  },
}));

//views for determining whether to view or edit the employee
const views = {
  view: "view",
  edit: "edit",
};

/**
 * This component has the job of keeping track of any skills we're adding,
 * of displaying skills we've already entered, and editing or deleting those skills.
 * It determines what to display based on a set of views that we change depending on
 * whether in 'edit' or 'view' mode.
 */

export default function Employee(props) {
  const classes = useStyles();
  const [view, setView] = useState(views.view);
  const [skill, setSkill] = useState("");
  const [editedFirstName, setEditedFirstName] = useState(props.firstName);
  const [editedLastName, setEditedLastName] = useState(props.lastName);
  //handlers for mutation operations passed in props
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
  //avatar icon that would eventually receive the URL of an image and display it
  const avatar = <Avatar className={classes.avatar} src="/broken-image.jpg" />;
  const viewEmployee = (
    <>
      {avatar}
      <div className="EmployeeViewEditSave">
        <h3 className="EmployeeName">
          {props.firstName} {props.lastName}
        </h3>
        <ButtonGroup>
          <Button className="LeftButton" onClick={() => setView(views.edit)}>
            Edit
          </Button>
          <Button
            className="RightButton"
            onClick={() => deleteEmployeeHandler()}
          >
            Delete
          </Button>
        </ButtonGroup>
      </div>
    </>
  );

  const editEmployee = (
    <>
      {avatar}
      <div id="EmployeeViewEditSave">
        <ButtonGroup>
          <TextField
            aria-describedby="enter-first-name"
            onChange={(e) => setEditedFirstName(e.target.value)}
            value={editedFirstName}
            color="primary"
          />
          <TextField
            aria-describedby="enter-last-name"
            onChange={(e) => setEditedLastName(e.target.value)}
            value={editedLastName}
            color="primary"
          />
          <Button
            className="LeftButton"
            onClick={() => updateEmployeeHandler()}
          >
            Save
          </Button>
          <Button className="RightButton" onClick={() => setView(views.view)}>
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </>
  );

  const addSkillsBox = (
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
  );
  //determine whether to render view or edit
  const employeeView = view === views.view ? viewEmployee : editEmployee;

  return (
    <div className="EmployeeContainer" key={props.id}>
      <div className="EmployeeBox">{employeeView}</div>
      {addSkillsBox}
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
