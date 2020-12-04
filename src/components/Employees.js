import React from "react";
import Employee from "./Employee";

/**This component accepts the combined Data from the
 * GQL queries, as well as the handlers for performing mutations
 * on those queries.
 *
 * It passes each employee component the employees name, id, and skills.
 * It also passes those handlers down so each one can individually pass
 * bound data to perform mutations.
 */

export default function Employees(props) {
  const { employees } = props;
  return (
    <div>
      <div id="EmployeesContainer">
        {employees.map((e) => (
          <Employee
            key={e.id}
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
