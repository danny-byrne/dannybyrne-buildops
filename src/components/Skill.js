import React, { useState } from "react";
import { Box, Button, ButtonGroup, TextField, Grid } from "@material-ui/core";

const views = {
  view: "view",
  edit: "edit",
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
    <>
      <h4 className="SkillName" key={id}>
        {name}
      </h4>
      <div className="SkillFill" />
      <Button className="LeftButton" onClick={() => setView(view.edit)}>
        Edit
      </Button>
      <Button className="RightButton" onClick={() => deleteSkillHandler()}>
        Delete
      </Button>
    </>
  );

  const editSkill = (
    <ButtonGroup>
      <TextField
        className="SkillName"
        aria-describedby="edit-skill"
        onChange={(e) => seteditedSkill(e.target.value)}
        value={editedSkill}
      />
      <div className="SkillFill" />
      <Button className="LeftButton" onClick={() => updateSkillHandler()}>
        Save
      </Button>
      <Button className="RightButton" onClick={() => setView(view.view)}>
        Cancel
      </Button>
    </ButtonGroup>
  );

  const skillView = view === views.view ? viewSkill : editSkill;

  return <div className="Skill">{skillView}</div>;
}
