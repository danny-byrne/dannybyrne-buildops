import "./App.css";
import React, { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsExports from "./aws-exports";

import Skill from "./components/Skill";
import Employees from "./components/Employees";
import CreateEmployee from "./components/CreateEmployee";

import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Menu,
} from "@material-ui/core";

Amplify.configure(awsExports);

//import queries and mutations
//implment menu, header and random logo

function App() {
  const [employees, setEmployees] = useState([]);

  return (
    <div className="App">
      <header>
        <h1>This is the Build-Ops takehome</h1>
      </header>
      <Menu></Menu>

      <Employees />
      <CreateEmployee />
    </div>
  );
}

export default App;
