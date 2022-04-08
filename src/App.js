import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { getAuth } from "firebase/auth";
import app from "./firebase.init";
import { Button, Form } from "react-bootstrap";

const auth = getAuth(app);
function App() {
  const onEmailBlur = (event) => {
    console.log(event.target.value);
  };
  const onPasseordBlur = (event) => {
    console.log(event.target.value);
  };
  const handleFromSubmit = (event) => {
    console.log("from submited done");
    event.preventDefault();
  };
  return (
    <div className="container w-50 mt-4 border p-4 rounded shadow">
      <Form onSubmit={handleFromSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onBlur={onEmailBlur}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onBlur={onPasseordBlur}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
