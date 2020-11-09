import "./App.css";
import React, { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsExports from "./aws-exports";

import Skill from "./components/Skill";
import Employees from "./components/Employees";
import Employee from "./components/Employee";

Amplify.configure(awsExports);

//import queries and mutations
//implment menu, header and random logo

function App() {
  const [employees, setEmployees] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [skill, setSkill] = useState("");

  return (
    <div className="App">
      This is the Build-Ops takehome
      <header></header>
      <menu></menu>
      <Employees />
      <Employee />
      <Skill />
    </div>
  );
}

export default App;
