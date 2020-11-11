import "./App.css";
import React, { useState } from "react";
import Amplify from "aws-amplify";
// import { API, graphqlOperation } from "aws-amplify";
import awsExports from "./aws-exports";
import { useQuery, useMutation, gql } from "@apollo/client";

import Employees from "./components/Employees";
import CreateEmployee from "./components/CreateEmployee";

import {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  createSkill,
  updateSkill,
  deleteSkill,
} from "./graphql/mutations";
import { listEmployees, listSkills } from "./graphql/queries";

import { Menu } from "@material-ui/core";
import { assignSkills } from "./helpers/helpers";

Amplify.configure(awsExports);

const CREATE_EMPLOYEE = gql(createEmployee);
const DELETE_EMPLOYEE = gql(deleteEmployee);
const UPDATE_EMPLOYEE = gql(updateEmployee);
const LIST_EMPLOYEES = gql(listEmployees);
const CREATE_SKILL = gql(createSkill);
const DELETE_SKILL = gql(deleteSkill);
const UPDATE_SKILL = gql(updateSkill);
const LIST_SKILLS = gql(listSkills);

function App() {
  const {
    loading: employeesLoading,
    error: employeesError,
    data: employeesData,
  } = useQuery(LIST_EMPLOYEES);
  const {
    loading: skillsLoading,
    error: skillsError,
    data: skillsData,
  } = useQuery(LIST_SKILLS);

  const combinedData =
    employeesData &&
    skillsData &&
    assignSkills(
      employeesData.listEmployees.items,
      skillsData.listSkills.items
    );

  const [addEmployee] = useMutation(CREATE_EMPLOYEE, {
    refetchQueries: (mutationResult) => [{ query: LIST_EMPLOYEES }],
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: (mutationResult) => [{ query: LIST_EMPLOYEES }],
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: (mutationResult) => [{ query: LIST_EMPLOYEES }],
  });

  const [addSkill] = useMutation(CREATE_SKILL, {
    refetchQueries: (mutationResult) => [{ query: LIST_SKILLS }],
  });

  const [updateSkill] = useMutation(UPDATE_SKILL, {
    refetchQueries: (mutationResult) => [{ query: LIST_SKILLS }],
  });

  const [deleteSkill] = useMutation(DELETE_SKILL, {
    refetchQueries: (mutationResult) => [{ query: LIST_SKILLS }],
  });

  const skillHandlers = { addSkill, updateSkill, deleteSkill };
  const employeeHandlers = { addEmployee, updateEmployee, deleteEmployee };

  if (employeesLoading || skillsLoading) return <p>Loading...</p>;
  if (employeesError || skillsError) return <p>Error </p>;

  return (
    <div className="App">
      <header>
        <h1>Employees List</h1>
      </header>
      <Menu></Menu>

      <CreateEmployee addEmployee={addEmployee} />
      {employeesData && skillsData && (
        <Employees
          employees={combinedData}
          skillHandlers={skillHandlers}
          employeeHandlers={employeeHandlers}
        />
      )}
    </div>
  );
}

export default App;
