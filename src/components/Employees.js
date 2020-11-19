import React from "react";
import Employee from "./Employee";

export default function Employees(props) {
  const { employees } = props;
  return (
    <div>
      <h2 className="EmployeesLabel">Employees:</h2>
      <div id="EmployeesContainer">
        {employees.map((e) => (
          <Employee
            id={e.id}
            firstName={e.firstname}
            lastName={e.lastname}
            skills={e.skills}
            skillHandlers={props.skillHandlers}
            employeeHandlers={props.employeeHandlers}
          />
        ))}
      </div>
    </div>
  );
}
