import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Box,
  Button,
  Container,
} from "@material-ui/core";

export default function CreateEmployee(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const addEmployeeHandler = () => {
    let curVariables = {
      firstname: firstName,
      lastname: lastName,
    };

    props.addEmployee({
      variables: {
        input: curVariables,
      },
    });
    setFirstName("");
    setLastName("");
  };

  return (
    <div id="CreateEmployeeContainer">
      <Container>
        Create New Employee
        <Container>
          <FormControl>
            <InputLabel htmlFor="my-input"></InputLabel>
            <Input
              aria-describedby="my-helper-text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <FormHelperText id="my-helper-text">
              Enter New Employee First Name
            </FormHelperText>
          </FormControl>
        </Container>
        <Container>
          <FormControl>
            <InputLabel htmlFor="my-input"></InputLabel>
            <Input
              aria-describedby="my-helper-text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <FormHelperText id="my-helper-text">
              Enter New Employee Last Name
            </FormHelperText>
          </FormControl>
        </Container>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => addEmployeeHandler()}
        >
          Add Employee
        </Button>
      </Container>
    </div>
  );
}
