import "./App.css";
import React, { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsExports from "./aws-exports";
import { useQuery, useMutation, gql } from "@apollo/client";

import Employees from "./components/Employees";
import CreateEmployee from "./components/CreateEmployee";

import { createEmployee } from "./graphql/mutations";

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

const CREATE_EMPLOYEE = gql(createEmployee);
// const LIST_EMPLOYEES = gql(listEmployees);

function App() {
  const [employees, setEmployees] = useState([]);

  const [addEmployee, { data, loading, error }] = useMutation(CREATE_EMPLOYEE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      <header>
        <h1>This is the Build-Ops takehome</h1>
      </header>
      <Menu></Menu>

      <Employees />
      <CreateEmployee addEmployee={addEmployee} />
    </div>
  );
}

export default App;
