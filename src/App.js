import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import app from "./firebase.init";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [validated, setValidated] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [register, setRegister] = useState("");
  const [unvelidError, setUnvalidError] = useState("");
  const [success, setSuccess] = useState("");

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
      setErrorEmail("Please Type A Valid Email");
      return;
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setErrorPassword("Please You Should Type a One Spacial character");
      return;
    }
    setValidated(true);
    setErrorPassword("");
    setErrorEmail("");
    if (register) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setErrorEmail("");
          setUnvalidError("");
          setSuccess("Login SuccessFull");
        })
        .catch((error) => {
          setUnvalidError(error.message);
          console.error(error);
          setSuccess("");
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setErrorEmail("");
          setUnvalidError("");
          emailVerification();
          setUserName();
        })
        .catch((error) => {
          setUnvalidError(error.message);
          console.error(error);
          setSuccess("");
        });
    }
    event.preventDefault();
  };
  const handleForgetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("email sent");
      })
      .catch((error) => {
        setUnvalidError(error.message);
        console.error(error);
      });
  };
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("updating Name");
      })
      .catch((error) => {
        setUnvalidError(error.message);
      });
  };
  const onNameBlur = (event) => {
    setName(event.target.value);
  };
  const emailVerification = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("verification SuccessFull");
    });
  };

  return (
    <div className="container w-50 mt-4 border p-4 rounded shadow">
      <h2 className="text-primary">
        Please {register ? "Login" : "Register!!!"}
      </h2>
      <Form noValidate validated={validated} onSubmit={handleFromSubmit}>
        {!register && (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onBlur={onNameBlur}
              type="text"
              placeholder="Name"
              required
            />
            <p className="text-danger">{errorEmail}</p>
            <Form.Control.Feedback type="invalid">
              Please provide Your Name.
            </Form.Control.Feedback>
          </Form.Group>
        )}
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
        <p className="text-danger">{unvelidError}</p>
        <p className="text-success">{success}</p>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            onClick={handleRegisterFrom}
            type="checkbox"
            label="Already Registered?"
          />
        </Form.Group>
        <Button onClick={handleForgetPassword} variant="link">
          Forget Password?
        </Button>
        <br />
        <br />
        <Button variant="primary" type="submit">
          {register ? "Login" : "Register"}
        </Button>
      </Form>
    </div>
  );
}

export default App;
