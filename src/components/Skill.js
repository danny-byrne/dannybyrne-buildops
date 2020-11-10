import React, { useState } from "react";
import { Box, Button, ButtonGroup } from "@material-ui/core";

const views = {
  view: "view",
  edit: "edit",
  edited: "edited",
};

export default function Skill(props) {
  const [editedSkill, seteditedSkill] = useState(props.skill);
  const [view, setView] = useState(views.view);
  const {
    skill: { id, employeeId, name },
  } = props;
  // console.log("in skill", props.skill);

  const updateSkillHandler = () => {
    console.log("updating skill", editedSkill);
    props.updateSkillHandler({ id, employeeId, name: editedSkill });
  };

  const deleteSkillHandler = () => {
    console.log("deleting skill", name);
    props.deleteSkillHandler({ id });
  };

  const viewSkill = (
    <ButtonGroup>
      <Button onClick={() => setView(view.edit)}>Edit</Button>
      <Button onClick={() => deleteSkillHandler()}>Delete</Button>
    </ButtonGroup>
  );

  //add onclick to save to perform update mutation
  //add onclick to cancel
  const editSkill = (
    <ButtonGroup>
      <Button onClick={() => updateSkillHandler()}>Save</Button>
      <Button onClick={() => setView(view.view)}>Cancel</Button>
    </ButtonGroup>
  );

  const skillView = view === views.view ? viewSkill : editSkill;

  return (
    <Box color="blue" border="1px solid">
      <li key={id}>{name}</li>
      {skillView}
    </Box>
  );
}
