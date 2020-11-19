import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";

export default function AppMenu(props) {
  const { setView, views } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (view) => {
    setAnchorEl(null);
    setView(view);
  };
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Navigate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.keys(views).map((e) => {
          return <MenuItem onClick={() => handleClose(e)}>{e}</MenuItem>;
        })}
      </Menu>
    </div>
  );
}
