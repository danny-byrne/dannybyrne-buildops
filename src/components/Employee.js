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
  button: {
    width: 20,
    height: 10,
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
  const styles = useStyles();
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
  const avatar = <Avatar className={styles.avatar} src="/broken-image.jpg" />;
  const viewEmployee = (
    <>
      {avatar}
      <div id="EmployeeNameDisplay">
        <h3 className="EmployeeName">{props.firstName}</h3>
        <h3 className="EmployeeName">{props.lastName}</h3>
      </div>
      <ButtonGroup>
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
      <div id="EmployeeNameDisplay">
        <TextField
          className="EmployeeName"
          aria-describedby="enter-first-name"
          onChange={(e) => setEditedFirstName(e.target.value)}
          value={editedFirstName}
          color="primary"
        />
        <TextField
          className="EmployeeName"
          aria-describedby="enter-last-name"
          onChange={(e) => setEditedLastName(e.target.value)}
          value={editedLastName}
          color="primary"
        />
      </div>
      <div id="EmployeeNameMutations">
        <ButtonGroup>
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
      <FormControl>
        <InputLabel htmlFor="my-input"></InputLabel>
        <Input
          aria-describedby="skill-input"
          onChange={(e) => setSkill(e.target.value)}
          value={skill}
        />
        <FormHelperText id="employee-name-input">
          Enter {props.firstName} {props.lastName}'s Skills
        </FormHelperText>
      </FormControl>
      <Button
        className="EnterSkillButton"
        // float="right"
        variant="outlined"
        color="primary"
        onClick={() => addSkillHandler()}
      >
        Add Skill
      </Button>
    </div>
  );
  //determine whether to render view or edit
  const employeeView = view === views.view ? viewEmployee : editEmployee;

  return (
    <div className="EmployeeContainer">
      <div className="EmployeeBox">{employeeView}</div>
      <div className="SkillsContainer">
        {addSkillsBox}
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
  );
}
