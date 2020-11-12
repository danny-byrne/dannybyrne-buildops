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

  const updateSkillHandler = () => {
    props.updateSkillHandler({ id, employeeId, name: editedSkill });
    setView(views.view);
  };

  const deleteSkillHandler = () => {
    props.deleteSkillHandler({ id });
  };

  const viewSkill = (
    <ButtonGroup>
      <h4 className="SkillName" key={id}>
        {name}
      </h4>
      <Button className="LeftButton" onClick={() => setView(view.edit)}>
        Edit
      </Button>
      <Button className="RightButton" onClick={() => deleteSkillHandler()}>
        Delete
      </Button>
    </ButtonGroup>
  );

  const editSkill = (
    <ButtonGroup>
      <TextField
        className="SkillName"
        aria-describedby="edit-skill"
        onChange={(e) => seteditedSkill(e.target.value)}
        value={editedSkill}
      />
      <Button className="LeftButton" onClick={() => updateSkillHandler()}>
        Save
      </Button>
      <Button className="RightButton" onClick={() => setView(view.view)}>
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
