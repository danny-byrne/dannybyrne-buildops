import React, { useState } from "react";
import { Box, Button, ButtonGroup, TextField } from "@material-ui/core";

const views = {
  view: "view",
  edit: "edit",
  edited: "edited",
};

export default function Skill(props) {
  const [editedSkill, seteditedSkill] = useState(props.skill.name);
  const [view, setView] = useState(views.view);
  const {
    skill: { id, employeeId, name },
  } = props;
  // console.log("in skill", props.skill);

  const updateSkillHandler = () => {
    props.updateSkillHandler({ id, employeeId, name: editedSkill });
    setView(views.view);
  };

  const deleteSkillHandler = () => {
    props.deleteSkillHandler({ id });
  };

  const viewSkill = (
    <ButtonGroup>
      <h4 key={id}>{name}</h4>
      <Button className="SkillButton" onClick={() => setView(view.edit)}>
        Edit
      </Button>
      <Button className="SkillButton" onClick={() => deleteSkillHandler()}>
        Delete
      </Button>
    </ButtonGroup>
  );

  //add onclick to save to perform update mutation
  //add onclick to cancel
  const editSkill = (
    <ButtonGroup>
      <TextField
        aria-describedby="edit-skill"
        onChange={(e) => seteditedSkill(e.target.value)}
        value={editedSkill}
      />
      <Button className="SkillButton" onClick={() => updateSkillHandler()}>
        Save
      </Button>
      <Button className="SkillButton" onClick={() => setView(view.view)}>
        Cancel
      </Button>
    </ButtonGroup>
  );

  const skillView = view === views.view ? viewSkill : editSkill;

  return (
    <Box className="SkillBox" color="blue" border="1px solid">
      {skillView}
    </Box>
  );
}
