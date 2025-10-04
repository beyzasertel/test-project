import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [formValidation, setFormValidation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useNavigate();

  const handleChange = (event) => {
    let { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: value });

    if (checked) {
      setFormValidation(true);
    } else {
      setFormValidation(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidEmail(form.email)) {
      setErrorMessage("Lütfen geçerli bir e-posta adresi girin!");
      return;
    }

    axios
      .get("https://6540a96145bedb25bfc247b4.mockapi.io/api/login")
      .then((res) => {
        const user = res.data.find(
          (item) => item.password == form.password && item.email == form.email
        );
        if (user) {
          setForm(initialForm);
          history.push("/main");
        } else {
          history.push("/error");
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
        />
        {errorMessage && <p className="error">{errorMessage}</p>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
        />
      </FormGroup>
      {/* reactstrap checkbox ekleyelim*/}

      <FormGroup>
        <Label for="terms">
          I agree to terms of service and privacy policy
        </Label>
        <Input
          id="terms"
          name="terms"
          type="checkbox"
          onChange={handleChange}
          value={form.terms}
        />
      </FormGroup>

      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!formValidation}>
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
