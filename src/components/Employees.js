import React from "react";
import Employee from "./Employee";

export default function Employees(props) {
  // console.log("rendering Employees", props.employees);
  const { employees } = props;
  // console.log("in Employees", employees);
  return (
    <div>
      <h1>Employees:</h1>
      {employees.map((e) => (
        <Employee
          id={e.id}
          firstName={e.firstname}
          lastName={e.lastname}
          skills={e.skills}
          skillHandlers={props.skillHandlers}
        />
      ))}
    </div>
  );
}
