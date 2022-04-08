import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "./firebase.init";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, serErrorEmail] = useState("");
  const [register, setRegister] = useState("");
  const [unvalidError, setUnvalidError] = useState("");

  const onEmailBlur = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordBlur = (event) => {
    setPassword(event.target.value);
  };
  const handleRegisterFrom = (event) => {
    setRegister(event.target.checked);
  };
  const handleFromSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    if (!/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      serErrorEmail("Please Type A Valid Email");
      return;
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setErrorPassword("Please You Should Type a One Spacial character");
      return;
    }
    setValidated(true);
    serErrorEmail("");
    setErrorPassword("");

    if (register) {
      setUnvalidError("");
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          setUnvalidError(error.message);
          console.error(error);
        });
    } else {
      setUnvalidError("");
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          setUnvalidError(error.message);
          console.error(error);
        });
    }

    event.preventDefault();
  };

  return (
    <div className="container w-50 mt-4 border p-4 rounded shadow">
      <h2 className="text-primary">
        Please {register ? "Login" : "Register!!!"}
      </h2>
      <Form noValidate validated={validated} onSubmit={handleFromSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onBlur={onEmailBlur}
            type="email"
            placeholder="Enter email"
            required
          />
          <p className="text-danger">{errorEmail}</p>
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
        <p className="text-danger">{errorPassword}</p>
        <p className="text-danger">{unvalidError}</p>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            onClick={handleRegisterFrom}
            type="checkbox"
            label="Already Registered?"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {register ? "Login" : "Register"}
        </Button>
      </Form>
    </div>
  );
}

export default App;
