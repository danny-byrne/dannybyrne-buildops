import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Box,
  Button,
} from "@material-ui/core";

export default function CreateEmployee(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);

  const addSkill = (curSkill) => {
    setSkills((prevSkills) => [curSkill, ...prevSkills]);
    setSkill("");
  };

  return (
    <div id="CreateEmployeeContainer">
      Create New Employee
      <Box
        width={1 / 4}
        // display="flex" flexDirection="column"
      >
        <FormControl>
          <InputLabel htmlFor="my-input"></InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <FormHelperText id="my-helper-text">
            Enter New Employee First Name
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input"></InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <FormHelperText id="my-helper-text">
            Enter New Employee Last Name
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input"></InputLabel>
          <Input
            id="my-input"
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
          onClick={() => addSkill(skill)}
        >
          Add Skill
        </Button>
        <ul>
          {skills.map((e) => {
            return <li key={e}>{e}</li>;
          })}
        </ul>
      </Box>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          props.addEmployee({
            variables: {
              firstName,
              lastName,
              skills,
            },
          })
        }
      >
        Add Employee
      </Button>
    </div>
  );
}
