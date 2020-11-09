import React, { useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { listEmployees } from "../graphql/queries";

const LIST_EMPLOYEES = gql(listEmployees);

export default function Employees(props) {
  const { loading, error, data } = useQuery(LIST_EMPLOYEES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.employees.map(({ id, firstname, lastname, skills }) => (
    <div key={id}>
      <p>
        {firstname} {lastname} {skills}
      </p>
    </div>
  ));
}
