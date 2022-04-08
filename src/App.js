import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "./firebase.init";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const onEmailBlur = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordBlur = (event) => {
    setPassword(event.target.value);
  };
  const handleFromSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    setValidated(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
    event.preventDefault();
  };
  return (
    <div className="container w-50 mt-4 border p-4 rounded shadow">
      <Form noValidate validated={validated} onSubmit={handleFromSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onBlur={onEmailBlur}
            type="email"
            placeholder="Enter email"
            required
          />

          <Form.Control.Feedback type="invalid">
            Please provide a valid Email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onBlur={onPasswordBlur}
            type="password"
            placeholder="Password"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Signin
        </Button>
      </Form>
    </div>
  );
}

export default App;
