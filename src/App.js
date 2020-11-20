import "./App.css";
import React, { useState } from "react";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { useQuery, useMutation, gql } from "@apollo/client";

import Employees from "./components/Employees";
import CreateEmployee from "./components/CreateEmployee";
import AppMenu from "./components/AppMenu";

import { ReactComponent as Logo } from "./icons/logo-14.svg";

import {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  createSkill,
  updateSkill,
  deleteSkill,
} from "./graphql/mutations";
import { listEmployees, listSkills } from "./graphql/queries";

//helper function for de-facto table join between employees and skills.
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

/**
 * This component houses all the logic for side effects.  It performs two queries on the employees and skills tables,
 * performs a de-facto table join, in order to match each skill up with the respective employee. This is passed down to child components to be able to view and
 * mutate the data based on employee or skill ID.  I take an approach of rendering certain content based on views that I specify within a useState call.
 * Here I have not actually implemented different views for the menu, more of just a placeholder.  You will see a similar pattern throughout the rest of the component tree.
 */

function App() {
  const views = {
    home: "home",
    employees: "employees",
    about: "about",
  };

  const [, setView] = useState(views.home);

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

  //each Apollo Hooks call refetchesQueries in order to view most up to date data
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
        <menu>
          <AppMenu setView={setView} views={views} />
        </menu>
        <h1 id="Title">Employees List</h1>
        <div id="Logo">
          <Logo />
        </div>
      </header>
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
