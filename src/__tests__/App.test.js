import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import App, { LIST_EMPLOYEES, LIST_SKILLS } from "../App";
import TestRenderer from "react-test-renderer"; // ES6

const mocks = [
  {
    request: {
      query: LIST_EMPLOYEES,
    },
    result: {
      data: {
        employee: { id: 1, firsname: "Danny", lastname: "Byrne" },
      },
    },
  },
];

// const testRenderer = TestRenderer.create(
//   <MockedProvider mocks={mocks} addTypeName={false}>
//     <App />
//   </MockedProvider>
// );
// console.log(testRenderer);

// test("renders without error", () => {
//   TestRenderer.create(

//   );
// });
