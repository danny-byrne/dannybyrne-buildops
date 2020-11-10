import React, { useState } from "react";
import Skill from "./Skill";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Box,
  Button,
} from "@material-ui/core";

let l = console.log;

export default function Employee(props) {
  // l(props.firstName);
  const [skill, setSkill] = useState("");

  // l("in employee skills are", props.skills);
  const addSkillHandler = () => {
    // l("a skill was added", skill);
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
    //pass in skill params { name, }
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

  return (
    <div key={props.id}>
      <h3>
        {props.firstName} {props.lastName}
      </h3>
      <h2>Skills:</h2>
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
      <ul>
        {props.skills !== null &&
          props.skills.map((skill) => {
            // l("creating skills views", skill);
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
  );
}
