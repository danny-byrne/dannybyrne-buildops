import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App() {
  return <div className="App"></div>;
}

export default App;
